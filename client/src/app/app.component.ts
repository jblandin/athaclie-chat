import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faPause, faPlay, faSkull, faStop, faUndo } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { ChatService } from 'src/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  faPlay = faPlay;
  faPause = faPause;
  faUndo = faUndo;
  faStop = faStop;
  faSkull = faSkull;

  message: string;
  messages: Array<string> = new Array();
  timeLeft: number;
  alerteTimeLeft = 300;

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

  getTimeLeftStr() {
    return moment.utc(this.timeLeft * 1000).format('HH:mm:ss');
  }

  isDanger() {
    return this.timeLeft <= this.alerteTimeLeft;
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
