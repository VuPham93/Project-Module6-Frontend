import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-edit-info',
  templateUrl: './user-edit-info.component.html',
  styleUrls: ['./user-edit-info.component.css']
})
export class UserEditInfoComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  userEditForm: FormGroup;
  user = this.userService.getUser();
  message = null;

  ngOnInit(): void {
    this.userEditForm = this.formBuilder.group({
      userId: this.user.userId,
      userName: this.user.userName,
      userEmail: this.user.userEmail,
      userSex: this.user.userSex,
      dateOfBirth: null,
      about: null,
      userAddress: null,
      userAvatar: null,
      userCoverPhoto: null,
      roles: []
    })
  }

  editUser() {
    console.log(this.user.userName)
  }
}
