import * as io from 'socket.io-client';
import { Observable, Observer } from 'rxjs';

enum Event {
    NewMessage = 'new-message',
    TimeLeft = 'time-left',
    Start = 'start-timer',
    Reset = 'reset-timer',
    Pause = 'pause-timer',
    Stop = 'stop-timer'
}

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message: string) {
        this.socket.emit(Event.NewMessage, message);
    }

    public getMessages = () =>
        Observable.create((observer: Observer<string>) =>
            this.socket.on(Event.NewMessage, (message: string) => observer.next(message)))

    public getTimer = () =>
        Observable.create((observer: Observer<number>) =>
            this.socket.on(Event.TimeLeft, (timeLeft: number) => observer.next(timeLeft)))

    public startTimer = () => this.socket.emit(Event.Start);
    public resetTimer = () => this.socket.emit(Event.Reset);
    public pauseTimer = () => this.socket.emit(Event.Pause);
    public stopTimer = () => this.socket.emit(Event.Stop);

}
