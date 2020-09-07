import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient, private router: Router) { }

  private friendUrl = environment.URL + 'relationship';

  getFriendList(userId: number) {
    return this.http.get(this.friendUrl + '/listFriend/' + userId).pipe(
      tap(
        receivedList => JSON.stringify(receivedList)),
      catchError(err => of([]))
    )
  }
  getPengdingList(userId: number) {
    return this.http.get(this.friendUrl + '/listPending/' + userId).pipe(
      tap(
        receivedList => JSON.stringify(receivedList)),
      catchError(err => of([]))
    )
  }

  addInviteFriend(relatingId: number,user: any) {
    return this.http.post(this.friendUrl + '/create/' + relatingId,user).pipe(
      tap(
        receivedList => JSON.stringify(receivedList)),
      catchError(err => of([]))
    )
  }

  acceptInviteFriend(relatedId: number,statusId :number,user: any) {
    return this.http.put(this.friendUrl + '/edit/' + relatedId+"/"+statusId,user).pipe(
      tap(
        receivedList => JSON.stringify(receivedList)),
      catchError(err => of([]))
    )
  }

  unFriend(relatedId: number,statusId :number,user: any) {
    return this.http.put(this.friendUrl + '/unfriend/' + relatedId+"/"+statusId,user).pipe(
      tap(
        receivedList => JSON.stringify(receivedList)),
      catchError(err => of([]))
    )
  }

  checkFriend(relatingId: number,relatedId :number) {
    return this.http.get(this.friendUrl + '/checkFriend/' + relatingId+"/"+relatedId).pipe(
      tap(
        receivedList => JSON.stringify(receivedList)),
      catchError(err => of([]))
    )
  }
}
