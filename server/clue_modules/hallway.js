/**
 * Hallway Class Module
 */

class Hallway {
  constructor(num) {
    this.num = num;
  }

  getName() {
    return "Hallway " + this.num.toString();
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
