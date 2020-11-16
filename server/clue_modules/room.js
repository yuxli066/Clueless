/**
 * Room Class
 */

class Room {
  constructor(name) {
    this.name = name;
  }
  secretPassageWay = undefined;
  adjacentHallwayList = new Set();

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
      this.adjacentHallwayList.add(hallwayArray[i]);
    }
  }

  getAdjacentHallways() {
    return this.adjacentHallwayList;
  }

  hasSecretPassageWay() {
    if (this.secretPassageWay != undefined) {
      return true;
    } else {
      return false;
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
