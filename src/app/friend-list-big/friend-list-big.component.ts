import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {FriendService} from '../service/friend.service';
import {IUser} from '../model/IUser';

@Component({
  selector: 'app-friend-list-big',
  templateUrl: './friend-list-big.component.html',
  styleUrls: ['./friend-list-big.component.css']
})
export class FriendListBigComponent implements OnInit {
  friendList:any;
  user:IUser;
  constructor(private userService: UserService,private friendService: FriendService) { }

  ngOnInit(): void {
    this.getFriendList();
    this.getUser();
  }

  getFriendList() {
    this.friendService.getFriendList(1).subscribe(
      response => {this.friendList = response},
      error => console.error(error)
    )
  }
  getUser(){
    // this.userService.getUser().subscribe(
    //   response => { this.user=response;
    //     console.log(this.user);
    //   },
    //   error => console.error(error)
    // )

  }
}
