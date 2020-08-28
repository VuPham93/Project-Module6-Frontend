import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient, private router: Router) { }

  private friendUrl = 'http://localhost:8080/relationship';

  getFriendList(userId: number) {
    return this.http.get(this.friendUrl + '/listFriend/' + userId).pipe(
      tap(
        receivedList => JSON.stringify(receivedList)),
      catchError(err => of([]))
    )
  }
}
