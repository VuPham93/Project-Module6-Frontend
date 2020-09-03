import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import {CommentService} from '../service/comment.service';
import {IUser} from '../model/iuser';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {IPost} from '../model/IPost';
import {FriendService} from '../service/friend.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  addCommentForm: FormGroup;
  @Output() newComment = new EventEmitter();
  @Input() postId;
  user: IUser;
  isFriend: boolean =false;
  userLogin: IUser;
  post : IPost;
  isMe:boolean = false;

  constructor(private commentService: CommentService, private fb:FormBuilder, private tokenStorage: TokenStorageService, private userService: UserService
  ,private postService: PostService,
              private friendService: FriendService) { }

  ngOnInit(): void {
    this.getUser();
    this.checkFriend();
    this.addCommentForm = this.fb.group({
      commenterId: this.tokenStorage.getUser().id,
      postId: this.postId,
      content: '',
      commentLike: '',
      commentDislike: '',
      commentTime: ''
    })
  }

  addComment(){
    if (this.isFriend||this.isMe){
      let comment = this.addCommentForm.value;
      this.newComment.emit(this.addCommentForm.value);
      this.commentService.addNewComment(comment).subscribe(
        res => {
          // window.alert("Comment successfully");
        }
      )
    } else{ alert("You are not friend!");
    this.addCommentForm.reset();
    }

  }

  getUser() {
    this.userService.findUserById(this.tokenStorage.getUser().id).subscribe(
      res => this.user = <IUser> res
    )
  }
  checkFriend(){
    this.postService.getPostById(this.postId).subscribe(
      response=>{this.post = <IPost>response;
        this.userService.getUser().subscribe(
          response => {this.userLogin = <IUser> response;
            var status;
            this.friendService.checkFriend(this.userLogin.userId,this.post.posterId).subscribe(
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
                if (this.userLogin.userId==this.post.posterId){
                  this.isMe = true;
                }
              },
              error => console.log(error)
            )
          },
          error => console.error(error)
        );
      }
    )



  }
}
