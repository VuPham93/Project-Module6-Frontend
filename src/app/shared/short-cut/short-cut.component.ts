import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../container/service/signin-signup/token-storage.service';
import {HeaderComponent} from '../header/header.component';

@Component({
  providers: [ HeaderComponent ],
  selector: 'app-short-cut',
  templateUrl: './short-cut.component.html',
  styleUrls: ['./short-cut.component.css']
})
export class ShortCutComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private header: HeaderComponent) { }

  ngOnInit(): void {
  }

  userId = this.tokenStorageService.getUser().id

  logOut() {
    this.header.logout();
  }
}
