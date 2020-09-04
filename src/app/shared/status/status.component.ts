import { Component, OnInit } from '@angular/core';
import {UserService} from '../../container/service/user.service';
import {PostService} from '../../container/service/post.service';
import {CommentService} from '../../container/service/comment.service';
import {IPost} from '../../container/model/IPost';
import {IUser} from '../../container/model/iuser';
import {IComment} from '../../container/model/IComment';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private userService: UserService,
              private postService: PostService,
              private commentService: CommentService,
              private actRoute: ActivatedRoute,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.showPost()
  }

  post: IPost;
  comments;

  showPost() {
    this.postService.getPostById(parseInt(this.actRoute.snapshot.params.id)).subscribe(
      post => {
        this.post = <IPost> post
        this.userService.findUserById(this.post.posterId).subscribe(
          res => {
            let user = <IUser> res;
            console.log(user)
            this.post.posterName = user.userName;
            this.post.posterAvatar = user.userAvatar;
            this.commentService.getCommentByPostId(this.post.postId).subscribe(
              commentList => {
                this.post.commentList = <IComment[]> commentList;
              }
            )
          })
      }
    )
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(
      res => this.showPost()
    )
  }

  idPostEdit:number;

  getIdPost(idPost:number){
    this.idPostEdit = idPost;
  }

  deleteImage() {
    this.post.imagePost = '';
  }

  onSubmit(form:NgForm){
    this.postService.getPostById(this.idPostEdit).subscribe(
      resPost => {
        this.post = <IPost> resPost;
        this.post.textPost = form.value.textPost;
        this.post.imagePost = form.value.imagePost;
        this.postService.updatePost(this.idPostEdit,this.post).subscribe(
          resPost => {
            this.showPost();
          }
        )
      }
    )
  }

  newImage() {
    window.alert("hello")
  }

  uploadFile(event) {
    let file = event.target.files[0];
    let filePath = file.name;
    let fileRef = this.storage.ref(filePath);
    let task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(
        url => this.post.imagePost = url))
    )
      .subscribe();
  }

}
