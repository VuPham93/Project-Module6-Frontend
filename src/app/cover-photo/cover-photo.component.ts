import {Component, Input, OnInit} from '@angular/core';
import {UploadFileService} from '../service/upload-file.service';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {catchError, filter} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FriendService} from '../service/friend.service';
import {IUser} from '../model/iuser';

@Component({
  selector: 'app-cover-photo',
  templateUrl: './cover-photo.component.html',
  styleUrls: ['./cover-photo.component.css']
})
export class CoverPhotoComponent implements OnInit {
  user:IUser;
  @Input() relatingId:number;
  @Input() relatedId:number;

  constructor(private uploadService: UploadFileService,
              private userService: UserService, private router: Router
    ,private friendService: FriendService,
              private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.findUserById(this.relatedId).subscribe(
      response => {this.user = <IUser>response},
      error => console.log(error))
  }

  selectedFile = null;
  addFriend(){
    this.userService.findUserById(this.relatedId).subscribe(
      response => {this.user = <IUser>response
      this.friendService.addInviteFriend(this.relatingId,{
        "userId": this.user.userId,
        "userName": null,
        "userEmail": null,
        "userPassword": null,
        "userSex": null,
        "dateOfBirth": null,
        "about": null,
        "userAddress": null,
        "userAvatar": null,
        "userCoverPhoto": null,
        "roles":null
      }).subscribe(


      )
      },
      error => console.log(error)

    )
}

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.uploadService.uploadFile(this.selectedFile)
  }
}
