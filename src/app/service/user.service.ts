import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {TokenStorageService} from './signin-signup/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  private userUrl = 'http://localhost:8080/user';

  getUser() {
    return this.findUserById(this.tokenStorage.getUser().id);
  }

  findUserById(id: number) {
    return this.http.get(this.userUrl + '/findUserById/' + id).pipe(
      tap(
        user => JSON.stringify(user)),
      catchError(err => of([]))
    )
  }

  editUser(id: number, user: any):Observable<any> {
    return this.http.put(this.userUrl + '/update/' + id, user).pipe(
      tap(
        res =>  JSON.stringify(res)),
      catchError(err => of([]))
    )
  }

  findUserByUsername(username: string) {
    return this.http.get(this.userUrl + '/findUserByName/' + username).pipe(
      tap(
        users => JSON.stringify(users)),
      catchError(err => of([]))
    )
  }

  findAllUser() {
    return this.http.get(this.userUrl + '/').pipe(
      tap(
        users => JSON.stringify(users)),
      catchError(err => of([]))
    )
  }
}
