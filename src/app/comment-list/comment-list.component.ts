import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {CommentService} from '../service/comment.service';
import {IUser} from '../model/IUser';
import {IComment} from '../model/IComment';
import {NgForm} from '@angular/forms';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import {LikeCommentService} from '../service/like-comment.service';
import {IPost} from '../model/IPost';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  constructor(private userService: UserService,
              private postService: PostService,
              private likeCommentService: LikeCommentService,
              private tokenStorage: TokenStorageService,
              private commentService: CommentService) { }

  ngOnInit(): void {
    this.getCommentList();
    this.userService.getUser().subscribe(
      res=>{
        this.userLogin = <IUser>res;
      }
    )
    this.postService.getPostById(this.postId).subscribe(
      res=>{
        this.post = <IPost>res;
      }
    )
  }
  @Output() newComment = new EventEmitter();
  @Output() delComment = new EventEmitter();
  @Input() postId;
  commentList: IComment[];

  userLogin: IUser;
  post : IPost;

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

  deleteComment(commentId: number,index : number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'That comment has been deleted.',
            'success'
          );
          this.commentService.deleteComment(commentId).subscribe(
            res => {this.getCommentList();
              this.delComment.emit(index);
            }
          )
        }
      }
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
    this.newComment.emit(value);
    this.getCommentList();
  }

  isExpanded = false;

  expandItems() {
      this.isExpanded = true;
  }

  hideItems() {
      this.isExpanded = false;
  }
}
