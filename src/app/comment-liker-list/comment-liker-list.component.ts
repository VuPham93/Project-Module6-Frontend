import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../model/iuser';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {CommentService} from '../service/comment.service';
import {LikePostService} from '../service/like-post.service';
import {LikeCommentService} from '../service/like-comment.service';

@Component({
  selector: 'app-comment-liker-list',
  templateUrl: './comment-liker-list.component.html',
  styleUrls: ['./comment-liker-list.component.css']
})
export class CommentLikerListComponent implements OnInit {

  constructor(private likeCommentService: LikeCommentService) { }

  ngOnInit(): void {
    this.getLikerList();
  }

  @Input() commentId;
  likerList: IUser[];

  getLikerList() {
    this.likeCommentService.findLikerByCommentId(this.commentId).subscribe(
      res => {
        this.likerList = <IUser[]> res;
      }
    )
  }
}
