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
  isFriend: boolean = false;
  userLogin: IUser;
  @Input() relatingId:number;
  @Input() relatedId:number;

  constructor(private uploadService: UploadFileService,
              private userService: UserService, private router: Router
    ,private friendService: FriendService,
              private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.findUserById(this.relatedId).subscribe(
      response => {this.user = <IUser>response},
      error => console.log(error));
    this.checkFriend();
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
  checkFriend(){
    this.userService.getUser().subscribe(
      response => {this.userLogin = <IUser> response;
        var status;
        this.friendService.checkFriend(this.userLogin.userId,this.relatedId).subscribe(
          response => {status = response;
            switch (status) {
              case 0:
                this.isFriend = false;
                break;
              case 1:
                this.isFriend = false;
                break;
              case 2:
                this.isFriend = true;
                break;
              case 3:
                this.isFriend = false;
                break;
            };
          },
          error => console.log(error)
        )
      },
      error => console.error(error)
    );


  }

  unFriend(relatedId:number,statusId:number){
    this.userService.findUserById(relatedId).subscribe(
      response => {
        this.user = <IUser>response;
        this.userService.getUser().subscribe(
          response => { this.userLogin = <IUser> response;
            this.friendService.unFriend(this.userLogin.userId,statusId,{
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
              response => {
                this.isFriend=false;
              },
              error => console.error(error)

            )
          },
          error => console.error(error)
        )


      },
      error => console.error(error)

    )
  }
}
