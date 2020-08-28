import { Component, OnInit } from '@angular/core';
import {UploadFileService} from '../services/upload-file.service';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-cover-photo',
  templateUrl: './cover-photo.component.html',
  styleUrls: ['./cover-photo.component.css']
})
export class CoverPhotoComponent implements OnInit {

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
  }

  selectedFile = null;

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.uploadService.uploadFile(this.selectedFile)
  }
}
