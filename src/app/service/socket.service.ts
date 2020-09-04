import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Message } from '../model/message';

@Injectable()
export class SocketService {
  url: string = "http://localhost:8080/api/socket";

  constructor(private http: HttpClient) { }

  post(data: Message) {
    return this.http.post<Message>(this.url, data)
      .map((data: Message) => { return data; })
      .catch(error => {
        return new ErrorObservable(error);
      })
      ;
  }
}
