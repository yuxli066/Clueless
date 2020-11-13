/**
 * Gamecard
 */

class GameCard {
  constructor() {}

  suspectList = new Set();
  weaponList = new Set();
  roomList = new Set();

  updateSuspectList(player) {
    this.suspectList.add(player);
  }

  updateWeaponList(weapon) {
    this.weaponList.add(weapon);
  }

  updateRoomList(room) {
    this.roomList.add(room);
  }

  getSuspectList() {
    return this.suspectList;
  }

  getWeaponList() {
    return this.weaponList;
  }

  getRoomList() {
    return this.roomList;
  }
}

module.exports.GameCard = GameCard;
