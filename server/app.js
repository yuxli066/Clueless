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

// FIXME this is a dangerous global that we should fix!
const position = {};

// FIXME I think this is a dangerous global! We need to make this safer and able to synchronize read/writes!
const roomMap = new Map();

const PLAYERS = new Set([
  'Colonel Mustard',
  'Rev. Green',
  'Professor Plum',
  'Miss Scarlet',
  'Mrs. Peacock',
  'Mrs. White',
]);

// TODO we should move the socket handling code to a new file!
io.on('connect', (socket) => {
  console.log(`new websocket client with id ${socket.id} connected!`);

  socket.on('disconnect', () => {
    delete position[socket.id];
    io.emit('playerMoved', position);
    console.log(`client ${socket.id} disconnected!`);
  });

  // adapted from: https://stackoverflow.com/a/40413809
  // using rooms as opposed to namespaces for now so that we minimize the back-and forth between socket and client
  // (namespaces would mean the server creating the namespace and then the client connecting to the namespace, so an extra trip)
  socket.on('join', (room = undefined) => {
    // FIXME there's a ton in here that can be cleaned and optimized!

    let joinedRoom = room;
    if (room) {
      console.log('client joining game room:', room);
      socket.join(room);
    } else {
      // Join a random room
      console.log('client seeking to join a random game room');
      const availableRooms = new Map(io.sockets.adapter.rooms);
      // filter out the rooms that are id specific (each client has their own room)
      // I want to run forEach on keys but that doesn't quite work
      io.sockets.sockets.forEach((_, key) => availableRooms.delete(key));

      // TODO filter out rooms that are full!
      // TODO pick a random room!
      // for now, just pick the first one
      const roomToJoin = availableRooms.keys().next().value;
      socket.join(roomToJoin);
      joinedRoom = roomToJoin;
    }

    // TODO do we want to send to the client the room they just joined?

    if (!roomMap.has(joinedRoom)) {
      // TODO create a new map for the clients and character names
      const characterName = Array.from(PLAYERS)[Math.floor(Math.random() * PLAYERS.size)];
      // TODO map or object?
      roomMap.set(joinedRoom, new Map([[socket.id, characterName]]));
      console.log('your player name is going to be:', characterName);
    } else {
      // update the entry to take a random available name
      // get the player map for this room, find out the unused player names, and assign a random one
      const playerMap = roomMap.get(joinedRoom);
      const usedPlayerNames = new Set(playerMap.values());
      const remainingNames = new Set([...PLAYERS].filter((player) => !usedPlayerNames.has(player)));
      const characterName = Array.from(remainingNames)[
        Math.floor(Math.random() * remainingNames.size)
      ];

      console.log('your player name is going to be:', characterName);
      playerMap.set(socket.id, characterName);
      io.in(joinedRoom).emit('playerMap', playerMap);
    }

    // TODO can we get the player map sooner than here?
    const playerMap = roomMap.get(joinedRoom);

    // FIXME consider moving playerMap to just a json object? (if we want to keep lobbies around then it might make more sense to keep the ES6 map)
    let serializedPlayerMap = [];
    for ([key, value] of playerMap) {
      serializedPlayerMap.push({ id: key, name: value });
    }

    // TODO broadcast that the client joined the room!
    io.in(joinedRoom).emit('playerList', serializedPlayerMap);
  });

  // TODO do we want to move this to the client not having to say they left the room? (assumes clients can only be in one room at a time!)
  socket.on('leave', (room) => {
    console.log('client leaving game room:', room);
    socket.leave(room);
  });

  socket.on('requestGameStart', (room) => {
    // TODO we need to check to make sure this works!
    console.log('starting the game!');
    console.log(room);
    console.log(socket.rooms);
    io.in(room).emit('startGame');
  });

  socket.on('disconnecting', () => {
    // TODO we need to emit to the room that this socket will disconnect imminently
    console.log('disconnecting here!');
    // console.log(socket.rooms);
    const rooms = new Set([...socket.rooms].filter((room) => room !== socket.id));
    rooms.forEach((room) => {
      // delete the player from the playerMap inside of the room
      // this way the character can be reused
      console.log('removing player from room:', room);

      // TODO I want to use #get()?.delete() but some it seemed like some people's node had trouble?
      const roomToDelete = roomMap.get(room);
      if (roomToDelete) {
        roomToDelete.delete(socket.id);
      }

      // TODO update the remaining clients!
    });
  });

  socket.on('greet', (greeting) => {
    console.log('client said:', greeting);
    console.log('sending response back...');
    socket.emit('response', 'Hello from server!');
  });

  socket.on('display_notification', (message) => {
    console.log('client said:', message);
    socket.emit('notification', message);
  });

  socket.on('greetOtherClients', (greeting) => {
    console.log('client said:', greeting);
    io.emit('broadcast', 'Hello all clients from server!');
  });

  socket.on('newPlayer', (initialLocation) => {
    if (!position[socket.id]) {
      position[socket.id] = {};
    }
    position[socket.id].x = initialLocation.x;
    position[socket.id].y = initialLocation.y;

    // send to this client their id
    socket.emit('clientId', socket.id);

    // send positions to all clients so they get the new player
    io.emit('playerMoved', position);
  });

  socket.on('playerMovement', (movementData) => {
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
