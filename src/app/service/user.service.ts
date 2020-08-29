import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {TokenStorageService} from './signin-signup/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, private router: Router,
              private tokenStorage: TokenStorageService) { }

  private userUrl = 'http://localhost:8080/user';
  user: any;

  // @ts-ignore
  getUser() {
    return this.findUserById(this.tokenStorage.getUser().id);
  }

  findUserById(id: number):Observable<any> {
    // @ts-ignore
    return this.http.get(this.userUrl + '/findUserById/' + id,{ responseType: 'text' }).pipe(
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
}
