import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {CommentService} from '../service/comment.service';
import {IPost} from '../model/IPost';
import {IUser} from '../model/iuser';
import {IComment} from '../model/IComment';
import {ActivatedRoute} from '@angular/router';
import {LikePostService} from '../service/like-post.service';
import {ILikePost} from '../model/ILikePost';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private userService: UserService,
              private postService: PostService,
              private commentService: CommentService,
              private likePostService: LikePostService,
              private tokenStorage: TokenStorageService,
              private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.showPost();
    this.checkLikedStatus();
    this.userService.getUser().subscribe(
      res => {this.userLogin= <IUser> res;}
    )
  }

  @Input() post: IPost;
  postList: IPost[];
  editPost: IPost;
  editPostId: number;
  userLogin:IUser;

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

  likePost = {
    id: null,
    postId: null,
    likerId: null,
  };

  liked: boolean;
  likeList: ILikePost[];

  likeAPost() {
    this.likePost.postId = this.post.postId;
    this.likePost.likerId = this.tokenStorage.getUser().id;
    this.likePostService.newLikePost(this.likePost).subscribe(
      res => {
        this.checkLikedStatus();
      }
    );
  }

  unLikeAPost() {
    this.likePostService.findAllLikePost().subscribe(
      res => {
        this.likeList = <ILikePost[]> res;
        for (let i = 0; i < this.likeList.length; i++) {
          if (this.likeList[i].likerId === this.tokenStorage.getUser().id && this.likeList[i].postId === this.post.postId) {
            this.likePostService.unLikeAPost(this.likeList[i].id).subscribe();
          }
        }
        this.post.postLike--;
        this.liked = false;
      }
    )
  }

  checkLikedStatus() {
    this.post.postLike = 0;
    this.liked = false;
    this.likePostService.findAllLikePost().subscribe(
      res => {
        this.likeList = <ILikePost[]> res;
        for (let i = 0; i < this.likeList.length; i++) {
          if (this.likeList[i].postId === this.post.postId) {
            this.post.postLike++;
            if (this.likeList[i].likerId === this.tokenStorage.getUser().id) {
              this.liked = true;
            }
          }
        }
      }
    )
  }

  addNewComment(value) {
    this.post.commentList.push(value);
  }

  delComment(value) {
    this.post.commentList.splice(value,1);
  }
}