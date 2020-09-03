import { Component, OnInit } from '@angular/core';
import {PostService} from '../service/post.service';
import {IPost} from '../model/IPost';
import {UserService} from '../service/user.service';
import {IUser} from '../model/iuser';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService) { }

  post: IPost;
  allPost;

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost() {
    this.postService.getAllPost().subscribe(
      postList => {
        this.allPost = (postList as IPost[]);
        for (let i = 0; i < this.allPost.length; i++) {
          this.userService.findUserById(this.allPost[i].posterId).subscribe(
            res => {
              const user = res as IUser;
              this.allPost[i].posterName = user.userName;
              this.allPost[i].posterAvatar = user.userAvatar;
            });
        }
      }
    );
  }

  like(id: number) {
    this.postService.getPostById(id).subscribe(
      resPost => {
        this.post = (resPost as IPost);
        this.post.postLike++;
      }
    );
  }

}
