import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../model/iuser';
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
