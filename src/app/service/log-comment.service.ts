import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogCommentService {

  private API_URL = environment.URL + 'logComment/'

  constructor(private http: HttpClient) { }

  addNewLogComment(comment){
    return this.http.post(this.API_URL + 'create', comment)
  }

  getLogCommentById(commentId: number) {
    return this.http.get(this.API_URL + 'findLogCommentById/' + commentId)
  }
}
