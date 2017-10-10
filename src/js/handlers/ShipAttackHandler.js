/*
Created by Freshek on 07.10.2017
*/

class ShipAttackHandler {
  constructor() {
    this._handler = function(e) {
      var shipAttackCmd = JSON.parse(e.detail);

      // TODO: Make this cleaner – create a Ship object
      if (shipAttackCmd["_-r3w"] == window.userId) { //attacker id
        window.attackWindow.hp(shipAttackCmd["_-t4t"]);
        window.attackWindow.shd(shipAttackCmd["_-k4G"]);
        window.attackWindow.targetName(window.ships[shipAttackCmd["_-O1K"]]);
      }
    }
  }

  get handler() {
    return this._handler;
  }
}
