let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

const motd = "Bienvenue petit cafard..!";
const INIT_TIME_LEFT = 60;


let timeLeft = INIT_TIME_LEFT;
let wip = false;
let stopped = false;
let interval;

io.on('connection', (socket) => {
    console.log('user connected');
    io.emit('new-message', motd);
    io.emit('time-left', timeLeft);

    socket.on('new-message', newMessage);

    socket.on('start-timer', startCounter);
    socket.on('reset-timer', resetCounter);
    socket.on('pause-timer', pauseCounter);
    socket.on('stop-timer', stopCounter);
});

const newMessage = (message) => {
    console.log(message);
    io.emit('new-message', message);
}

const startCounter = () => {
    if (wip || stopped) return;
    wip = true;
    console.log('Start timer');
    interval = setInterval(() => {
        timeLeft--;
        io.emit('time-left', timeLeft);
        if(timeLeft < 0 ){
          // The code here will run when the timer has reached zero.
          clearInterval(interval);
          console.log('game over!');
          io.emit('game-over');
        };
      }, 1000);
}

const resetCounter = () => {
    if (!stopped) return;
    stopped = false;
    timeLeft = INIT_TIME_LEFT;
    console.log('Reset timer');
    io.emit('time-left', timeLeft);
}

const pauseCounter = () => {
    if (!wip || stopped) return;
    wip = false;
    clearInterval(interval);
    console.log('Pause timer');
}

const stopCounter = () => {
    if (!wip || stopped) return;
    stopped = true;
    wip = false;
    clearInterval(interval);
    console.log('Stop timer');
    io.emit('game-over');
}

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});