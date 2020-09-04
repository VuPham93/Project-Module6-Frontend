import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginAndSignupComponent} from './login/login-and-signup.component';
import {authInterceptorProviders} from './container/_helpers/auth.interceptor';
import { SearchUserComponent } from './search-user/search-user.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import {CommonModule} from "@angular/common";
import {CoverPhotoComponent} from "./modules/my-wall-module/cover-photo/cover-photo.component";
import {FriendListBigComponent} from "./modules/my-wall-module/friend-list-big/friend-list-big.component";
import {MyWallComponent} from "./modules/my-wall-module/my-wall/my-wall.component";
import {UserEditPasswordComponent} from "./modules/my-wall-module/user-edit-password/user-edit-password.component";
import {UserEditInfoComponent} from "./modules/my-wall-module/user-edit-info/user-edit-info.component";
import {UserInfoComponent} from "./modules/my-wall-module/user-info/user-info.component";




@NgModule({
  declarations: [
    AppComponent,
    LoginAndSignupComponent,
    UserInfoComponent,
    // HeaderComponent,
    // FooterComponent,
    // NewPostComponent,
    // ShortCutComponent,
    // ChatComponent,
    CoverPhotoComponent,
    UserEditInfoComponent,
    UserEditPasswordComponent,
    FriendListBigComponent,
    SearchUserComponent,
    // // CommentComponent,
    MyWallComponent,
    // StatusComponent,
    // YourPageComponent,
    // CommentListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [authInterceptorProviders, AngularFirestoreModule, AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
