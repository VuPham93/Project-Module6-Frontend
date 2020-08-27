import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAndSignupComponent } from './login-and-signup/login-and-signup.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { NewPostComponent } from './new-post/new-post.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ShortCutComponent } from './short-cut/short-cut.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAndSignupComponent,
    UserInfoComponent,
    HeaderComponent,
    FooterComponent,
    NewsFeedComponent,
    NewPostComponent,
    FriendListComponent,
    ShortCutComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
