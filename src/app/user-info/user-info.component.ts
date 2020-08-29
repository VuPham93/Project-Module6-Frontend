import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import {IUser} from '../model/iuser';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.setUser()
  }

  user: IUser;

  setUser() {
    this.userService.findUserById(this.tokenStorage.getUser().id).subscribe(
      response => {this.user = <IUser> response},
      error => console.error(error)
    );
  }

}
