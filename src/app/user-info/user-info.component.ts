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
  friendList:any;
  idUser : number;
  idLogin: number;
  isLogin: boolean = false;
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
  }

  getFriendList() {
    this.friendService.getFriendList(this.idUser).subscribe(
      response => {this.friendList = response},
      error => console.error(error)
    )

  }



  setUser() {
    this.userService.getUser().subscribe(
      response => {this.userLogin = <IUser> response;
      this.idLogin =this.userLogin.userId;
      console.log(this.idLogin)
      if(this.idLogin==this.idUser){
        this.isLogin = true;
      }
        },
      error => console.error(error)
    );
  }
}
