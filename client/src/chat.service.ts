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
}
