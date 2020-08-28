import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/signin-signup/auth.service';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-login-and-signup',
  templateUrl: './login-and-signup.component.html',
  styleUrls: ['./login-and-signup.component.css']
})
export class LoginAndSignupComponent implements OnInit {
  gender :string[]=["male","female"];

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  form2: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage2 = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        // this.reloadPage();
        this.router.navigate(['/home']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  register(): void {
    this.authService.register(this.form2).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        setTimeout(()=>{
          this.reloadPage();
        },2000);
      },
      err => {
        this.errorMessage2 = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }


}
