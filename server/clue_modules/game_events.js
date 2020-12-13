
// Import events module
var events = require('events');
var GameState = require('./gamestate');

// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();
const gameState = new GameState();


// client added event listener
eventEmitter.on('player_joined',function(clientID,clientPlayer){
    gameState.assignClientPlayer(clientID,clientPlayer);
});

eventEmitter.on('client0_make_move',function(){
    console.log('\nClient 0 move');
    var turnOver = gameState.movePlayerLocation('client0','Lounge');
    console.log(turnOver);

    if(turnOver){
        eventEmitter.emit(gameState.getCurrentPlayer()+'_make_move');
    }
    else{
        gameState.makeGuess('client0','suggestion','Colonel Mustard','Lounge','Knife')
    }
});

eventEmitter.on('client1_make_move',function(){
    console.log('\nClient 1 move');
    var turnOver = gameState.movePlayerLocation('client1','Lounge');

    if(turnOver){
        eventEmitter.emit(gameState.getCurrentPlayer()+'_make_move');
    }
});

// start game event
eventEmitter.on('start_game',function(){
    gameState.startGame();
    console.log(gameState.getCurrentPlayer());
    // tell current player to go
    eventEmitter.emit(gameState.getCurrentPlayer()+'_make_move');
});

eventEmitter.emit('player_joined','client0','Colonel Mustard');
eventEmitter.emit('player_joined','client1','Miss Scarlet');
eventEmitter.emit('player_joined','client2','Rev. Green');
eventEmitter.emit('start_game')

console.log("Program Ended.");