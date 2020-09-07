import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeCommentService {

  private API_URL =  environment.URL + 'like/comment/'

  constructor(private http: HttpClient) { }

  newLikeComment(likeComment) {
    return this.http.post(this.API_URL + 'create', likeComment)
  }

  findAllLikeComment() {
    return this.http.get(this.API_URL)
  }

  unLikeAComment(id) {
    return this.http.delete(this.API_URL + 'delete/' + id)
  }

  findAllLikeCommentByCommentId(commentId: number) {
    return this.http.get(this.API_URL + 'finByCommentId/' + commentId)
  }

  findLikerByCommentId(commentId: any) {
    return this.http.get(this.API_URL + 'findLikerByCommentId/' + commentId)
  }
}
