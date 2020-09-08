import {Component, Input, OnInit} from '@angular/core';
import {LogCommentService} from '../service/log-comment.service';
import {ILog} from '../model/ILog';

@Component({
  selector: 'app-comment-log',
  templateUrl: './comment-log.component.html',
  styleUrls: ['./comment-log.component.css']
})
export class CommentLogComponent implements OnInit {

  constructor(private logService: LogCommentService) { }

  ngOnInit(): void {
    this.getLogList();
  }

  @Input() commentId;
  logList: ILog[];

  getLogList() {
    this.logService.getLogCommentById(this.commentId).subscribe(
      res => {
        this.logList = <ILog[]> res;
      }
    )
  }
}
