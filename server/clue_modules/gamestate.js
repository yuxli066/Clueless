/**
 * Game State Module
 */

// Import list
var player = require("./player");
var room = require("./room");
var weapon = require("./weapon");
var hallway = require("./hallway");
var coordinate = require("./coordinates");

// Instantiate Players
var colMustardPlayer = new player.Player("Colonel Mustard");
var missScarletPlayer = new player.Player("Miss Scarlet");
var profPlumPlayer = new player.Player("Prof. Plum");
var mrsPeacockPlayer = new player.Player("Mrs Peacock");
var mrGreenPlayer = new player.Player("Mr. Green");
var mrsWhitePlayer = new player.Player("Mrs. White");

// Instantiate Weapons
var knifeWeapon = new weapon.Weapon("Knife");
var ropeWeapon = new weapon.Weapon("Rope");
var leadPipeWeapon = new weapon.Weapon("Lead Pipe");
var wrenchWeapon = new weapon.Weapon("Wrench");
var candleStickWeapon = new weapon.Weapon("Candle Stick");
var revolverWeapon = new weapon.Weapon("Revolver");

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
var studyRoom = new room.Room("Study");
studyRoom.addAdjacentHallways([hallway2, hallway5]);
studyRoom.setSecretPassageWay(kitchenRoom);

var hallRoom = new room.Room("Hall");
hallRoom.addAdjacentHallways([hallway5, hallway7, hallway10]);

var loungeRoom = new room.Room("Lounge");
loungeRoom.addAdjacentHallways([hallway10, hallway12]);
loungeRoom.setSecretPassageWay(conservatoryRoom);

var libraryRoom = new room.Room("Library");
libraryRoom.addAdjacentHallways([hallway1, hallway2, hallway4]);

var billiardsRoom = new room.Room("Billiards");
billiardsRoom.addAdjacentHallways([hallway4, hallway6, hallway7, hallway9]);

var diningRoom = new room.Room("Dining");
diningRoom.addAdjacentHallways([hallway9, hallway11, hallway12]);

var conservatoryRoom = new room.Room("Conservatory");
conservatoryRoom.addAdjacentHallways([hallway1, hallway3]);
conservatoryRoom.setSecretPassageWay(loungeRoom);

var ballroomRoom = new room.Room("Ballroom");
ballroomRoom.addAdjacentHallways([hallway3, hallway6, hallway8]);

var kitchenRoom = new room.Room("Kitchen");
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
var validatedMove = false;
var currentPlayer = undefined; // define current client character
var nextPlayer = getNextPlayer(currentPlayer);
var murderPlayer = randomCard(playerCardSet); // choose random card to select murder character
var murderWeapon = randomCard(weaponCardSet); // choose random card to select murder weapon
var murderRoom = randomCard(roomCardSet); // choose random card to select murder room
var gameDeck = getGameDeck(murderPlayer, murderWeapon, murderRoom); // cards remaining in the game to be distributed

// shuffle deck
gameDeck = shuffleDeck(gameDeck); // shuffle the deck to randomize order they get sent

// TODO add logic that distributed remaining cards to clients

// TODO: mapping player to connected clients

// TODO: mapping game card decks to connected clients

// Locations
var playerLocation = new Map();
playerLocation.set(mrsPeacockPlayer, new coordinate.Coordinate(0, 1));
playerLocation.set(profPlumPlayer, new coordinate.Coordinate(0, 3));
playerLocation.set(missScarletPlayer, new coordinate.Coordinate(3, 4));
playerLocation.set(colMustardPlayer, new coordinate.Coordinate(4, 3));
playerLocation.set(mrsWhitePlayer, new coordinate.Coordinate(3, 0));
playerLocation.set(mrGreenPlayer, new coordinate.Coordinate(1, 0));

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
  // remove murder cards from each set
  var remainingPlayers = playerCardSet.delete(murderPlayer);
  var remainingWeapons = weaponCardSet.delete(murderWeapon);
  var remainingRooms = roomCardSet.delete(murderRoom);

  // combine deck into one set to be distributed to game players
  var gameDeck = new Set();
  for (var item in remainingPlayers) {
    gameDeck.add(item);
  }
  for (var item in remainingWeapons) {
    gameDeck.add(item);
  }
  for (var item in remainingRooms) {
    gameDeck.add(item);
  }

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
  }
}

// validate accusation made by current player
function validateAccusation(playerCard, weaponCard, roomCard) {}

// validate suggestion made by current player
function validateSuggestion(playerCard, weaponCard, roomCard) {}

//valid player move, move if it is valid
function validatePlayerMove() {}

// update player location should move be valid
function updatePlayerLocation(playerMove) {}

// update weapon location if move from suggestion is made
function updateWeaponLocation(weaponMove) {}
