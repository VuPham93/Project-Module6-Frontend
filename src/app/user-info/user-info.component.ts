import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {FriendService} from '../service/friend.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user;
  friendList:any;
  constructor(private userService: UserService, private router: Router
    ,private friendService: FriendService) { }

  ngOnInit(): void {
    this.userService.findUserById(1).subscribe(
      response => this.user = response,
      error => console.log(error)
    )
    this.getFriendList();
  }

  getFriendList() {
    this.friendService.getFriendList(1).subscribe(
      response => {this.friendList = response},
      error => console.error(error)
    )
  }


}
