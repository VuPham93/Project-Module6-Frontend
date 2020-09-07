 import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
 import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_URL = environment.URL + 'post/'

  constructor(private http: HttpClient) { }

  creatNewPost(post){
    return this.http.post(this.API_URL + 'create', post)
  }

  getAllPost() {
    return this.http.get(this.API_URL)
  }

  getPostById(id: number) {
    return this.http.get(this.API_URL + 'findPostById/' + id)
  }

  getAllPostByUserId(userId: number) {
    return this.http.get(this.API_URL + 'findPostByPosterId/' + userId)
  }

  deletePost(postId: number) {
    return this.http.delete(this.API_URL + 'delete/' + postId)
  }

  updatePost(postId: number,post) {
    return this.http.put(this.API_URL + 'update/' + postId,post)
  }

  searchPostByIdAndTextPost(userId: number, textPost:string) {
    return this.http.get(this.API_URL + 'searchPost/' + userId +"/"+textPost)
  }

  getAllImageByUserId(userId: number) {
    return this.http.get(this.API_URL + 'findImageByPosterId/' + userId)
  }
}
