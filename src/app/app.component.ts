import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'athaclie-chat';
  message: string;
  messages: Array<string> = new Array();

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.getMessages()
      .subscribe((message: string) => this.messages.push(message));
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
