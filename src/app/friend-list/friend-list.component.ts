import { Component, OnInit } from '@angular/core';
import {FriendService} from '../service/friend.service';
import {UserService} from '../service/user.service';
import {IUser} from '../model/iuser';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  userLogin:IUser;
  constructor(private userService: UserService,private friendService: FriendService) { }

  ngOnInit(): void {
    this.getFriendList();

  }

  friendList:any;

  getFriendList() {
    this.userService.getUser().subscribe(
      res=>{ this.userLogin = <IUser>res;
        this.friendService.getFriendList(this.userLogin.userId).subscribe(
          response => {this.friendList = response},
          error => console.error(error)
        )
      }
    )
  }
}
