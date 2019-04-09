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
  timeLeft: number;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.getMessages()
      .subscribe((message: string) => this.messages.push(message));
    this.chatService.getTimer()
      .subscribe((timeLeft: number) => this.timeLeft = timeLeft);
  }

  sendMessage() {
    if (this.message && this.message !== '') {
      this.chatService.sendMessage(this.message);
    }
    this.message = '';
  }

  startTimer() {
    this.chatService.startTimer();
  }

  pauseTimer() {
    this.chatService.pauseTimer();
  }

  resetTimer() {
    this.chatService.resetTimer();
  }

  stopTimer() {
    this.chatService.stopTimer();
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
