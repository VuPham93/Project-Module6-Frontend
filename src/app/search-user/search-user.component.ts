import { Component, OnInit } from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {IUser} from '../model/iuser';
import {UserService} from '../service/user.service';
import {FriendService} from '../service/friend.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  users:IUser[];
  sumUsers:number=0;

  constructor(private userService: UserService,private friendService: FriendService) { }

  ngOnInit(): void {
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
