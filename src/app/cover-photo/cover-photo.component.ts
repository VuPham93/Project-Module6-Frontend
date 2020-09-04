import {Component, Input, OnInit} from '@angular/core';
import {UploadFileService} from '../service/upload-file.service';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {FriendService} from '../service/friend.service';
import {IUser} from '../model/iuser';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';

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
              private userService: UserService,
              private router: Router,
              private friendService: FriendService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.userService.findUserById(this.relatedId).subscribe(
      response => {this.user = <IUser>response},
      error => console.log(error));
    this.checkFriend();
  }

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
      }).subscribe()
      },
      error => console.log(error)
    )
  }

  uploadFile(event, option: number) {
    let file = event.target.files[0];
    let filePath = file.name;
    let fileRef = this.storage.ref(filePath);
    let task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(
        url => {
          if (option === 1) {
            this.updateCoverPhoto(url);
          } else
            this.updateAvatar(url);
        }))
    )
      .subscribe();
  }

  updateCoverPhoto(imgLink: string) {
    this.userService.findUserById(this.relatedId).subscribe(
      response => {
          this.user = <IUser>response;
          this.user.userCoverPhoto = imgLink;
          this.userService.editUser(this.user.userId, this.user).subscribe()
        },
      error => console.log(error))
  }

  updateAvatar(avatarLink: string) {
    this.userService.findUserById(this.relatedId).subscribe(
      response => {
        this.user = <IUser>response;
        this.user.userAvatar = avatarLink;
        this.userService.editUser(this.user.userId, this.user).subscribe()
      },
      error => console.log(error))
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
            }
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
