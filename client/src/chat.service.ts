import * as io from 'socket.io-client';
import { Observable, Observer } from 'rxjs';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message: string) {
        this.socket.emit('new-message', message);
    }

    public getMessages = () =>
        Observable.create((observer: Observer<string>) =>
            this.socket.on('new-message', (message: string) => observer.next(message)))

    public getTimer = () =>
        Observable.create((observer: Observer<number>) =>
            this.socket.on('time-left', (timeLeft: number) => observer.next(timeLeft)))

    public startTimer = () => this.socket.emit('start-timer');
    public resetTimer = () => this.socket.emit('reset-timer');
    public pauseTimer = () => this.socket.emit('pause-timer');
    public stopTimer = () => this.socket.emit('stop-timer');


}
