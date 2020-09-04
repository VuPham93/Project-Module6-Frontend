import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {CommentService} from '../service/comment.service';
import {IUser} from '../model/iuser';
import {IComment} from '../model/IComment';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  constructor(private userService: UserService,
              private postService: PostService,
              private commentService: CommentService) { }

  ngOnInit(): void {
    this.getCommentList()
  }

  @Input() postId;
  commentList: IComment[];

  getCommentList() {
    this.commentService.getCommentByPostId(this.postId).subscribe(
      commentList => {
        this.commentList = <IComment[]> commentList;
        for (let i = 0; i < this.commentList.length; i++) {
          this.userService.findUserById(this.commentList[i].commenterId).subscribe(
            res => {
              let commenter = <IUser> res;
              this.commentList[i].commenterName = commenter.userName;
              this.commentList[i].commenterAvatar = commenter.userAvatar;
            })
        }
      }
    )
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(
      res => this.getCommentList()
    )
  }

  idCommentEdit:number;
  indexEdit: number;
  comment: IComment;

  getIdComment(commentId: number, i: number) {
    this.idCommentEdit= commentId;
    this.indexEdit=i;
  }

  onSubmit(form: NgForm) {
    this.commentService.getCommentById(this.idCommentEdit).subscribe(
      resPost => {
        this.comment = <IComment> resPost;
        this.comment.content = form.value.content;
        this.commentService.updateComment(this.idCommentEdit,this.comment).subscribe(
          resPost => {
            for (let i = 0 ; i<= this.commentList.length; i++){
              if (i == this.indexEdit){
                this.commentList[i].content = form.value.content;
              }
            }
          }
        )
      }
    )
  }

  addNewComment(value) {
    this.getCommentList();
  }
}
