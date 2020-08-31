import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL='localhost:8080/post/create'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  creatNewPost(post): Observable<any>{
      return this.http.post(API_URL,post)
  }

}
