import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../model/iuser';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {CommentService} from '../service/comment.service';
import {LikePostService} from '../service/like-post.service';

@Component({
  selector: 'app-status-liker-list',
  templateUrl: './status-liker-list.component.html',
  styleUrls: ['./status-liker-list.component.css']
})
export class StatusLikerListComponent implements OnInit {

  constructor(private likePostService: LikePostService) { }

  ngOnInit(): void {
    this.getLikerList();

  }
  @Input() postId;
  likerList: IUser[];

  getLikerList() {
    this.likePostService.findLikerByPostId(this.postId).subscribe(
      res => {
        this.likerList = <IUser[]> res;
      }
    )
  }
}
