import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../model/iuser';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';

@Component({
  selector: 'app-user-edit-info',
  templateUrl: './user-edit-info.component.html',
  styleUrls: ['./user-edit-info.component.css']
})
export class UserEditInfoComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userEditForm = this.formBuilder.group({
      userId: [''],
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required]],
      userPassword: [''],
      userSex: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      about: ['', [Validators.required]],
      userAddress: ['', [Validators.required]],
      userPhoneNumber: ['', [Validators.required]],
      userAvatar: ['', [Validators.required]],
      userCoverPhoto: ['', [Validators.required]],
      roles: ['']
    })

    this.userService.getUser().subscribe(
      response => {
        this.user = <IUser> response;
        this.userEditForm.patchValue(response)
      },
      error => console.error(error)
    );
  }

  user: IUser;
  userEditForm: FormGroup;
  date = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  month = [1,2,3,4,5,6,7,8,9,10,11,12];
  year = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010]

  editUser() {
    let data = this.userEditForm.value;
    this.userService.editUser(this.tokenStorage.getUser().id, data).subscribe(
      res => {
        window.alert("User edited!")
      }
    )
  }
}
