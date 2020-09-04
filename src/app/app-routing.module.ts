import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserInfoComponent} from './modules/my-wall-module/user-info/user-info.component';
import {UserEditInfoComponent} from './modules/my-wall-module/user-edit-info/user-edit-info.component';
import {UserEditPasswordComponent} from './modules/my-wall-module/user-edit-password/user-edit-password.component';
import {NewsFeedComponent} from './modules/news-feed-module/news-feed/news-feed.component';
import {LoginAndSignupComponent} from './login/login-and-signup.component';
import {FriendListBigComponent} from './modules/my-wall-module/friend-list-big/friend-list-big.component';
import {SearchUserComponent} from './search-user/search-user.component';
import {NewPostComponent} from './shared/new-post/new-post.component';
import {MyWallComponent} from './modules/my-wall-module/my-wall/my-wall.component';
import {StatusComponent} from './shared/status/status.component';
import {CommentListComponent} from './shared/comment-list/comment-list.component';

let routes: Routes;
routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginAndSignupComponent,
    data: {
      title: 'userLogin'
    }
  },
  {
    path: '',
    component: NewsFeedComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/news-feed-module/newsfeed.module').then(m => m.NewsfeedModule)
      }
    ]
  },
  // {
  //   path: 'listFriend',
  //   component: FriendListBigComponent,
  //   data: {
  //     title: 'userLogin'
  //   }
  // },
  // {
  //   path: 'userInfor/:id',
  //   component: UserInfoComponent,
  //   data: {
  //     title: 'userInfor'
  //   }
  // },
  // {
  //   path: 'userEdit',
  //   component: UserEditInfoComponent,
  //   data: {
  //     title: 'userEdit'
  //   }
  // },
  // {
  //   path: 'userEditPass',
  //   component: UserEditPasswordComponent,
  //   data: {
  //     title: 'userEditPass'
  //   }
  // },
  // // {
  // //   path: 'home',
  // //   component: NewsFeedComponent,
  // //   data: {
  // //     title: 'Home'
  // //   }
  // // },
  // {
  //   path: 'searchUser',
  //   component: SearchUserComponent,
  //   data: {
  //     title: 'searchUser'
  //   }
  // },
  // {
  //   path: 'postStatus',
  //   component: NewPostComponent,
  //   data: {
  //     title: 'postStatus'
  //   }
  // },
  // // {
  // //   path: 'newFeed',
  // //   component: NewsFeedComponent,
  // //   data: {
  // //     title: 'newFeed'
  // //   }
  // // },
  // {
  //   path: 'myWall/:id',
  //   component: MyWallComponent,
  //   data: {
  //     title: 'myWall'
  //   }
  // },
  // {
  //   path: 'status/:id',
  //   component: StatusComponent,
  //   data: {
  //     title: 'status'
  //   }
  // },
  // {
  //   path: 'commentList',
  //   component: CommentListComponent,
  //   data: {
  //     title: 'commentList'
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
