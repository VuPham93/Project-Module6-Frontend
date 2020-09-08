import { Component, OnInit } from '@angular/core';
import {PostService} from '../service/post.service';
import {IPost} from '../model/IPost';
import {IUser} from '../model/IUser';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
userLogin: IUser;
  constructor(private postService: PostService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.fromIndex = 0;
    this.getAllPost();
    this.userService.getUser().subscribe(
      res=>{
        this.userLogin = <IUser> res;
      }
    )
  }

  allPost:IPost[] ;
  fromIndex: number;

  getAllPost() {
    this.postService.getPostLimited(this.fromIndex).subscribe(
      postList => this.allPost = <IPost[]> postList
    )
  }

  addNewPost(value) {
    this.getAllPost()
  }

  addNewComment(value) {
    this.getAllPost()
  }

  delPost(value) {
    this.allPost.splice(value,1);
  }

  sharePost(value) {
    this.getAllPost();
  }

  loadMore() {
    this.fromIndex = this.fromIndex + 5;
    this.postService.getPostLimited(this.fromIndex).subscribe(
      postList => {
        let newPosts = <IPost[]> postList;
        for (let i = 0; i < newPosts.length; i++) {
          this.allPost.push(newPosts[i]);
        }
      }
    )
  }
}
