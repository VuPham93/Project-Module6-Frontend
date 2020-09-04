import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserEditInfoComponent} from './user-edit-info/user-edit-info.component';
import {UserEditPasswordComponent} from './user-edit-password/user-edit-password.component';
import {NewsFeedComponent} from './news-feed/news-feed.component';
import {LoginAndSignupComponent} from './login/login-and-signup.component';
import {FriendListBigComponent} from './friend-list-big/friend-list-big.component';
import {SearchUserComponent} from './search-user/search-user.component';
import {NewPostComponent} from './new-post/new-post.component';
import {MyWallComponent} from './my-wall/my-wall.component';
import {StatusComponent} from './status/status.component';
import {CommentListComponent} from './comment-list/comment-list.component';
import {ChatComponent} from './chat/chat.component';

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
    path: 'userInfor/:id',
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
  },
  {
    path: 'searchUser',
    component: SearchUserComponent,
    data: {
      title: 'searchUser'
    }
  },
  {
    path: 'postStatus',
    component: NewPostComponent,
    data: {
      title: 'postStatus'
    }
  },
  {
    path: 'newFeed',
    component: NewsFeedComponent,
    data: {
      title: 'newFeed'
    }
  },
  {
    path: 'myWall/:id',
    component: MyWallComponent,
    data: {
      title: 'myWall'
    }
  },
  {
    path: 'status/:id',
    component: StatusComponent,
    data: {
      title: 'status'
    }
  },
  {
    path: 'commentList',
    component: CommentListComponent,
    data: {
      title: 'commentList'
    }
  },

  {
    path: 'chat',
    component: ChatComponent,
    data: {
      title: 'chat'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
