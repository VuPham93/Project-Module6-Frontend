import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  private userUrl = 'http://localhost:8080/user';

  user: {
    userId: number,
    userEmail: string,
    userPassword: string,
    userName: string,
    userNickName: string,
    userSex: string,
    userAddress: string,
    userAvatar: string,
    userCoverPhoto: string
  };

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  findUserById(id: number) {
    return this.http.get(this.userUrl + '/findUserById/' + id).pipe(
      tap(
        user => JSON.stringify(user)),
      catchError(err => of([]))
    )
  }

  editUser(id: number, user: any) {
    return this.http.put(this.userUrl + '/update/' + id, user).pipe(
      tap(
        res =>  JSON.stringify(res)),
      catchError(err => of([]))
    )
  }
}
