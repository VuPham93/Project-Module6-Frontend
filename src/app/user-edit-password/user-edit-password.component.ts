import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import {UserService} from '../service/user.service';
import Swal from 'sweetalert2';

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.newPassword === v.confirmPassword) ? null : {
    passwordNotMatch: true
  };
}

@Component({
  selector: 'app-user-edit-password',
  templateUrl: './user-edit-password.component.html',
  styleUrls: ['./user-edit-password.component.css']
})
export class UserEditPasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: comparePassword})
  }

  userId = this.tokenStorage.getUser().id
  changePasswordForm: FormGroup;

  get f(){
    return this.changePasswordForm.controls;
  }

  currentPassword;
  continue: boolean = false

  checkPassword() {
    this.userService.combinePassword(this.tokenStorage.getUser().id, this.currentPassword).subscribe(
      res => this.continue = true,
      error => this.continue = false
    )
  }

  changePassword() {
    this.userService.changePassword(this.tokenStorage.getUser().id, this.changePasswordForm.value.newPassword).subscribe(
      res => {
        Swal.fire({
          icon: "success",
          title: "Your password has changed!"
        })
      }
    )
  }
}
