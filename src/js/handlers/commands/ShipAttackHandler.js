/*
Created by Freshek on 07.10.2017
*/

class ShipAttackHandler {
  static get ID() {
    24078;
  }

  constructor() {
    this._handler = function(e, a) {
      var shipAttackCmd = JSON.parse(e.detail);
      // TODO: Make this cleaner – create a Ship object
      if (shipAttackCmd[Variables.attackerId] == window.userId) { //attacker id
        window.attackWindow.hp(shipAttackCmd[Variables.attackHp]);
        window.attackWindow.shd(shipAttackCmd[Variables.attackShd]);
        window.attackWindow.targetName(a.ships[shipAttackCmd[Variables.attackedId]].name);
      }
    }
  }

  get handler() {
    return this._handler;
  }
}
