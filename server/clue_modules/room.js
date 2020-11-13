/**
 * Room Class
 */

var hallways = require("./hallway");
var coordinates = require("./coordinates");

class Room {
  entrances = new Set();
  secretPassageConnection = undefined;
  adjacentHallways = new Set();

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

  addEntrance(axisX, axisY) {
    this.entrances.add(new coordinates.Coordinate(axisX, axisY));
  }

  addAdjacentHallway(hallwayNum) {
    this.adjacentHallways.add(new hallways.Hallway(hallwayNum));
  }

  setSecretPassageConnection(room) {
    this.secretPassageConnection = room;
  }
}

//export class
module.exports.Room = Room;
