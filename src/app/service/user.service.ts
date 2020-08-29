import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {IUser} from '../model/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private userUrl = 'http://localhost:8080/user';

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
}
