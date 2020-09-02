import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {CommentService} from '../service/comment.service';
import {IPost} from '../model/IPost';
import {IUser} from '../model/iuser';
import {IComment} from '../model/IComment';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';

@Component({
  selector: 'app-my-wall',
  templateUrl: './my-wall.component.html',
  styleUrls: ['./my-wall.component.css']
})
export class MyWallComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService, private commentService: CommentService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getAllPost()
  }

  post: IPost;
  allPost;

  getAllPost() {
    this.postService.getAllPostByUserId(this.tokenStorage.getUser().id).subscribe(
      postList => {
        this.allPost = <IPost[]> postList;
        for (let i = 0; i < this.allPost.length; i++) {
          this.userService.findUserById(this.allPost[i].posterId).subscribe(
            res => {
              let user = <IUser> res;
              this.allPost[i].posterName = user.userName;
              this.allPost[i].posterAvatar = user.userAvatar;

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

  deletePost(postId: any) {
    this.commentService.getCommentByPostId(postId).subscribe(
      commentList => {
           let comments = <IComment[]> commentList;
               for (let i = 0; i < comments.length; i++) {
          this.commentService.deleteComment(comments[i].commentId).subscribe(
            res => console.log("comment deleted")
          )
        }
      }
    )
    this.postService.deletePost(postId).subscribe(
      res => {
        window.alert("Post deleted");
      }
    )
  }
}
