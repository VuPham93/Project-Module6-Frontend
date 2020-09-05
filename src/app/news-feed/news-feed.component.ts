import { Component, OnInit } from '@angular/core';
import {PostService} from '../service/post.service';
import {IPost} from '../model/IPost';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getAllPost();
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
}
