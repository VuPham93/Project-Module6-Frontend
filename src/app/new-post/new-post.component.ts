import { Component, OnInit } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from '../service/post.service';
import {TokenStorageService} from '../service/signin-signup/token-storage.service';
import {IUser} from '../model/iuser';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  creatPostForm: FormGroup;
  user: IUser;

  constructor(private postService: PostService,private fb:FormBuilder, private tokenStorage: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
    this.creatPostForm = this.fb.group({
      posterId: this.tokenStorage.getUser().id,
      textPost: '',
      imagePost: '',
      videoPost: '',
      linkPost: '',
      postDate: '',
      postLike: 0,
      postDislike: 0
    })
  }

  getUser() {
    this.userService.findUserById(this.tokenStorage.getUser().id).subscribe(
      res => this.user = <IUser> res
    )
  }

  creatPost(){
    let post = this.creatPostForm.value;
    this.postService.creatNewPost(post).subscribe(
      res => {
        window.alert("Posted successfully")
      }
    )
  }
}
