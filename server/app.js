var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const socketIo = require('socket.io');
var fallback = require('express-history-api-fallback');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const GameState = require('./clue_modules/gamestate');
// const gamestate = require('./gamestate');
// let gamestatetracker;

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// TODO get this hooked up to CRA's build dir (most likely via symlink)
app.use(express.static(path.join(__dirname, 'public')));
app.use(fallback('index.html', { root: path.join(__dirname, 'public') }));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
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
      // FIXME this is not right
      return [7, 3];
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

function getLobby(rooms, id) {
  // basically we just filter out the id from the room list (socketio has each client join a room named by their id)
  // NOTE it's safe to assume clients (i.e. browser tabs) are only in 1 game at a time
  // TODO

  return rooms.filter((room) => room != id)[0];
}

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
    console.log('starting the game for room', room);
    io.in(room).emit('startGame');
    // convert player map to object for ease of access, highly inefficient but :/
    const currentplayers = [...roomMap.get(room).entries()].reduce(
      (obj, [key, value]) => ((obj[key] = value), obj),
      {},
    );
    /* player who joined first gets first move */
    let startingPlayer = Object.entries(currentplayers)[0][1];
    /* select a random player as the culprit */
    startingPlayer.isCurrentTurn = true;
    const gameState = new GameState();
    gameStateMap.set(room, gameState);

    // add the players to the game state object
    roomMap.get(room).forEach((player, id) => {
      console.log(player, id);
      gameState.assignClientPlayer(id, player.name);
    });

    // console.log(gameState.gameCardMap);

    console.log(gameState);

    // EVENT distribute cards
    gameState.startGame();

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

  // EVENTs suggestion (and accusation)
  socket.on('suggestion', (suggestion) => {
    // TODO get the gameState
    // gamestate event
    console.log('\n' + socket.id + ' made a suggestion');
    const lobby = getLobby([...socket.rooms], socket.id);
    const gameState = gameStateMap.get(lobby);
    gameState.makeGuess(
      socket.id,
      'suggestion',
      suggestion.player,
      suggestion.room,
      suggestion.weapon,
    );

    socket.emit('disprove', socket.id);
  });

  socket.on('accusation', (acc) => {
    console.log('\n' + socket.id + ' made a suggestion');
    const lobby = getLobby([...socket.rooms], socket.id);
    const gameState = gameStateMap.get(lobby);
    const gameWon = gameState.makeGuess(socket.id, 'accusation', acc.player, acc.room, acc.weapon);

    if (gameWon) {
      socket.emit('end_of_game', gameState.endGame());
      io.emit('notification', gameState.endGame() + ' won the game!');
    } else {
      // TODO handle the case of losing here!
    }
  });

  socket.on('disprove', function (disproveCard) {
    console.log('\n' + clientID + ' disprove the guess:');
    const lobby = getLobby([...socket.rooms], socket.id);
    const gameState = gameStateMap.get(lobby);

    var guess = gameState.getGuess();
    console.log(
      clientID +
        ' suggests it was ' +
        guess.getMurderPlayer().getName() +
        ' in the ' +
        guess.getMurderRoom().getName() +
        ' with a ' +
        guess.getMurderWeapon().getName(),
    );
    var disproved = gameState.disproveSuggestion(disproveCard.toLowerCase());
    console.log('disprove card: ' + disproveCard);
    if (disproved) {
      //TODO emit this turn is over
      // socket.emit('make_move',clientID);
      const nextPlayer = gameState.getCurrentPlayer;
      io.to(nextPlayer).emit('notification', 'It is your turn!');
    } else {
      socket.emit('disprove', gameState.getDisprovePlayer());
    }
  });

  socket.on('end_of_game', function (clientWon) {
    console.log('Game is over ' + clientWon + ' is the winner');

    const room = getLobby([...sockett.rooms], socket.id);
    io.emit('notification', clientWon + ' won the game!');
  });

  socket.on('board', (currentPlayers) => {
    // currentPlayers.forEach((playa) =>
    //   console.log(
    //     `Current players on the board: ${playa.playaInformation.id}:${playa.playaInformation.name}`,
    //   ),
    // );
    socket.emit('clientId', socket.id);
  });

  socket.on('playerMovement', (movementData) => {
    const lobby = getLobby([...socket.rooms], socket.id);
    const gameState = gameStateMap.get(lobby);

    gameState.movePlayerLocation(socket.id, movementData.pos);
    io.emit('playerMoved', movementData);
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
