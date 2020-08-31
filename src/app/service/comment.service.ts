import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private API_URL = 'http://localhost:8080/comment/'

  constructor(private http: HttpClient) { }

  addNewComment(comment){
    return this.http.post(this.API_URL + 'create', comment)
  }

  getAllComment() {
    return this.http.get(this.API_URL)
  }

  getCommentByPostId(postId: number) {
    return this.http.get(this.API_URL + 'findCommentsByPostId/' + postId)
  }
}
