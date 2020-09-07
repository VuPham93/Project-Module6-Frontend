import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {CommentService} from '../service/comment.service';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import {ActivatedRoute} from '@angular/router';
import {FriendService} from '../service/friend.service';
import {IUser} from '../model/iuser';

@Component({
  selector: 'app-my-photo',
  templateUrl: './my-photo.component.html',
  styleUrls: ['./my-photo.component.css']
})
export class MyPhotoComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService, private commentService: CommentService, private tokenStorage: TokenStorageService,
              private actRoute: ActivatedRoute) {
    this.idUser = parseInt(this.actRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    this.getAllPost();
  }

  idUser:number;
  allImage;

  getAllPost() {
    this.postService.getAllImageByUserId(this.idUser).subscribe(
      imageList => this.allImage = <string[]> imageList
    )
  }
}
