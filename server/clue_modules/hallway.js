/**
 * Hallway Class Module
 */

class Hallway {
  constructor(num) {
    this.num = num;
  }

  // return name of Hallway
  getHallwayNum() {
    return this.num;
  }

  // change/setname of Hallway
  setHallwayNum(num) {
    this.num = num;
  }
}

//export class
module.exports.Hallway = Hallway;
