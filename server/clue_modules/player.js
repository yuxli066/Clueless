/**
 * Player
 * Player Class
 */

class Player {
  constructor(name) {
    this.name = name;
  }

  // return name of player
  getName() {
    return this.name;
  }

  // change/setname of player
  setName(name) {
    this.name = name;
  }
}

//export class
module.exports.Player = Player;
