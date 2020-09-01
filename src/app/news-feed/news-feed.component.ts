import { Component, OnInit } from '@angular/core';
import {PostService} from '../service/post.service';
import {IPost} from '../model/IPost';
import {UserService} from '../service/user.service';
import {IUser} from '../model/iuser';
import {CommentService} from '../service/comment.service';
import {IComment} from '../model/IComment';
import {FormBuilder, NgForm} from '@angular/forms';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import {interval} from 'rxjs';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService, private commentService: CommentService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getAllPostByUserId()  ;
  }

  post: IPost;
  allPost:IPost[] ;
  idPostEdit:number;
  indexEdit: number;

  getAllPostByUserId() {
    this.postService.getAllPost().subscribe(
      postList => {
        this.allPost = <IPost[]> postList;
        for (let i = 0; i < this.allPost.length; i++) {
          this.userService.findUserById(this.allPost[i].posterId).subscribe(
            res => {
              let user = <IUser> res;
              this.allPost[i].posterName = user.userName;
              this.allPost[i].posterAvatar = user.userAvatar;


              // @ts-ignore
              this.allPost[i].commentList = this.commentService.getCommentByPostId(this.allPost[i].postId).subscribe(
                commentList => {
                  this.allPost[i].commentList = <IComment[]> commentList;
                  for (let j = 0; j < this.allPost[i].commentList.length; j++) {
                    this.userService.findUserById(this.allPost[i].commentList[j].commenterId).subscribe(
                      res => {
                        let commenter = <IUser> res;
                        this.allPost[i].commentList[j].commenterName = commenter.userName;
                        this.allPost[i].commentList[j].commenterAvatar = commenter.userAvatar;
                      })
                  }
                }
              )
            })
        }
      }
    )
  }

  like(id: number) {
    this.postService.getPostById(id).subscribe(
      resPost => {
        this.post = <IPost> resPost;
        this.post.postLike++;
      }
    )
  }
  getIdPost(idPost:number,index: number){
    this.idPostEdit = idPost;
    this.indexEdit = index;
  }
  onSubmit(form:NgForm){
    this.postService.getPostById(this.idPostEdit).subscribe(
      resPost => {
        this.post = <IPost> resPost;
        this.post.textPost=form.value.content;
        this.postService.updatePost(this.idPostEdit,this.post).subscribe(
          resPost => {
            for (let i = 0 ; i< this.allPost.length;i++){
              if (i == this.indexEdit){
                this.allPost[i].textPost = form.value.content;
              }
            }


          }
        )
      }
    )

  }

  addNewPost(value) {
    this.getAllPostByUserId()
  }
}
