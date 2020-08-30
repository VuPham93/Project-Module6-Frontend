import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-edit-password',
  templateUrl: './user-edit-password.component.html',
  styleUrls: ['./user-edit-password.component.css']
})
export class UserEditPasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  changePasswordForm: FormGroup;

  currentPassword;
  continue: boolean = false
  newPassword: any;

  checkPassword() {
    if(this.currentPassword == 123123) {
      this.continue = true;
    }
  }

  changePassword() {
    this.userService.changePassword(this.tokenStorage.getUser().id, this.newPassword).subscribe(
      res => {
        window.alert(res)
      }
    )
  }
}
