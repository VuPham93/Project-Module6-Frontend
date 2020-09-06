import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../model/iuser';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

import { AuthService } from '../service/signin-signup/auth.service';
import { TokenStorageService } from '../service/signin-signup/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: IUser;

  RefreshToken = {
    token: ''
  };
  show: boolean = false;

  constructor(private userService: UserService,private authService: AuthService, private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.setUser();
  }
  setUser() {
    this.userService.getUser().subscribe(
      response => {this.user = <IUser> response;
      },
      error => console.error(error)
    );
  }

  logout(): void{
    this.RefreshToken.token = String(this.tokenStorageService.getToken());
    console.log(this.RefreshToken);
    this.authService.logOut(this.RefreshToken).subscribe(
      res => {
        console.log(res);
        this.tokenStorageService.signOut();
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
      }
    );
  }

  showMenu() {
    this.show = !this.show;
  }
}
