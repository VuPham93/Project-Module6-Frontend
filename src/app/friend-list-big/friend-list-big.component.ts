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
  friendList:IUser[] ;
 sumListFriend: number;
 sumListPending: number;
  pendingList:IUser[];
  user:IUser;

  constructor(private userService: UserService,private friendService: FriendService) { }

  ngOnInit(): void {
    this.getFriendList();
    this.getPendingList();
    this.getUser();

  }

  getFriendList() {
    this.friendService.getFriendList(1).subscribe(
      response => {this.friendList = <IUser[]>response,
        this.sumListFriend=this.friendList.length;},
      error => console.error(error)
    )
  }

  getPendingList() {
    this.friendService.getPengdingList(1).subscribe(
      response => {this.pendingList = <IUser[]>response,
        this.sumListPending=this.pendingList.length;},
      error => console.error(error)
    )
  }
  getUser(){
    this.userService.getUser().subscribe(
      response => { this.user = <IUser> response;
        console.log(this.user);
      },
      error => console.error(error)
    )
  }
  unFriend(relatingId:number,statusId:number,index:number){
    this.userService.findUserById(relatingId).subscribe(
      response => {
        this.user = <IUser>response;
        console.log(this.user);
        this.friendService.unFriend(1,statusId,{
          "userId": this.user.userId,
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
            if (statusId==3){
              this.friendList.splice(index,1);
              this.sumListFriend = this.sumListFriend-1;
            }
          },
          error => console.error(error)

        )

      },
      error => console.error(error)

    )
  }
  acceptInviteFriend(relatingId:number,statusId:number,index:number){
    this.userService.findUserById(relatingId).subscribe(
      response => {
        this.user = <IUser>response;
        console.log(this.user);
        this.friendService.acceptInviteFriend(1,statusId,{
          "userId": this.user.userId,
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
            if (statusId==3){
              this.pendingList.splice(index,1);
              this.sumListPending = this.sumListPending-1;
            } else if (statusId==2){
              this.pendingList.splice(index,1);
              this.friendList.push(this.user);
              this.sumListPending = this.sumListPending-1;
              this.sumListFriend=this.sumListFriend+1;

            }
        },
        error => console.error(error)

      )

      },
      error => console.error(error)

    )

  }



}
