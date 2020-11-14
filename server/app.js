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

var position = {
  x: 0,
  y: 0,
};

// TODO we should move the socket handling code to a new file!
io.on('connect', (socket) => {
  console.log('connected!');
  socket.on('disconnect', () => {
    console.log('disconnected!');
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

  socket.emit('position', position);

  socket.on('pos_change', (pos) => {
    console.log('Position changed!');
    position = pos;
    io.emit('position', position);
  });
});

module.exports = {
  app,
  io,
};
