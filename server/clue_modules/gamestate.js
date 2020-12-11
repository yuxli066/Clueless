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

class GameState {
  constructor() {
    // initialize game
    this.setupHallways();
    this.setupSecretPassageWays();
    this.initiatePlayerLocations();
  }

  //Instantiate singleton of guess
  //guessSingleton = new guess.Guess();
  guessSingleton = new guess.Guess();

  // Instantiate Players
  colMustardPlayer = new player.Player('Colonel Mustard');
  missScarletPlayer = new player.Player('Miss Scarlet');
  profPlumPlayer = new player.Player('Prof. Plum');
  mrsPeacockPlayer = new player.Player('Mrs. Peacock');
  mrGreenPlayer = new player.Player('Mr. Green');
  mrsWhitePlayer = new player.Player('Mrs. White');

  // Instantiate Weapons
  knifeWeapon = new weapon.Weapon('Knife');
  ropeWeapon = new weapon.Weapon('Rope');
  leadPipeWeapon = new weapon.Weapon('Lead Pipe');
  wrenchWeapon = new weapon.Weapon('Wrench');
  candleStickWeapon = new weapon.Weapon('Candle Stick');
  revolverWeapon = new weapon.Weapon('Revolver');

  // Instantiate Hallways
  hallway1 = new hallway.Hallway(1, new coordinate.Coordinate(0, 1));
  hallway2 = new hallway.Hallway(2, new coordinate.Coordinate(0, 3));
  hallway3 = new hallway.Hallway(3, new coordinate.Coordinate(1, 0));
  hallway4 = new hallway.Hallway(4, new coordinate.Coordinate(1, 2));
  hallway5 = new hallway.Hallway(5, new coordinate.Coordinate(1, 4));
  hallway6 = new hallway.Hallway(6, new coordinate.Coordinate(2, 1));
  hallway7 = new hallway.Hallway(7, new coordinate.Coordinate(2, 3));
  hallway8 = new hallway.Hallway(8, new coordinate.Coordinate(3, 0));
  hallway9 = new hallway.Hallway(9, new coordinate.Coordinate(3, 2));
  hallway10 = new hallway.Hallway(10, new coordinate.Coordinate(3, 4));
  hallway11 = new hallway.Hallway(11, new coordinate.Coordinate(4, 1));
  hallway12 = new hallway.Hallway(12, new coordinate.Coordinate(4, 3));

  // Instantiate Rooms
  // link adjacent hallways
  // set secret passage way where applicable
  studyRoom = new room.Room('Study', new coordinate.Coordinate(0, 4));
  hallRoom = new room.Room('Hall', new coordinate.Coordinate(2, 4));
  loungeRoom = new room.Room('Lounge', new coordinate.Coordinate(4, 4));
  libraryRoom = new room.Room('Library', new coordinate.Coordinate(0, 2));
  billiardsRoom = new room.Room('Billiards', new coordinate.Coordinate(2, 2));
  diningRoom = new room.Room('Dining', new coordinate.Coordinate(4, 2));
  conservatoryRoom = new room.Room('Conservatory', new coordinate.Coordinate(0, 0));
  ballroomRoom = new room.Room('Ballroom', new coordinate.Coordinate(2, 0));
  kitchenRoom = new room.Room('Kitchen', new coordinate.Coordinate(4, 0));

  setupHallways() {
    // setup room hallways
    this.studyRoom.addAdjacentHallways([this.hallway2, this.hallway5]);
    this.hallRoom.addAdjacentHallways([this.hallway5, this.hallway7, this.hallway10]);
    this.loungeRoom.addAdjacentHallways([this.hallway10, this.hallway12]);
    this.libraryRoom.addAdjacentHallways([this.hallway1, this.hallway2, this.hallway4]);
    this.billiardsRoom.addAdjacentHallways([
      this.hallway4,
      this.hallway6,
      this.hallway7,
      this.hallway9,
    ]);
    this.diningRoom.addAdjacentHallways([this.hallway9, this.hallway11, this.hallway12]);
    this.conservatoryRoom.addAdjacentHallways([this.hallway1, this.hallway3]);
    this.ballroomRoom.addAdjacentHallways([this.hallway3, this.hallway6, this.hallway8]);
    this.kitchenRoom.addAdjacentHallways([this.hallway8, this.hallway11]);
  }

  setupSecretPassageWays() {
    //setup secret passageways
    this.studyRoom.setSecretPassageWay(this.kitchenRoom);
    this.loungeRoom.setSecretPassageWay(this.conservatoryRoom);
    this.conservatoryRoom.setSecretPassageWay(this.loungeRoom);
    this.kitchenRoom.setSecretPassageWay(this.studyRoom);
  }

  // State Tracking
  playerCardSet = new Set([
    this.colMustardPlayer,
    this.missScarletPlayer,
    this.profPlumPlayer,
    this.mrsPeacockPlayer,
    this.mrGreenPlayer,
    this.mrsWhitePlayer,
  ]);
  weaponCardSet = new Set([
    this.knifeWeapon,
    this.ropeWeapon,
    this.leadPipeWeapon,
    this.wrenchWeapon,
    this.candleStickWeapon,
    this.revolverWeapon,
  ]);
  roomCardSet = new Set([
    this.conservatoryRoom,
    this.libraryRoom,
    this.studyRoom,
    this.ballroomRoom,
    this.billiardsRoom,
    this.hallRoom,
    this.kitchenRoom,
    this.diningRoom,
    this.loungeRoom,
  ]);

  hallwayCardSet = new Set([
    this.hallway1,
    this.hallway2,
    this.hallway3,
    this.hallway4,
    this.hallway5,
    this.hallway6,
    this.hallway7,
    this.hallway8,
    this.hallway9,
    this.hallway10,
    this.hallway11,
    this.hallway12,
  ]);

  // list to track current amount of connected players
  inGamePlayerSet = new Set();

  currentPlayer = undefined; // define current client character

  murderPlayer = this.randomCard(this.playerCardSet); // choose random card to select murder character
  murderWeapon = this.randomCard(this.weaponCardSet); // choose random card to select murder weapon
  murderRoom = this.randomCard(this.roomCardSet); // choose random card to select murder room
  preGameDeck = this.getGameDeck(this.murderPlayer, this.murderWeapon, this.murderRoom); // cards remaining in the game to be distributed

  // shuffle deck
  gameDeck = this.shuffleDeck(this.preGameDeck); // shuffle the deck to randomize order they get sent

  // Initialize map for client game cards
  gameCardMap = new Map();
  clientArray = [];

  initiatePlayerLocations() {
    // Initiate player start Locations
    this.mrsPeacockPlayer.setLocation(this.hallway1);
    this.profPlumPlayer.setLocation(this.hallway2);
    this.missScarletPlayer.setLocation(this.hallway10);
    this.colMustardPlayer.setLocation(this.hallway12);
    this.mrsWhitePlayer.setLocation(this.hallway8);
    this.mrGreenPlayer.setLocation(this.hallway3);
  }

  randomCard(cardSet) {
    var cardArray = Array.from(cardSet);
    return cardArray[Math.floor(Math.random() * cardArray.length)];
  }

  // function to have set of remaining cards after murder cards are chosone
  getGameDeck(murderPlayer, murderWeapon, murderRoom) {
    // ignore murder cards from each set combine deck into one set to be distributed to game players
    var gameDeck = new Set();

    this.playerCardSet.forEach(function (item) {
      if (item != murderPlayer) {
        gameDeck.add(item);
      }
    });

    this.weaponCardSet.forEach(function (item) {
      if (item != murderWeapon) {
        gameDeck.add(item);
      }
    });

    this.roomCardSet.forEach(function (item) {
      if (item != murderRoom) {
        gameDeck.add(item);
      }
    });

    return gameDeck;
  }

  // shuffle the deck to randomize distribution (using Fisher-Yates Algorithm)
  shuffleDeck(cardDeck) {
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

  addClient(clientID, cardMap) {
    cardMap.set(clientID, new gamecard.GameCard());
    cardMap.get(clientID).setClientID(clientID);
  }

  removeClient(clientID) {
    this.gameCardMap.delete(clientID);
    this.inGamePlayerSet.delete(clientID);
    this.clientArray = Array.from(this.gameCardMap.keys());
  }

  // distribute shuffled deck to each client
  distributeDeck(cardMap, deck, clientArray) {
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
  getPlayerObject(characterName) {
    switch (characterName) {
      case this.profPlumPlayer.getName():
        return this.profPlumPlayer;
        break;
      case this.missScarletPlayer.getName():
        return this.missScarletPlayer;
        break;
      case this.colMustardPlayer.getName():
        return this.colMustardPlayer;
        break;
      case this.mrsWhitePlayer.getName():
        return this.mrsWhitePlayer;
        break;
      case this.mrGreenPlayer.getName():
        return this.mrGreenPlayer;
        break;
      case this.mrsPeacockPlayer.getName():
        return this.mrsPeacockPlayer;
        break;
      default:
        return '';
        break;
    }
  }

  // validate accusation made by current player
  makeAccusation(playerCard, roomCard, weaponCard) {
    // must compare murder cards to players accusation card choice
    var accusation = false;
    if (
      playerCard === this.murderPlayer &&
      weaponCard === this.murderWeapon &&
      roomCard === this.murderRoom
    ) {
      console.log('Accusation was correct!');
      accusation = true;
    } else {
      console.log('Accusation was incorrect!');
      accusation = false;
    }
    return accusation;
  }

  makeSuggestion(playerCard, roomCard, weaponCard) {
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

  // TODO:  that broadcasts suggestion and has players show cards to disprove
  makeGuess(clientID) {
    var guessSingleton = new guess.Guess();

    var guessType = reader.question(
      this.gameCardMap.get(clientID).getClientPlayer().getName() +
        ': Make a suggestion (S) or accusation (A)? ',
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
      this.gameCardMap.get(clientID).getClientPlayer().getName() +
        `: Who are you ${guessType} is the murderer? `,
    );
    var guessMurderRoom = reader.question(
      this.gameCardMap.get(clientID).getClientPlayer().getName() +
        `: Where do are you ${guessType} the murder happened? `,
    );
    var guessMurderWeapon = reader.question(
      this.gameCardMap.get(clientID).getClientPlayer().getName() +
        `: What are you ${guessType} the weapon was? `,
    );

    this.playerCardSet.forEach(function (player) {
      if (player.getName() === guessMurderPlayer) {
        guessSingleton.setMurderPlayer(player);
      }
    });
    this.roomCardSet.forEach(function (room) {
      if (room.getName() === guessMurderRoom) {
        guessSingleton.setMurderRoom(room);
      }
    });
    this.weaponCardSet.forEach(function (weapon) {
      if (weapon.getName() === guessMurderWeapon) {
        guessSingleton.setMurderWeapon(weapon);
      }
    });

    return guessSingleton;
  }

  // update player location
  moveFromRoom(playerMoving, locationMovingTo) {
    if (this.validateRoomMove(playerMoving, locationMovingTo)) {
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
      this.movePlayerLocation(playerMoving);
    }
  }

  // update player location
  moveFromHallway(playerMoving, locationMovingTo) {
    if (this.validateHallwayMove(playerMoving, locationMovingTo)) {
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
      this.movePlayerLocation(playerMoving);
    }
  }

  decodeMove(playerMoving, moveLocation) {
    var locationMovingTo = undefined;
    if (moveLocation.includes('Hallway')) {
      this.hallwayCardSet.forEach(function (hallway) {
        if (hallway.getName() === moveLocation) {
          locationMovingTo = hallway;
        }
      });
    } else {
      this.roomCardSet.forEach(function (room) {
        if (room.getName() === moveLocation) {
          locationMovingTo = room;
        }
      });
    }

    return locationMovingTo;
  }

  movePlayerLocation(playerMoving) {
    // function to test with terminal input
    //TODO replace with answer from client, expecting string with player name
    var moveAnswer = reader.question(playerMoving.getName() + ' Where do you want to move? ');

    var locationMovingTo = this.decodeMove(playerMoving, moveAnswer);

    if (playerMoving.getLocation() instanceof room.Room) {
      this.moveFromRoom(playerMoving, locationMovingTo);
    } else if (playerMoving.getLocation() instanceof hallway.Hallway) {
      this.moveFromHallway(playerMoving, locationMovingTo);
    } else {
      console.log(playerMoving.getLocation().getName());
      console.log('ERROR');
    }
  }

  //validate move from hallway
  validateRoomMove(playerMoving, locationMovingTo) {
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
          this.inGamePlayerSet.forEach(function (player) {
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

  validateHallwayMove(playerMoving, locationMovingTo) {
    var validMove = true;
    var currentHallway;

    currentHallway = playerMoving.getLocation();
    if (!this.hallwayCardSet.has(currentHallway)) {
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
  getRandomItem(set) {
    let items = Array.from(set);
    return items[Math.floor(Math.random() * items.length)];
  }

  // function to assign players to connected clients
  assignClientPlayer(clientID, player = '') {
    // return player object from message string
    var player = this.getPlayerObject(player);
    // randomly select player if one was not chose by client
    if (player === '') {
      player = this.getRandomItem(this.playerCardSet);
    }

    // if this player is already taken:
    while (this.inGamePlayerSet.has(player)) {
      player = this.getRandomItem(playerCardSet);
    }

    // add player to in game set
    this.inGamePlayerSet.add(player);

    // map player to client
    if (this.gameCardMap.has(clientID)) {
      this.gameCardMap.get(clientID).setClientPlayer(player);
    } else {
      this.addClient(clientID, this.gameCardMap);
      this.gameCardMap.get(clientID).setClientPlayer(player);
    }
    console.log(this.gameCardMap);
  }

  getNextDisprovePlayer(disproveCounter) {
    // var disproveCounter = playerCounter+1;
    if (disproveCounter >= this.clientArray.length) {
      return this.clientArray[0];
    } else {
      return this.clientArray[disproveCounter];
    }
  }
  // TODO function for server to display each players disprove card for suggestion
  disproveSuggestion(clientID) {
    console.log(clientID + ' must show a card to disprove player: type the card you choose:');
    this.gameCardMap
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

  turnIsOver(player) {
    if (player.getLocation() instanceof hallway.Hallway) {
      return true;
    } else {
      return false;
    }
  }

  // TODO: flush out pseudo code for this
  gamePlay() {
    debugger;
    // game runs until a player wins (makes correct accusation)
    this.clientArray = Array.from(this.gameCardMap.keys());
    var gameOver = false;
    var playerCounter = 0;
    var nextPlayer = false;
    var currentPlayerGuess = undefined;
    var accusation = false;
    var disproved = false;
    var currentDisprovePlayer = undefined;
    var disproveCounter = 1;
    var currentPlayer = undefined;

    // distibute cards to each of the client's gamecard set
    this.distributeDeck(this.gameCardMap, this.gameDeck, this.clientArray);

    while (!gameOver) {
      nextPlayer = false;
      if (playerCounter >= this.gameCardMap.size) {
        playerCounter = 0;
      }
      currentPlayer = this.clientArray[playerCounter];

      while (!nextPlayer && !gameOver) {
        if (!this.gameCardMap.has(currentPlayer)) {
          playerCounter++;
          nextPlayer = true;
        }
        // current player makes their move
        this.movePlayerLocation(this.gameCardMap.get(currentPlayer).getClientPlayer());

        // if move was to a hallway, time for next players turn
        if (this.turnIsOver(this.gameCardMap.get(currentPlayer).getClientPlayer())) {
          playerCounter++;
          nextPlayer = true;
          console.log('turn is over');
        } else {
          // if move was to a room, need to make a suggestion
          currentPlayerGuess = this.makeGuess(currentPlayer);
          if (currentPlayerGuess.getGuessType() === 'Accusation') {
            accusation = this.makeAccusation(
              currentPlayerGuess.getMurderPlayer(),
              currentPlayerGuess.getMurderRoom(),
              currentPlayerGuess.getMurderWeapon(),
            );
            if (accusation) {
              console.log(
                this.gameCardMap.get(currentPlayer).getClientPlayer().getName() + ' Wins!',
              );
              gameOver = true;
            } else {
              console.log(
                this.gameCardMap.get(currentPlayer).getClientPlayer().getName() +
                  ' lost and is out the game!',
              );
              this.removeClient(currentPlayer);
              if (this.gameCardMap.size < 1) {
                gameOver = true;
              }
              playerCounter++;
              nextPlayer = true;
            }
          }

          if (currentPlayerGuess.getGuessType() == 'Suggestion') {
            this.makeSuggestion(
              currentPlayerGuess.getMurderPlayer(),
              currentPlayerGuess.getMurderRoom(),
              currentPlayerGuess.getMurderWeapon(),
            );
            disproved = false;
            disproveCounter = playerCounter + 1;
            currentDisprovePlayer = this.getNextDisprovePlayer(disproveCounter);

            while (!disproved) {
              disproved = this.disproveSuggestion(currentDisprovePlayer);
              disproveCounter++;

              currentDisprovePlayer = this.getNextDisprovePlayer(disproveCounter);

              //break out of while loop if all players have disproved and still no result
              if (disproved) {
                break;
              } else if (currentDisprovePlayer === currentPlayer) {
                disproved = false;
                console.log('No one was able to disprove');
                break;
              } else if (currentDisprovePlayer === this.clientArray[0]) {
                disproveCounter = 1;
              }
            }

            playerCounter++;
            nextPlayer = true;
          }
        }
      }
    }

    console.log('End of Game');
  }
}

var test = new GameState();
// simulation
test.assignClientPlayer('client0', 'Mrs. White');
test.assignClientPlayer('client1', 'Miss Scarlet');
test.gamePlay();
