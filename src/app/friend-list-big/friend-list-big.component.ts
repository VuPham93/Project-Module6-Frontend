import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {FriendService} from '../service/friend.service';
import {IUser} from '../model/IUser';
import {$} from 'protractor';

@Component({
  selector: 'app-friend-list-big',
  templateUrl: './friend-list-big.component.html',
  styleUrls: ['./friend-list-big.component.css']
})
export class FriendListBigComponent implements OnInit {
  friendList:any[] | Object;
  pendingList:any;
  user:IUser;
  constructor(private userService: UserService,private friendService: FriendService) { }

  ngOnInit(): void {
    this.getFriendList();
    this.getPendingList();
    this.getUser();
  }




  getFriendList() {
    this.friendService.getFriendList(1).subscribe(
      response => {this.friendList = response},
      error => console.error(error)
    )
  }

  getPendingList() {
    this.friendService.getPengdingList(1).subscribe(
      response => {this.pendingList = response},
      error => console.error(error)
    )
  }
  getUser(){
    this.userService.getUser().subscribe(
      response => { this.user=response;
        console.log(this.user);
      },
      error => console.error(error)
    )

  }
  acceptInviteFriend(relatingId:number,statusId:number){
    this.userService.findUserById(relatingId).subscribe(
      response => {
        var jsonObject = JSON.parse(response);
        console.log(jsonObject);
        this.friendService.acceptInviteFriend(1,statusId,{
          "userId": jsonObject.userId,
          "userName": null,
          "userEmail": null,
          "userPassword": null,
          "userSex": null,
          "dateOfBirth": null,
          "about": null,
          "userAddress": null,
          "userAvatar": null,
          "userCoverPhoto": null,
          "roles":null
        }).subscribe(
        response => {
        },
        error => console.error(error)

      )

      },
      error => console.error(error)

    )

  }



}
