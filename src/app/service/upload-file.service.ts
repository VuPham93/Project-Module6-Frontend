import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  UPLOAD_URL: string = environment.URL + "upload";

  constructor(private httpClient: HttpClient) { }

  public uploadFile(file: File) {
    const fd = new FormData();
    fd.append('image', file, file.name);
    this.httpClient.post(this.UPLOAD_URL, fd, {reportProgress: true, observe: 'events'}).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(Math.round(event.loaded/event.total) * 100)
        } else if (event.type === HttpEventType.Response ) {
          console.log(event);
        }
      }
    )
  }
}
