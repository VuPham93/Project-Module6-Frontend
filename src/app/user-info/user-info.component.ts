import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FriendService} from '../service/friend.service';
import {IUser} from '../model/iuser';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: IUser;
  userLogin: IUser;
  friendList:IUser[];
  friendListLogin:IUser[];
  mutualFriendList: IUser[]=[];
  idUser : number;
  idLogin: number;
  isLogin: boolean = false;
  isFriend:boolean;
  constructor(private userService: UserService, private router: Router
    ,private friendService: FriendService,
               private actRoute: ActivatedRoute) {
    this.idUser = parseInt(this.actRoute.snapshot.params.id);


  }

  ngOnInit(): void {
    this.userService.findUserById(this.idUser).subscribe(
      response => this.user = <IUser>response,
      error => console.log(error)
    )
    this.getFriendList();
    this.setUser();
    this.checkFriend();
    this.getMutualFriendList();
  }

  getFriendList() {
    this.friendService.getFriendList(this.idUser).subscribe(
      response => {this.friendList = <IUser[]>response;
      },
      error => console.error(error)
    )

  }

  getMutualFriendList() {
    this.userService.getUser().subscribe(
      response=>{
        this.userLogin = <IUser> response;
        this.friendService.getFriendList(this.userLogin.userId).subscribe(
          response => {this.friendListLogin = <IUser[]>response;
            for (let i =0; i < this.friendList.length;i++){
              for (let j = 0; j < this.friendListLogin.length;j++){
                if (this.friendList[i].userId==this.friendListLogin[j].userId){
                  this.mutualFriendList.push(this.friendList[i]);

                  console.log(this.friendList[i]);
                }
              }
            }
         },
          error => console.error(error)
        )
      }
    )


  }




  setUser() {
    this.userService.getUser().subscribe(
      response => {this.userLogin = <IUser> response;
      this.idLogin =this.userLogin.userId;
      if(this.idLogin==this.idUser){
        this.isLogin = true;
      }
        },
      error => console.error(error)
    );
  }
  checkFriend(){
    this.userService.getUser().subscribe(
      response => {this.userLogin = <IUser> response;
        var status;
        this.friendService.checkFriend(this.userLogin.userId,this.idUser).subscribe(
          response => {status = response;
            switch (status) {
              case 0:
                this.isFriend = false;
                break;
              case 1:
                this.isFriend = false;
                break;
              case 2:
                this.isFriend = true;
                break;
              case 3:
                this.isFriend = false;
                break;
            };
          },
          error => console.log(error)
        )
      },
      error => console.error(error)
    );


  }
}
