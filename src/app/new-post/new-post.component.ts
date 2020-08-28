import { Component, OnInit } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from '../services/post.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  creatPostForm: FormGroup;

  constructor(private postService: PostService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.creatPostForm = this.fb.group({
      id: '',
      posterId: '',
      textPost: '',
      postTime: '',
      postLike: '',
      postDislike: ''
    })
  }

  creatPost(){
    let post = this.creatPostForm.value;
    console.log(post)
  }



}
