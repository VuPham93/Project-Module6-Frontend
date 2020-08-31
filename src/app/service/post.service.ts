import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_URL = 'http://localhost:8080/post/'

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
}
