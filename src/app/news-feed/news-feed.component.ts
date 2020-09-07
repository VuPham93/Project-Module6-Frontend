import { Component, OnInit } from '@angular/core';
import {PostService} from '../service/post.service';
import {IPost} from '../model/IPost';
import {IUser} from '../model/iuser';
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
    this.getAllPost();
    this.userService.getUser().subscribe(
      res=>{
        this.userLogin = <IUser> res;
      }
    )
  }

  allPost:IPost[] ;

  getAllPost() {
    this.postService.getAllPost().subscribe(
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
}
