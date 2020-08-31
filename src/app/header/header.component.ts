import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../model/iuser';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: IUser;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.setUser();
  }
  setUser() {
    this.userService.getUser().subscribe(
      response => {this.user = <IUser> response;
      },
      error => console.error(error)
    );
  }

}
