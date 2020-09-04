import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsfeedRoutingModule } from './newsfeed-routing.module';
import {NewsFeedComponent} from './news-feed/news-feed.component';
import {FriendListComponent} from './friend-list/friend-list.component';
import {NewPostComponent} from '../../shared/new-post/new-post.component';
import {CommentComponent} from '../../shared/comment/comment.component';
import {CommentListComponent} from '../../shared/comment-list/comment-list.component';
import {StatusComponent} from '../../shared/status/status.component';
import {YourPageComponent} from '../../shared/your-page/your-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {authInterceptorProviders} from '../../container/_helpers/auth.interceptor';
import {AngularFireStorage} from '@angular/fire/storage';
import {ShortCutComponent} from '../../shared/short-cut/short-cut.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {FooterComponent} from '../../shared/footer/footer.component';


@NgModule({
  declarations: [
    NewsFeedComponent,
    FriendListComponent,
    NewPostComponent,
    CommentComponent,
    CommentListComponent,
    StatusComponent,
    YourPageComponent,
    ShortCutComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    NewsfeedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
    ],
  providers: [authInterceptorProviders, AngularFirestoreModule, AngularFireStorage],
})
export class NewsfeedModule { }
