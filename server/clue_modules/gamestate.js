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

var gameWon = false;

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
var hallway1 = new hallway.Hallway(1);
var hallway2 = new hallway.Hallway(2);
var hallway3 = new hallway.Hallway(3);
var hallway4 = new hallway.Hallway(4);
var hallway5 = new hallway.Hallway(5);
var hallway6 = new hallway.Hallway(6);
var hallway7 = new hallway.Hallway(7);
var hallway8 = new hallway.Hallway(8);
var hallway9 = new hallway.Hallway(9);
var hallway10 = new hallway.Hallway(10);
var hallway11 = new hallway.Hallway(11);
var hallway12 = new hallway.Hallway(12);

// Instantiate Rooms
// link adjacent hallways
// set secret passage way where applicable
var studyRoom = new room.Room('Study');
studyRoom.addAdjacentHallways([hallway2, hallway5]);
studyRoom.setSecretPassageWay(kitchenRoom);

var hallRoom = new room.Room('Hall');
hallRoom.addAdjacentHallways([hallway5, hallway7, hallway10]);

var loungeRoom = new room.Room('Lounge');
loungeRoom.addAdjacentHallways([hallway10, hallway12]);
loungeRoom.setSecretPassageWay(conservatoryRoom);

var libraryRoom = new room.Room('Library');
libraryRoom.addAdjacentHallways([hallway1, hallway2, hallway4]);

var billiardsRoom = new room.Room('Billiards');
billiardsRoom.addAdjacentHallways([hallway4, hallway6, hallway7, hallway9]);

var diningRoom = new room.Room('Dining');
diningRoom.addAdjacentHallways([hallway9, hallway11, hallway12]);

var conservatoryRoom = new room.Room('Conservatory');
conservatoryRoom.addAdjacentHallways([hallway1, hallway3]);
conservatoryRoom.setSecretPassageWay(loungeRoom);

var ballroomRoom = new room.Room('Ballroom');
ballroomRoom.addAdjacentHallways([hallway3, hallway6, hallway8]);

var kitchenRoom = new room.Room('Kitchen');
kitchenRoom.addAdjacentHallways([hallway8, hallway11]);
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

var currentPlayer = colMustardPlayer; // define current client character
var nextPlayer = getNextPlayer(currentPlayer);
var murderPlayer = randomCard(playerCardSet); // choose random card to select murder character
var murderWeapon = randomCard(weaponCardSet); // choose random card to select murder weapon
var murderRoom = randomCard(roomCardSet); // choose random card to select murder room
var preGameDeck = getGameDeck(murderPlayer, murderWeapon, murderRoom); // cards remaining in the game to be distributed

// shuffle deck
var gameDeck = shuffleDeck(preGameDeck); // shuffle the deck to randomize order they get sent

// Client Game Cards
var numOfClients = 6; // TODO determine how we update this
var gameCardMap = createClientGameCards(numOfClients);

// distibute cards to each of the client's gamecard set
distributeDeck(gameCardMap, gameDeck);

// TODO: mapping player to connected clients

// Locations

// player starts at location specified from document
var playerLocation = new Map();
playerLocation.set(mrsPeacockPlayer, new coordinate.Coordinate(0, 1));
playerLocation.set(profPlumPlayer, new coordinate.Coordinate(0, 3));
playerLocation.set(missScarletPlayer, new coordinate.Coordinate(3, 4));
playerLocation.set(colMustardPlayer, new coordinate.Coordinate(4, 3));
playerLocation.set(mrsWhitePlayer, new coordinate.Coordinate(3, 0));
playerLocation.set(mrGreenPlayer, new coordinate.Coordinate(1, 0));

// room location as per coordinate map
var roomLocation = new Map();
roomLocation.set(conservatoryRoom, new coordinate.Coordinate(0, 0));
roomLocation.set(libraryRoom, new coordinate.Coordinate(0, 2));
roomLocation.set(studyRoom, new coordinate.Coordinate(0, 4));
roomLocation.set(ballroomRoom, new coordinate.Coordinate(2, 0));
roomLocation.set(billiardsRoom, new coordinate.Coordinate(2, 2));
roomLocation.set(hallRoom, new coordinate.Coordinate(2, 4));
roomLocation.set(kitchenRoom, new coordinate.Coordinate(4, 0));
roomLocation.set(diningRoom, new coordinate.Coordinate(4, 2));
roomLocation.set(loungeRoom, new coordinate.Coordinate(4, 4));

// hallway location as per coordinate map
var hallwayLocation = new Map();
hallwayLocation.set(hallway1, new coordinate.Coordinate(0, 1));
hallwayLocation.set(hallway2, new coordinate.Coordinate(0, 3));
hallwayLocation.set(hallway3, new coordinate.Coordinate(1, 0));
hallwayLocation.set(hallway4, new coordinate.Coordinate(1, 2));
hallwayLocation.set(hallway5, new coordinate.Coordinate(1, 4));
hallwayLocation.set(hallway6, new coordinate.Coordinate(2, 1));
hallwayLocation.set(hallway7, new coordinate.Coordinate(2, 3));
hallwayLocation.set(hallway8, new coordinate.Coordinate(3, 0));
hallwayLocation.set(hallway9, new coordinate.Coordinate(3, 2));
hallwayLocation.set(hallway10, new coordinate.Coordinate(3, 4));
hallwayLocation.set(hallway11, new coordinate.Coordinate(4, 1));
hallwayLocation.set(hallway12, new coordinate.Coordinate(4, 3));

// choose random card
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

// Create game cards for each client depending on how many clients are connected
function createClientGameCards(clientNum) {
  cardMap = new Map();
  for (var i = 0; i < clientNum; i++) {
    cardMap.set('client' + i.toString(), new gamecard.GameCard());
  }

  return cardMap;
}

// distribute shuffled deck to each client
function distributeDeck(cardMap, deck) {
  var clientIndex = 0;

  deck.forEach(function (card) {
    if (clientIndex >= cardMap.size) {
      clientIndex = 0;
    }
    cardMap.get('client' + clientIndex.toString()).addGameCard(card);
    clientIndex++;
  });
}

// determine who's turn to go next
function getNextPlayer(currentPlayer) {
  switch (currentPlayer) {
    case mrsPeacockPlayer:
      return profPlumPlayer;
      break;
    case profPlumPlayer:
      return missScarletPlayer;
      break;
    case missScarletPlayer:
      return colMustardPlayer;
      break;
    case colMustardPlayer:
      return mrsWhitePlayer;
      break;
    case mrsWhitePlayer:
      return mrGreenPlayer;
      break;
    case mrGreenPlayer:
      return mrsPeacockPlayer;
      break;
    default:
      return colMustardPlayer;
      break;
  }
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
function makeAccusation(playerCard, weaponCard, roomCard) {
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

// TODO: function that broadcasts suggestion and has players show cards to disprove
function makeSuggestion(playerCard, weaponCard, roomCard) {}

// update player location
function moveFromRoom(playerMoving, locationMovingTo) {
  if (validateRoomMove(playerMoving, locationMovingTo)) {
    if (locationMovingTo instanceof hallway.Hallway) {
      playerLocation.set(playerMoving, hallwayLocation.get(locationMovingTo));
    } else {
      playerLocation.set(playerMoving, roomLocation.get(locationMovingTo));
    }
    console.log(playerMoving.getName() + ' has moved to ' + locationMovingTo.getName());
  } else {
    console.log(
      'ERROR: Invalid move: ' +
        playerMoving.getName() +
        ' cannot move to ' +
        locationMovingTo.getName(),
    );
  }
}

// update player location
function moveFromHallway(playerMoving, locationMovingTo) {
  if (validateHallwayMove(playerMoving, locationMovingTo)) {
    playerLocation.set(playerMoving, roomLocation.get(locationMovingTo));
    console.log(playerMoving.getName() + ' has moved to ' + locationMovingTo.getName());
  } else {
    console.log(
      'ERROR: Invalid move: ' +
        playerMoving.getName() +
        ' cannot move to ' +
        locationMovingTo.getName(),
    );
  }
}

//validate move from hallway
function validateRoomMove(playerMoving, locationMovingTo) {
  var validMove = true;
  var currentRoom;

  // for player to move to hallway, must have been in another room, find that room
  roomCardSet.forEach(function (room) {
    if (roomLocation.get(room).compareCoordinate(playerLocation.get(playerMoving))) {
      currentRoom = room;
    }
  });

  if (!roomCardSet.has(currentRoom)) {
    console.log('ERROR: Move only valid if you are in a room');
    validMove = false;
  }

  // check if moving to hallway or moving to room
  if (locationMovingTo instanceof hallway.Hallway) {
    if (currentRoom instanceof room.Room) {
      // determine the linked hallways and make sure it is a valid one to move to
      if (currentRoom.getAdjacentHallways().has(locationMovingTo)) {
        inGamePlayerSet.forEach(function (player) {
          if (playerLocation.get(player).compareCoordinate(hallwayLocation.get(locationMovingTo))) {
            console.log('ERROR: Someone is in this hallways, move to empty hallway');
            validMove = false;
          }
        });
      } else {
        console.log('ERROR: Must move into hallways adjascent to current room.');
        validMove = false;
      }
    } else {
      console.log('ERROR: Must be in a room to move to hallway');
      validMove = false;
    }
  } else if (locationMovingTo instanceof room.Room) {
    // check if move is to secret passage
    if (currentRoom instanceof room.Room) {
      if (currentRoom.hasSecretPassageWay()) {
        if (currentRoom.getSecretPassageWay() != locationMovingTo) {
          console.log('ERROR: Only secret passage room allowed');
          validMove = false;
        }
      } else {
        console.log('ERROR: Can only move to room when is it secret passage way');
        validMove = false;
      }
    }
  }
  return validMove;
}

function validateHallwayMove(playerMoving, locationMovingTo) {
  var validMove = true;
  var currentHallway;

  hallwayCardSet.forEach(function (hallway) {
    if (hallwayLocation.get(hallway).compareCoordinate(playerLocation.get(playerMoving))) {
      currentHallway = hallway;
    }
  });
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
  gameCardMap.get(clientID).setClientPlayer(player);
}

// TODO function for server to display each players disprove card for suggestion
function displayDisproveCard() {}

// TODO: flush out pseudo code for this
function gamePlay() {
  // game runs until a player wins (makes correct accusation)
  accusation = false;
  while (accusation === false) {
    // iterate through clients for their turn
    gameCardMap.forEach(function (client) {
      // first player makes a move into a room
      // when player makes suggestion, coordinates update

      console.log();
    });
  }
}

/**
 * for demo purposes only:

// // update weapon location if move from suggestion is made (target)
// function updateWeaponLocation(weaponCard,axisX,axisY) {}
debugger;
// show murder objects
console.log('Clue-Less Game Start\n');
console.log("Number of Players:"+numOfClients.toString());
console.log("Murder Character: "+murderPlayer.getName());
console.log("Murder Room: "+murderRoom.getName());
console.log("Murder Weapon: "+murderWeapon.getName());

console.log("Game Deck");
preGameDeck.forEach(function(item)
{
  console.log("Game Card: "+item.getName());
});
console.log("\nShuffled Deck");
gameDeck.forEach(function(item)
{
  console.log("Game Card: "+item.getName());
});
console.log("\n");
console.log("Distribute Deck");

var clientNum = 0;
gameCardMap.forEach(function(client){
  console.log('Client '+clientNum.toString()+" Game Cards:");
  client.getGameCardList().forEach(function(card){
    console.log("    - "+card.getName());
  });
  clientNum++;
});

console.log("\n");
// testing game logic as message from the server are expected to be received
// Showing game play:

moveFromHallway(mrsPeacockPlayer, conservatoryRoom);
// mrs Peacock will make an accusation
console.log(mrsPeacockPlayer.getName()+" has made an suggestion.\n");

// mr.green's move from hallway 3 to ballroom
moveFromHallway(mrGreenPlayer, ballroomRoom);
// mr green makes an accusation
console.log(mrGreenPlayer.getName()+" has made an suggestion.\n");

//miss scarlet's move from hallway 10 to hall
moveFromHallway(missScarletPlayer, hallRoom);
// miss scarlet makes an accusation
console.log(missScarletPlayer.getName()+" has made an suggestion.\n");

//mrs peacock move from conservatory room to lounge via secret passageway
moveFromRoom(mrsPeacockPlayer,loungeRoom);
// mrs peacock makes an accusation
console.log(mrsPeacockPlayer.getName()+" has made an suggestion.\n");

//demo error handling
moveFromRoom(mrsPeacockPlayer,kitchenRoom);
// invalid move go again
console.log("\n");

moveFromRoom(mrsPeacockPlayer,hallway12);
//invalid move 
console.log("\n");
 */

// testing client player assignment and game map
// assignClientPlayer('client0', 'Colonel Mustard');
// console.log(gameCardMap);
