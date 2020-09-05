import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../model/message';
import {SocketService} from '../service/socket.service';
import {ToastrService} from 'ngx-toastr';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {UserService} from '../service/user.service';
import {FriendService} from '../service/friend.service';
import {IUser} from '../model/iuser';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users:IUser[];
  userLogin: IUser;
  userTarget: IUser;

  private serverUrl = 'http://localhost:8080/socket'
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  private stompClient;
  form: FormGroup;
  userForm: FormGroup;
  messages: Message[] = [];
  constructor(private socketService: SocketService, private toastr: ToastrService
  ,private userService: UserService,private friendService: FriendService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(
      response => {this.userLogin = <IUser>response;
      this.userTarget =<IUser>response;
      }
    )
    this.userService.findAllUser().subscribe(
      response => {this.users = <IUser[]>response
      }
    )
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    })
    this.userForm = new FormGroup({
      fromId: new FormControl(null, [Validators.required]),
      toId: new FormControl(null)
    })
    this.initializeWebSocketConnection();
    // this.openSocket();
  }
  setUserTarget(value){
    this.userService.findUserById(value).subscribe(
      response => {this.userTarget = <IUser>response;
      }
    )
   if (this.isCustomSocketOpened ==false){
     this.openSocket();
   }
    this.messages=[];
  }

  sendMessageUsingSocket() {
      // @ts-ignore
    let message: Message = { message: this.form.value.message, fromId:this.userLogin.userId.toString(), toId: this.userTarget.userId.toString()};
      this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
      this.form.reset();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.isLoaded = true;
      that.openGlobalSocket()
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe("/socket-publisher", (message) => {
      this.handleResult(message);
    });
  }

  openSocket() {
    if (this.isLoaded) {
      this.userService.getUser().subscribe(
        response => {this.userLogin = <IUser>response;
          this.isCustomSocketOpened = true;
          this.stompClient.subscribe("/socket-publisher/"+this.userLogin.userId.toString(), (message) => {
            this.handleResult(message);
          });
        }
      )

    };

  }

  handleResult(message){
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
      this.toastr.success("new message recieved", null, {
        'timeOut': 3000
      });
    }
  }

}
