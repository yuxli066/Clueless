var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const socketIo = require('socket.io');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// const GameState = require('./clue_modules/gamestate');
const gamestate = require('./gamestateserver');
let gamestatetracker;

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
const gameStateMap = new Map();
const PLAYERS = new Set([
  'Colonel Mustard',
  'Rev. Green',
  'Professor Plum',
  'Miss Scarlet',
  'Mrs. Peacock',
  'Mrs. White',
]);

const getInitialLocation = (playerName) => {
  switch (playerName) {
    case 'Colonel Mustard':
      return [2, 2];
    case 'Rev. Green':
      return [3, 7];
    case 'Professor Plum':
      return [1, 3];
    case 'Miss Scarlet':
      return [5, 1];
    case 'Mrs. Peacock':
      return [1, 5];
    case 'Mrs. White':
      return [5, 7];
    default:
      return 'none';
  }
};

//Recieve this, don't hardcode
const getPlayerDeck = (playerName) => {
  switch (playerName) {
    case 'Colonel Mustard':
      return ['Study', 'Billard Room'];
    case 'Rev. Green':
      return ['Mrs. White', 'Wrench'];
    case 'Professor Plum':
      return ['Library', 'Revolver'];
    case 'Miss Scarlet':
      return ['Hall', 'Candlestick'];
    case 'Mrs. Peacock':
      return ['Rope', 'Colonel Mustard'];
    case 'Mrs. White':
      return ['Kitchen', 'Conservatory'];
    default:
      return 'none';
  }
};

// TODO we should move the socket handling code to a new file!
io.on('connect', (socket) => {
  console.log(`new websocket client with id ${socket.id} connected!`);

  socket.on('disconnect', () => {
    delete position[socket.id];
    // io.emit('playerMoved', position);
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

      // FIXME this assumes that at least one room is present
      // FIXME it also includes rooms that are full/already in game
      const roomToJoin = availableRooms.keys().next().value;
      socket.join(roomToJoin);
      joinedRoom = roomToJoin;
      socket.emit('lobby', joinedRoom);
    }

    // If no room, create room, else create new player in existing room.
    let characterName,
      playerMap = roomMap.has(joinedRoom) ? roomMap.get(joinedRoom) : new Map(),
      playerNamesArray = [];
    playerMap.forEach((playa) => playerNamesArray.push(playa.name));
    let usedPlayerNames = new Set(playerNamesArray),
      remainingNames = new Set([...PLAYERS].filter((player) => !usedPlayerNames.has(player))),
      initialPosition,
      playerInfo = {};
    if (!roomMap.has(joinedRoom)) {
      characterName = Array.from(PLAYERS)[Math.floor(Math.random() * PLAYERS.size)];
      roomMap.set(joinedRoom, new Map([]));
    } else {
      characterName = Array.from(remainingNames)[Math.floor(Math.random() * remainingNames.size)];
    }

    playerMap = roomMap.get(joinedRoom);
    initialPosition = getInitialLocation(characterName);
    playerDeck = getPlayerDeck(characterName);

    playerInfo = {
      id: socket.id,
      name: characterName,
      initPosition: initialPosition,
      playerDeck: playerDeck,
      isCurrentTurn: false,
      isCulprit: false,
    };
    playerMap.set(socket.id, playerInfo);
    console.log(`Your Client ID is: ${socket.id}`);
    console.log(`Your Player Name is: ${characterName}`);
    console.log(`Your Starting Position is: [${initialPosition}]`);

    // serialize player map
    let serializedPlayerMap = [];
    for ([key, value] of playerMap) {
      serializedPlayerMap.push({ id: key, playaInformation: value });
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
    io.in(room).emit('startGame');
    // convert player map to object for ease of access, highly inefficient but :/
    const currentplayers = [...roomMap.get(room).entries()].reduce(
      (obj, [key, value]) => ((obj[key] = value), obj),
      {},
    );
    /* player who joined first gets first move */
    let startingPlayer = Object.entries(currentplayers)[0][1];
    /* select a random player as the culprit */
    let culprit = Object.entries(currentplayers)[
      Math.floor(Math.random() * Math.floor(Object.entries(currentplayers).length))
    ][1];
    console.log('the starting player is: ', startingPlayer);
    console.log('the culprit is: ', culprit);
    startingPlayer.isCurrentTurn = true;
    gamestatetracker = new gamestate(currentplayers, startingPlayer, true);

    /* format object in a way to pass to client */
    let currentplayersforclient = [];
    for ([key, value] of Object.entries(currentplayers)) {
      currentplayersforclient.push({ id: key, playaInformation: value });
    }

    io.in(room).emit('game_started_on_board', currentplayersforclient);
  });

  socket.on('display_notification', (message) => {
    console.log('client said:', message);
    socket.emit('notification', message);
  });

  socket.on('suggestion', (suggestion) => {
    console.log(suggestion);
  });

  socket.on('accusation', (acc) => {
    console.log(acc);
  });

  socket.on('board', (currentPlayers) => {
    currentPlayers.forEach((playa) =>
      console.log(
        `Current players on the board: ${playa.playaInformation.id}:${playa.playaInformation.name}`,
      ),
    );
    socket.emit('clientId', socket.id);
  });

  socket.on('playerMovement', (movementData) => {
    io.emit('playerMoved', movementData);
  });

  /** TEST ONLY*/
  socket.on('greet', (greeting) => {
    console.log('client said:', greeting);
    console.log('sending response back...');
    socket.emit('response', 'Hello from server!');
  });

  socket.on('greetOtherClients', (greeting) => {
    console.log('client said:', greeting);
    io.emit('broadcast', 'Hello all clients from server!');
  });
  /** TEST ONLY*/
});

module.exports = {
  app,
  io,
};
