import { Component, OnInit } from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {IUser} from '../model/IUser';
import {UserService} from '../service/user.service';
import {FriendService} from '../service/friend.service';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  users:IUser[];
  sumUsers:number=0;
  idLogin: number;

  constructor(private userService: UserService,private friendService: FriendService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.idLogin = this.tokenStorageService.getUser().id;
  }
  onSubmit(form:NgForm){


      if (form.value.username==""){
        this.userService.findAllUser().subscribe(
          response => {this.users = <IUser[]>response,
            this.sumUsers=this.users.length;},
          error => console.error(error)
        )
      }else {
        this.userService.findUserByUsername(form.value.username).subscribe(
          response => {this.users = <IUser[]>response,
            this.sumUsers=this.users.length;},
          error => console.error(error)
        )
      }
   form.reset(
     {
       username:""
     }
   );
  }

}
