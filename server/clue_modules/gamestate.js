/**
 * Game State Module
 */

// Import list
var player = require('./player');
var room = require('./room');
var weapon = require('./weapon');
var hallway = require('./hallway');
var coordinate = require('./coordinates');
var gamecard = require('./gamecard');
var guess = require('./guess');
var reader = require('readline-sync');

var gameWon = false;

//Instantiate singletone of guess
var guessSingleton = new guess.Guess();

// Instantiate Players
var colMustardPlayer = new player.Player('Colonel Mustard');
var missScarletPlayer = new player.Player('Miss Scarlet');
var profPlumPlayer = new player.Player('Prof. Plum');
var mrsPeacockPlayer = new player.Player('Mrs. Peacock');
var mrGreenPlayer = new player.Player('Mr. Green');
var mrsWhitePlayer = new player.Player('Mrs. White');

// Instantiate Weapons
var knifeWeapon = new weapon.Weapon('Knife');
var ropeWeapon = new weapon.Weapon('Rope');
var leadPipeWeapon = new weapon.Weapon('Lead Pipe');
var wrenchWeapon = new weapon.Weapon('Wrench');
var candleStickWeapon = new weapon.Weapon('Candle Stick');
var revolverWeapon = new weapon.Weapon('Revolver');

// Instantiate Hallways
var hallway1 = new hallway.Hallway(1, new coordinate.Coordinate(0, 1));
var hallway2 = new hallway.Hallway(2, new coordinate.Coordinate(0, 3));
var hallway3 = new hallway.Hallway(3, new coordinate.Coordinate(1, 0));
var hallway4 = new hallway.Hallway(4, new coordinate.Coordinate(1, 2));
var hallway5 = new hallway.Hallway(5, new coordinate.Coordinate(1, 4));
var hallway6 = new hallway.Hallway(6, new coordinate.Coordinate(2, 1));
var hallway7 = new hallway.Hallway(7, new coordinate.Coordinate(2, 3));
var hallway8 = new hallway.Hallway(8, new coordinate.Coordinate(3, 0));
var hallway9 = new hallway.Hallway(9, new coordinate.Coordinate(3, 2));
var hallway10 = new hallway.Hallway(10, new coordinate.Coordinate(3, 4));
var hallway11 = new hallway.Hallway(11, new coordinate.Coordinate(4, 1));
var hallway12 = new hallway.Hallway(12, new coordinate.Coordinate(4, 3));

// Instantiate Rooms
// link adjacent hallways
// set secret passage way where applicable
var studyRoom = new room.Room('Study', new coordinate.Coordinate(0, 4));
var hallRoom = new room.Room('Hall', new coordinate.Coordinate(2, 4));
var loungeRoom = new room.Room('Lounge', new coordinate.Coordinate(4, 4));
var libraryRoom = new room.Room('Library', new coordinate.Coordinate(0, 2));
var billiardsRoom = new room.Room('Billiards', new coordinate.Coordinate(2, 2));
var diningRoom = new room.Room('Dining', new coordinate.Coordinate(4, 2));
var conservatoryRoom = new room.Room('Conservatory', new coordinate.Coordinate(0, 0));
var ballroomRoom = new room.Room('Ballroom', new coordinate.Coordinate(2, 0));
var kitchenRoom = new room.Room('Kitchen', new coordinate.Coordinate(4, 0));

// setup room hallways
studyRoom.addAdjacentHallways([hallway2, hallway5]);
hallRoom.addAdjacentHallways([hallway5, hallway7, hallway10]);
loungeRoom.addAdjacentHallways([hallway10, hallway12]);
libraryRoom.addAdjacentHallways([hallway1, hallway2, hallway4]);
billiardsRoom.addAdjacentHallways([hallway4, hallway6, hallway7, hallway9]);
diningRoom.addAdjacentHallways([hallway9, hallway11, hallway12]);
conservatoryRoom.addAdjacentHallways([hallway1, hallway3]);
ballroomRoom.addAdjacentHallways([hallway3, hallway6, hallway8]);
kitchenRoom.addAdjacentHallways([hallway8, hallway11]);

//setup secret passageways
studyRoom.setSecretPassageWay(kitchenRoom);
loungeRoom.setSecretPassageWay(conservatoryRoom);
conservatoryRoom.setSecretPassageWay(loungeRoom);
kitchenRoom.setSecretPassageWay(studyRoom);

// State Tracking
var playerCardSet = new Set([
  colMustardPlayer,
  missScarletPlayer,
  profPlumPlayer,
  mrsPeacockPlayer,
  mrGreenPlayer,
  mrsWhitePlayer,
]);
var weaponCardSet = new Set([
  knifeWeapon,
  ropeWeapon,
  leadPipeWeapon,
  wrenchWeapon,
  candleStickWeapon,
  revolverWeapon,
]);
var roomCardSet = new Set([
  conservatoryRoom,
  libraryRoom,
  studyRoom,
  ballroomRoom,
  billiardsRoom,
  hallRoom,
  kitchenRoom,
  diningRoom,
  loungeRoom,
]);

var hallwayCardSet = new Set([
  hallway1,
  hallway2,
  hallway3,
  hallway4,
  hallway5,
  hallway6,
  hallway7,
  hallway8,
  hallway9,
  hallway10,
  hallway11,
  hallway12,
]);

// list to track current amount of connected players
var inGamePlayerSet = new Set();

var currentPlayer = undefined; // define current client character

var murderPlayer = randomCard(playerCardSet); // choose random card to select murder character
var murderWeapon = randomCard(weaponCardSet); // choose random card to select murder weapon
var murderRoom = randomCard(roomCardSet); // choose random card to select murder room
var preGameDeck = getGameDeck(murderPlayer, murderWeapon, murderRoom); // cards remaining in the game to be distributed

// shuffle deck
var gameDeck = shuffleDeck(preGameDeck); // shuffle the deck to randomize order they get sent

// Initialize map for client game cards
var gameCardMap = new Map();
var clientArray = [];

// Initiate player start Locations
mrsPeacockPlayer.setLocation(hallway1);
profPlumPlayer.setLocation(hallway2);
missScarletPlayer.setLocation(hallway10);
colMustardPlayer.setLocation(hallway12);
mrsWhitePlayer.setLocation(hallway8);
mrGreenPlayer.setLocation(hallway3);

function randomCard(cardSet) {
  var cardArray = Array.from(cardSet);
  return cardArray[Math.floor(Math.random() * cardArray.length)];
}

// function to have set of remaining cards after murder cards are chosone
function getGameDeck(murderPlayer, murderWeapon, murderRoom) {
  // ignore murder cards from each set combine deck into one set to be distributed to game players
  var gameDeck = new Set();

  playerCardSet.forEach(function (item) {
    if (item != murderPlayer) {
      gameDeck.add(item);
    }
  });

  weaponCardSet.forEach(function (item) {
    if (item != murderWeapon) {
      gameDeck.add(item);
    }
  });

  roomCardSet.forEach(function (item) {
    if (item != murderRoom) {
      gameDeck.add(item);
    }
  });

  return gameDeck;
}

// shuffle the deck to randomize distribution (using Fisher-Yates Algorithm)
function shuffleDeck(cardDeck) {
  var deck = Array.from(cardDeck);
  for (var i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * i);
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return new Set(deck);
}

// // Create game cards for each client depending on how many clients are connected
// function createClientGameCards(clientNum) {
//   cardMap = new Map();
//   for (var i = 0; i < clientNum; i++) {
//     cardMap.set('client' + i.toString(), new gamecard.GameCard());
//   }

//   return cardMap;
// }

function addClient(clientID, cardMap) {
  cardMap.set(clientID, new gamecard.GameCard());
  cardMap.get(clientID).setClientID(clientID);
  clientArray.push(clientID);
}

// distribute shuffled deck to each client
function distributeDeck(cardMap, deck) {
  var clientIndex = 0;

  deck.forEach(function (card) {
    if (clientIndex >= cardMap.size) {
      clientIndex = 0;
    }
    cardMap.get(clientArray[clientIndex]).addGameCard(card);
    clientIndex++;
  });
}

// function for return of object with string
function getPlayerObject(characterName) {
  switch (characterName) {
    case profPlumPlayer.getName():
      return profPlumPlayer;
      break;
    case missScarletPlayer.getName():
      return missScarletPlayer;
      break;
    case colMustardPlayer.getName():
      return colMustardPlayer;
      break;
    case mrsWhitePlayer.getName():
      return mrsWhitePlayer;
      break;
    case mrGreenPlayer.getName():
      return mrGreenPlayer;
      break;
    case mrsPeacockPlayer.getName():
      return mrsPeacockPlayer;
      break;
    default:
      return '';
      break;
  }
}

// validate accusation made by current player
function makeAccusation(playerCard, roomCard, weaponCard) {
  // must compare murder cards to players accusation card choice
  var accusation = false;
  if (playerCard === murderPlayer && weaponCard === murderWeapon && roomCard === murderRoom) {
    console.log('Accusation was correct!');
    accusation = true;
  } else {
    console.log('Accusation was incorrect!');
    accusation = false;
  }
  return accusation;
}

function makeSuggestion(playerCard, roomCard, weaponCard) {
  console.log(
    'It was ' +
      playerCard.getName() +
      ' in the ' +
      roomCard.getName() +
      ' with a ' +
      weaponCard.getName(),
  );

  playerCard.setLocation(roomCard);
  console.log(playerCard.getName() + ' has moved to ' + roomCard.getName());
}

// TODO: function that broadcasts suggestion and has players show cards to disprove
function makeGuess(clientID) {
  var guessType = reader.question(
    gameCardMap.get(clientID).getClientPlayer() + ': Make a suggestion (S) or accusation (A)? ',
  );
  switch (guessType) {
    case 'A':
      guessSingleton.setGuessType('Accusation');
      guessType = 'accusing';
      break;
    case 'S':
      guessSingleton.setGuessType('Suggestion');
      guessType = 'suggesting';
      break;
  }
  var guessMurderPlayer = reader.question(
    gameCardMap.get(clientID).getClientPlayer().getName() +
      `: Who are you ${guessType} is the murderer? `,
  );
  var guessMurderRoom = reader.question(
    gameCardMap.get(clientID).getClientPlayer().getName() +
      `: Where do are you ${guessType} the murder happened? `,
  );
  var guessMurderWeapon = reader.question(
    gameCardMap.get(clientID).getClientPlayer().getName() +
      `: What are you ${guessType} the weapon was? `,
  );

  playerCardSet.forEach(function (player) {
    if (player.getName() === guessMurderPlayer) {
      guessSingleton.setMurderPlayer(player);
    }
  });
  roomCardSet.forEach(function (room) {
    if (room.getName() === guessMurderRoom) {
      guessSingleton.setMurderRoom(room);
    }
  });
  weaponCardSet.forEach(function (weapon) {
    if (weapon.getName() === guessMurderWeapon) {
      guessSingleton.setMurderWeapon(weapon);
    }
  });

  return guessSingleton;
}

// update player location
function moveFromRoom(playerMoving, locationMovingTo) {
  if (validateRoomMove(playerMoving, locationMovingTo)) {
    playerMoving.setLocation(locationMovingTo);
    console.log(playerMoving.getName() + ' has moved to ' + locationMovingTo.getName());
  } else {
    console.log(
      'ERROR: Invalid move: ' +
        playerMoving.getName() +
        ' cannot move to ' +
        locationMovingTo.getName(),
    );
    // if given invalid move, recursive ask
    movePlayerLocation(playerMoving);
  }
}

// update player location
function moveFromHallway(playerMoving, locationMovingTo) {
  if (validateHallwayMove(playerMoving, locationMovingTo)) {
    playerMoving.setLocation(locationMovingTo);
    console.log(playerMoving.getName() + ' has moved to ' + locationMovingTo.getName());
  } else {
    console.log(
      'ERROR: Invalid move: ' +
        playerMoving.getName() +
        ' cannot move to ' +
        locationMovingTo.getName(),
    );
    // if given invalid move, recursive ask
    movePlayerLocation(playerMoving);
  }
}

function decodeMove(playerMoving, moveLocation) {
  var locationMovingTo = undefined;
  if (moveLocation.includes('Hallway')) {
    hallwayCardSet.forEach(function (hallway) {
      if (hallway.getName() === moveLocation) {
        locationMovingTo = hallway;
      }
    });
  } else {
    roomCardSet.forEach(function (room) {
      if (room.getName() === moveLocation) {
        locationMovingTo = room;
      }
    });
  }

  console.log(locationMovingTo);

  return locationMovingTo;
}

function movePlayerLocation(playerMoving) {
  // function to test with terminal input
  var moveAnswer = reader.question(playerMoving.getName() + ' Where do you want to move? ');

  var locationMovingTo = decodeMove(playerMoving, moveAnswer);
  console.log(typeof locationMovingTo);

  if (playerMoving.getLocation() instanceof room.Room) {
    moveFromRoom(playerMoving, locationMovingTo);
  } else if (playerMoving.getLocation() instanceof hallway.Hallway) {
    moveFromHallway(playerMoving, locationMovingTo);
  } else {
    console.log('ERROR');
  }
}

//validate move from hallway
function validateRoomMove(playerMoving, locationMovingTo) {
  var validMove = true;
  var currentRoom;

  // for player to move to hallway, must have been in another room, find that room
  currentRoom = playerMoving.getLocation();

  if (!roomCardSet.has(currentRoom)) {
    console.log('ERROR: Move only valid if you are in a room');
    validMove = false;
    return validMove;
  }

  // check if moving to hallway or moving to room
  if (locationMovingTo instanceof hallway.Hallway) {
    if (currentRoom instanceof room.Room) {
      // determine the linked hallways and make sure it is a valid one to move to
      if (currentRoom.getAdjacentHallways().has(locationMovingTo)) {
        inGamePlayerSet.forEach(function (player) {
          if (player.getLocation() === locationMovingTo) {
            console.log('ERROR: Someone is in this hallways, move to empty hallway');
            validMove = false;
            return validMove;
          }
        });
      } else {
        console.log('ERROR: Must move into hallways adjascent to current room.');
        validMove = false;
        return validMove;
      }
    } else {
      console.log('ERROR: Must be in a room to move to hallway');
      validMove = false;
      return validMove;
    }
  } else if (locationMovingTo instanceof room.Room) {
    // check if move is to secret passage
    if (currentRoom instanceof room.Room) {
      if (currentRoom === locationMovingTo) {
        validMove = true;
        return validMove;
      }
      if (currentRoom.hasSecretPassageWay()) {
        if (currentRoom.getSecretPassageWay() != locationMovingTo) {
          console.log('ERROR: Only secret passage room allowed');
          validMove = false;
          return validMove;
        }
      } else {
        console.log('ERROR: Can only move to room when is it secret passage way');
        validMove = false;
        return validMove;
      }
    }
  }
  return validMove;
}

function validateHallwayMove(playerMoving, locationMovingTo) {
  var validMove = true;
  var currentHallway;

  currentHallway = playerMoving.getLocation();
  if (!hallwayCardSet.has(currentHallway)) {
    console.log('ERROR: Move only valid if you are in a room');
    validMove = false;
  }

  if (locationMovingTo instanceof room.Room) {
    if (!locationMovingTo.getAdjacentHallways().has(currentHallway)) {
      console.log('ERROR: Can only move to a room that is adjascent to hallway');
      validMove = false;
    }
  } else {
    console.log('ERROR: Can only move into room from hallway');
    validMove = false;
  }

  return validMove;
}

// get random item from a Set
function getRandomItem(set) {
  let items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
}

// function to assign players to connected clients
function assignClientPlayer(clientID, player = '') {
  // return player object from message string
  player = getPlayerObject(player);
  // randomly select player if one was not chose by client
  if (player === '') {
    player = getRandomItem(playerCardSet);
  }

  // if this player is already taken:
  while (inGamePlayerSet.has(player)) {
    player = getRandomItem(playerCardSet);
  }

  // add player to in game set
  inGamePlayerSet.add(player);

  // map player to client
  if (gameCardMap.has(clientID)) {
    gameCardMap.get(clientID).setClientPlayer(player);
  } else {
    addClient(clientID, gameCardMap);
    gameCardMap.get(clientID).setClientPlayer(player);
  }
}

function getNextDisprovePlayer(disproveCounter) {
  // var disproveCounter = playerCounter+1;
  if (disproveCounter >= clientArray.length) {
    return clientArray[0];
  } else {
    return clientArray[disproveCounter];
  }
}
// TODO function for server to display each players disprove card for suggestion
function disproveSuggestion(clientID) {
  console.log(clientID + ' must show a card to disprove player: type the card you choose:');
  gameCardMap
    .get(clientID)
    .getGameCardList()
    .forEach(function (gameCard) {
      console.log('    -' + gameCard.getName());
    });

  var disproveAnswer = reader.question(
    'Type card that you select or type NONE if you do not have card to disprove: ',
  );
  if (disproveAnswer === 'NONE') {
    return false;
  } else {
    return true;
  }
}

// TODO: flush out pseudo code for this
function main() {
  debugger;
  // game runs until a player wins (makes correct accusation)
  var gameOver = false;
  var playerCounter = 0;
  var nextPlayer = false;
  var currentPlayerGuess = undefined;
  var accusation = false;
  var disproved = false;
  var currentDisprovePlayer = undefined;
  var disproveCounter = 1;

  // distibute cards to each of the client's gamecard set
  distributeDeck(gameCardMap, gameDeck);

  while (!gameOver) {
    nextPlayer = false;
    if (playerCounter >= gameCardMap.size) {
      playerCounter = 0;
    }
    currentPlayer = clientArray[playerCounter];

    while (!nextPlayer && !gameOver) {
      if (!inGamePlayerSet.has(gameCardMap.get(currentPlayer).getClientPlayer())) {
        playerCounter++;
        nextPlayer = true;
      }
      // current player makes their move
      movePlayerLocation(gameCardMap.get(currentPlayer).getClientPlayer());

      // if move was to a hallway, time for next players turn
      if (
        gameCardMap.get(currentPlayer).getClientPlayer().getLocation() instanceof hallway.Hallway
      ) {
        playerCounter++;
        nextPlayer = true;
      }

      // if move was to a room, need to make a suggestion
      currentPlayerGuess = makeGuess(currentPlayer);

      if (currentPlayerGuess.getGuessType() === 'Accusation') {
        accusation = makeAccusation(
          currentPlayerGuess.getMurderPlayer(),
          currentPlayerGuess.getMurderRoom(),
          currentPlayerGuess.getMurderWeapon(),
        );
        if (accusation) {
          console.log(gameCardMap.get(currentPlayer).getClientPlayer().getName() + ' Wins!');
          gameOver = true;
        } else {
          console.log(
            gameCardMap.get(currentPlayer).getClientPlayer().getName() +
              ' lost and is out the game!',
          );
          inGamePlayerSet.delete(gameCardMap.get(currentPlayer).getClientPlayer());
          playerCounter++;
          nextPlayer = true;
        }
      }

      if (currentPlayerGuess.getGuessType() == 'Suggestion') {
        makeSuggestion(
          currentPlayerGuess.getMurderPlayer(),
          currentPlayerGuess.getMurderRoom(),
          currentPlayerGuess.getMurderWeapon(),
        );
        disproved = false;
        disproveCounter = playerCounter + 1;
        currentDisprovePlayer = getNextDisprovePlayer(disproveCounter);

        while (!disproved) {
          disproved = disproveSuggestion(currentDisprovePlayer);
          disproveCounter++;

          currentDisprovePlayer = getNextDisprovePlayer(disproveCounter);

          //break out of while loop if all players have disproved and still no result
          if (currentDisprovePlayer === currentPlayer) {
            disproved = false;
            console.log('No one was able to disprove');
            break;
          } else if (currentDisprovePlayer === clientArray[0]) {
            disproveCounter = 1;
          }
        }

        playerCounter++;
        nextPlayer = true;
      }
    }
  }

  console.log('End of Game');
}

// simulation
assignClientPlayer('client0', 'Mrs. White');
assignClientPlayer('client1', 'Miss Scarlet');
assignClientPlayer('client2', 'Prof. Plum');
// assignClientPlayer('client3', 'Mrs. Peacock');
// assignClientPlayer('client4', 'Mr. Green');
// assignClientPlayer('client5', 'Mrs. White');

main();

// // // update weapon location if move from suggestion is made (target)
// // function updateWeaponLocation(weaponCard,axisX,axisY) {}
// debugger;
// // show murder objects
// console.log('Clue-Less Game Start\n');
// console.log("Number of Players:"+numOfClients.toString());
// console.log("Murder Character: "+murderPlayer.getName());
// console.log("Murder Room: "+murderRoom.getName());
// console.log("Murder Weapon: "+murderWeapon.getName());

// assignClientPlayer('client0', 'Colonel Mustard');
// assignClientPlayer('client1', 'Colonel Mustard');
// assignClientPlayer('client2', 'Colonel Mustard');
// assignClientPlayer('client3', 'Colonel Mustard');
// assignClientPlayer('client4', 'Colonel Mustard');
// assignClientPlayer('client5', 'Colonel Mustard');
// assignClientPlayer('client6', 'Colonel Mustard');

// console.log("Game Deck");
// preGameDeck.forEach(function(item)
// {
//   console.log("Game Card: "+item.getName());
// });
// console.log("\nShuffled Deck");
// gameDeck.forEach(function(item)
// {
//   console.log("Game Card: "+item.getName());
// });
// console.log("\n");
// console.log("Distribute Deck");

// var clientNum = 0;
// gameCardMap.forEach(function(client){
//   console.log('Client '+clientNum.toString()+" Game Cards:");
//   client.getGameCardList().forEach(function(card){
//     console.log("    - "+card.getName());
//   });
//   clientNum++;
// });

// console.log("\n");
// // testing game logic as message from the server are expected to be received
// // Showing game play:

// movePlayerLocation(mrsPeacockPlayer, conservatoryRoom);
// // mrs Peacock will make an accusation
// console.log(mrsPeacockPlayer.getName()+" has made an suggestion.\n");

// // mr.green's move from hallway 3 to ballroom
// movePlayerLocation(mrGreenPlayer, ballroomRoom);
// // mr green makes an accusation
// console.log(mrGreenPlayer.getName()+" has made an suggestion.\n");

// //miss scarlet's move from hallway 10 to hall
// movePlayerLocation(missScarletPlayer, hallRoom);
// // miss scarlet makes an accusation
// console.log(missScarletPlayer.getName()+" has made an suggestion.\n");

// //mrs peacock move from conservatory room to lounge via secret passageway
// movePlayerLocation(mrsPeacockPlayer,loungeRoom);
// // mrs peacock makes an accusation
// console.log(mrsPeacockPlayer.getName()+" has made an suggestion.\n");

// //demo error handling
// movePlayerLocation(mrsPeacockPlayer,kitchenRoom);
// // invalid move go again
// console.log("\n");

// movePlayerLocation(mrsPeacockPlayer,hallway12);
// //invalid move
// console.log("\n");

// testing client player assignment and game map
// assignClientPlayer('client0', 'Colonel Mustard');
// console.log(gameCardMap);

// gamePlay();
