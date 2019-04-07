import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
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
    if (this.message && this.message !== '') {
      this.chatService.sendMessage(this.message);
    }
    this.message = '';
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
