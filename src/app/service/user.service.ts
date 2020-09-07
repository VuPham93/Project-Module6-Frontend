import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {TokenStorageService} from './signin-signup/token-storage.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  private userUrl = environment.URL + 'user';

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
    return this.http.put(this.userUrl + '/update/' + id, user)
  }

  combinePassword(id: number, password: JSON) {
    return this.http.post(this.userUrl + '/combinePassword/' + id, password)
  }

  changePassword(id: number, newPassword: JSON) {
    return this.http.post(this.userUrl + '/changePassword/' + id, newPassword,
      { responseType: 'text' as 'json' })
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

  checkEmailExist(email: string) {
    return this.http.post(this.userUrl+ '/exists', email)
  }
}
