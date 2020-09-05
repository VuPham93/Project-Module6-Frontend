import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../model/IComment';
import {NgForm} from '@angular/forms';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {LikeCommentService} from '../service/like-comment.service';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import {CommentService} from '../service/comment.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {

  constructor(private userService: UserService,
              private postService: PostService,
              private likeCommentService: LikeCommentService,
              private tokenStorage: TokenStorageService,
              private commentService: CommentService) { }

  ngOnInit(): void {
  }

  @Input() comment: IComment

  editComment(form: NgForm) {
    this.comment.content = form.value.content;
    this.commentService.updateComment(this.comment.commentId, this.comment).subscribe()
  }
}
