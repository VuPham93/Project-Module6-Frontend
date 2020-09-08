import { Component, OnInit } from '@angular/core';
import {IUser} from '../model/iuser';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.css']
})
export class StatusDetailComponent implements OnInit {
  idLogin:number;
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.idLogin =this.tokenStorageService.getUser().id;
  }

}
