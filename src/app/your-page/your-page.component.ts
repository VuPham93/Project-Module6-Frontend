import { Component, OnInit } from '@angular/core';
import {IUser} from '../model/iuser';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-your-page',
  templateUrl: './your-page.component.html',
  styleUrls: ['./your-page.component.css']
})
export class YourPageComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.setUser();
  }

  user: IUser

  setUser() {
    this.userService.getUser().subscribe(
      response => {this.user = <IUser> response;
      },
      error => console.error(error)
    );
  }
}
