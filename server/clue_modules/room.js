/**
 * Room Class
 */

class Room {
  secretPassageWay = undefined;
  adjacentHallwayList = new Set();

  constructor(name) {
    this.name = name;
  }

  // return name of room
  getName() {
    return this.name;
  }

  // change/setname of room
  setName(name) {
    this.name = name;
  }

  addAdjacentHallway(hallway) {
    this.adjacentHallwayList.add(hallway);
  }

  addAdjacentHallways(hallwayArray) {
    for (var i = 0; i < hallwayArray.length; i++) {
      this.addAdjacentHallwayList.add(hallwayArray[i]);
    }
  }

  setSecretPassageWay(room) {
    this.secretPassageWay = room;
  }

  getSecretPassageWay() {
    return this.secretPassageWay;
  }
}

//export class
module.exports.Room = Room;
