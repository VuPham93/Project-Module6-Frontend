import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../model/iuser';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-user-edit-info',
  templateUrl: './user-edit-info.component.html',
  styleUrls: ['./user-edit-info.component.css']
})

export class UserEditInfoComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userEditForm = this.formBuilder.group({
      userId: [''],
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      userEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      userPassword: [''],
      userSex: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      about: ['', [Validators.required]],
      userAddress: ['', [Validators.required]],
      userPhoneNumber: ['', [Validators.required]],
      userAvatar: ['', [Validators.required]],
      userCoverPhoto: ['', [Validators.required]],
      roles: ['']
    });

    this.userService.getUser().subscribe(
      response => {
        this.user = <IUser> response;
        this.userEditForm.patchValue(response);
        this.dateOfBirth = [this.user.dateOfBirth.slice(0,2), this.user.dateOfBirth.slice(3,5), this.user.dateOfBirth.slice(6,10)]
      },
      error => console.error(error)
    );
  }

  user: IUser;
  userEditForm: FormGroup;
  dateOfBirth: [string, string, string];

  gender = ["Male", "Female"];
  address = ["Viet Nam", "USA", "Korea", "Japan", "China", "Russia", "Lao", "Campuchia"];
  dates = ["01","02","03",'04',"05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
  months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  years = ["1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];

  editUser() {
    this.userEditForm.value.dateOfBirth = this.dateOfBirth[0] + "-" + this.dateOfBirth[1] + "-" + this.dateOfBirth[2];
    let data = this.userEditForm.value;
    this.userService.editUser(this.tokenStorage.getUser().id, data).subscribe(
      res => {
        swal({
          icon: "success",
          title: "Your information has changed!"
        })
      }
    )
  }

  get userEmail() {
    return this.userEditForm.get('userEmail')
  }

  get userName() {
    return this.userEditForm.get('userName')
  }

  emailExist: boolean = false;

  checkEmailExist() {
    if (this.userEditForm.value.userEmail != this.tokenStorage.getUser().email) {
      this.userService.checkEmailExist(this.userEditForm.value.userEmail).subscribe(
        res => {
          this.emailExist = <boolean> res;
        }
      )
    }
  }
}
