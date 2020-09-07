import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private API_URL = environment.URL + 'comment/'

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
  getCommentById(commentId: number) {
    return this.http.get(this.API_URL + 'findCommentById/' + commentId)
  }

  deleteComment(commentId: number) {
    return this.http.delete(this.API_URL + 'delete/' + commentId)
  }

  updateComment(commentId: number,comment) {
    return this.http.put(this.API_URL + 'update/' + commentId,comment)
  }
}
