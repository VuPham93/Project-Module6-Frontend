import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/signin-signup/auth.service';
import { TokenStorageService } from '../service/signin-signup/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  RefreshToken = {
    refreshToken:''
  }

  constructor(private authService: AuthService,private tokenStorageService: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.RefreshToken.refreshToken = this.tokenStorageService.getToken();
    this.authService.logOut(this.RefreshToken).subscribe(
      res =>{
        console.log(res);
        this.tokenStorageService.signOut();
        this.router.navigateByUrl('/');
      }
    );

  }
}
