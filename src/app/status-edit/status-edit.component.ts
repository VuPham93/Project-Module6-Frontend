import {Component, Input, OnInit} from '@angular/core';
import {IPost} from '../model/IPost';
import {NgForm} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {CommentService} from '../service/comment.service';
import {ActivatedRoute} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import Swal from "sweetalert2";

@Component({
  selector: 'app-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.css']
})
export class StatusEditComponent implements OnInit {

  constructor(private userService: UserService,
              private postService: PostService,
              private commentService: CommentService,
              private actRoute: ActivatedRoute,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {

  }

  @Input() post: IPost;

  onSubmit(form:NgForm){
    this.post.textPost = form.value.textPost;
    this.post.imagePost = form.value.imagePost;
    this.post.videoPost = form.value.videoPost;
    if (this.post.videoPost.includes("https://www.youtube.com/watch")) {
      this.post.videoPost = this.getEmblemCode(form.value.videoPost);
    }
    this.postService.updatePost(this.post.postId, this.post).subscribe();
    Swal.fire(
      'Done!',
      'Your post has been saved!',
      'success'
    )
  }

  deleteImage() {
    this.post.imagePost = '';
  }

  uploadFile(event) {
    let file = event.target.files[0];
    let filePath = file.name;
    let fileRef = this.storage.ref(filePath);
    let task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(
        url => this.post.imagePost = url))
    )
      .subscribe();
  }

  selectStatus(event) {
    this.post.status = event;
  }

  getEmblemCode(link: string) {
    let videoId = link.slice(32);
    return 'https://www.youtube.com/embed/' + videoId;
  }
}
