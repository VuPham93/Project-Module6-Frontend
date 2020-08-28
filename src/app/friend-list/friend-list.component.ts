import { Component, OnInit } from '@angular/core';
import {FriendService} from '../service/friend.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  constructor(private userService: UserService,private friendService: FriendService) { }

  ngOnInit(): void {
  }

  friendList;

  getFriendList() {
    this.friendService.getFriendList(this.userService.getUser().userId).subscribe(
      response => {this.friendList = response},
      error => console.error(error)
    )
  }

}
