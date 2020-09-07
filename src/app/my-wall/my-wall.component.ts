import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {CommentService} from '../service/comment.service';
import {IPost} from '../model/IPost';
import {IUser} from '../model/IUser';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import {ActivatedRoute} from '@angular/router';
import {FriendService} from '../service/friend.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-my-wall',
  templateUrl: './my-wall.component.html',
  styleUrls: ['./my-wall.component.css']
})
export class MyWallComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService, private commentService: CommentService, private tokenStorage: TokenStorageService,
              private actRoute: ActivatedRoute,
              private friendService: FriendService) {
    this.idUser = parseInt(this.actRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    this.getAllPost();
    this.checkFriend();
  }
  idUser:number;
  userLogin: IUser;
  allPost:IPost[];
  isFriend:boolean;

  getAllPost() {
    this.postService.getAllPostByUserId(this.idUser).subscribe(
      postList => this.allPost = <IPost[]> postList
    )
  }

  checkFriend(){
    this.userService.getUser().subscribe(
      response => {this.userLogin = <IUser> response;
        var status;
        this.friendService.checkFriend(this.userLogin.userId,this.idUser).subscribe(
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

  searchPost(form: NgForm) {
    if (form.value.postname==""){
      this.getAllPost();
    } else {
      this.postService.searchPostByIdAndTextPost(this.idUser,form.value.postname).subscribe(
        postList => {
          this.allPost = <IPost[]> postList;
        }
      )
    }
    form.reset(
      {
        postname:""
      }
    );
  }

  addNewPost(value) {
    this.getAllPost()
  }

  addNewComment(value) {
    this.getAllPost()
  }

  delPost(value) {
    this.allPost.splice(value,1);
  }

  sharePost(value) {
    this.getAllPost();
  }
}
