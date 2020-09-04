import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {CommentService} from '../service/comment.service';
import {IPost} from '../model/IPost';
import {IUser} from '../model/iuser';
import {IComment} from '../model/IComment';
import {ActivatedRoute} from '@angular/router';
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

  @Input() post: IPost;
  postList: IPost[];
  editPost: IPost;
  editPostId: number;

  showPost() {
    let id: number;
    if (this.actRoute.snapshot.params.id == null) {
      id = this.post.postId;
    } else
      id = parseInt(this.actRoute.snapshot.params.id);

    this.postService.getPostById(id).subscribe(
      post => {
        this.post = <IPost> post
        this.userService.findUserById(this.post.posterId).subscribe(
          res => {
            let user = <IUser> res;
            this.post.posterName = user.userName;
            this.post.posterAvatar = user.userAvatar;
            this.commentService.getCommentByPostId(this.post.postId).subscribe(
              commentList => {
                this.post.commentList = <IComment[]> commentList;
              }
            )
          }
        )
      }
    )
  }

  showEditPost(postId: number) {
    this.postService.getPostById(postId).subscribe(
      post => {
        this.editPost = <IPost> post;
        this.editPostId = postId;
      }
    )
  }
}
