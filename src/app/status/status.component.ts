import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {CommentService} from '../service/comment.service';
import {IPost} from '../model/IPost';
import {IUser} from '../model/iuser';
import {IComment} from '../model/IComment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService, private commentService: CommentService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.showPost()
  }

  post: IPost;

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
                for (let j = 0; j < this.post.commentList.length; j++) {
                  this.userService.findUserById(this.post.commentList[j].commenterId).subscribe(
                    res => {
                      let commenter = <IUser> res;
                      this.post.commentList[j].commenterName = commenter.userName;
                      this.post.commentList[j].commenterAvatar = commenter.userAvatar;
                    })
                }
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
}
