import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import {CommentService} from '../service/comment.service';
import {IUser} from '../model/iuser';
import {UserService} from '../service/user.service';

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

  constructor(private commentService: CommentService, private fb:FormBuilder, private tokenStorage: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
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
    let comment = this.addCommentForm.value;
    this.newComment.emit(this.addCommentForm.value);
    this.commentService.addNewComment(comment).subscribe(
      res => {
        // window.alert("Comment successfully");
      }
    )
  }

  getUser() {
    this.userService.findUserById(this.tokenStorage.getUser().id).subscribe(
      res => this.user = <IUser> res
    )
  }
}
