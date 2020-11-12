var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const socketIo = require('socket.io');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// TODO get this hooked up to CRA's build dir (most likely via symlink)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const io = socketIo();

const position = {};

// TODO we should move the socket handling code to a new file!
// FIXME this is a dangerous global! We need to come up with a better way of handling it!
var lobbies = {};

// TODO we should move the socket handling code to a new file!
io.on('connect', (socket) => {
  console.log(`new websocket client with id ${socket.id} connected!`);

  socket.on('disconnect', () => {
    console.log(`client ${socket.id} disconnected!`);
  });

  // adapted from: https://stackoverflow.com/a/40413809
  socket.on('join', (room) => {
    console.log('client joining game room:', room);
    socket.join(room);
    // TODO broadcast that the client joined the room!
    // TODO also figure out a way to indicate who is who

    // TODO are we able to do something with the io object itself maybe? i think that the rooms might be able to be accessed from there and see who's in them!
  });

  socket.on('leave', (room) => {
    console.log('client leaving game room:', room);
    socket.leave(room);
  });

  socket.on('disconnecting', () => {
    // TODO we need to emit to the room that this socket will disconnect imminently
    console.log(socket.rooms);
  });

  socket.on('greet', (greeting) => {
    console.log('client said:', greeting);
    console.log('sending response back...');
    socket.emit('response', 'Hello from server!');
  });

  socket.on('greetOtherClients', (greeting) => {
    console.log('client said:', greeting);
    io.emit('broadcast', 'Hello all clients from server!');
  });

  socket.on('playerMovement', (movementData) => {
    console.log('Made it to the server');
    if (!position[socket.id]) {
      position[socket.id] = {};
    }
    position[socket.id].x = movementData.x;
    position[socket.id].y = movementData.y;
    // emit a message to all players about the player that moved
    io.emit('playerMoved', position);
  });
});

module.exports = {
  app,
  io,
};
