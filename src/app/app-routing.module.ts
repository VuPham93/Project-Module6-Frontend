import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserEditInfoComponent} from './user-edit-info/user-edit-info.component';
import {UserEditPasswordComponent} from './user-edit-password/user-edit-password.component';
import {NewsFeedComponent} from './news-feed/news-feed.component';
import {LoginAndSignupComponent} from './login/login-and-signup.component';
import {FriendListBigComponent} from './friend-list-big/friend-list-big.component';

// @ts-ignore
const routes: Routes = [
  {
    path: '',
    component: LoginAndSignupComponent,
    data: {
      title: 'userLogin'
    }
  },
  {
    path: 'listFriend',
    component: FriendListBigComponent,
    data: {
      title: 'userLogin'
    }
  },
  {
    path: 'userInfor',
    component: UserInfoComponent,
    data: {
      title: 'userInfor'
    }
  },
  {
    path: 'userEdit',
    component: UserEditInfoComponent,
    data: {
      title: 'userEdit'
    }
  },
  {
    path: 'userEditPass',
    component: UserEditPasswordComponent,
    data: {
      title: 'userEditPass'
    }
  },
  {
    path: 'home',
    component: NewsFeedComponent,
    data: {
      title: 'Home'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
