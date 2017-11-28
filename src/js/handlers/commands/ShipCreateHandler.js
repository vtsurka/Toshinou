/*
Created by Freshek on 10.10.2017
*/

class ShipCreateHandler {
  static get ID() {
    return 24971;
  }

  constructor() {
    this._handler = function(e, a) {
      e.detail = e.wholeMessage.split("|").slice(1).join("");
      var shipCreateCmd = JSON.parse(e.detail);

      a.ships[shipCreateCmd.userId] = new Ship(shipCreateCmd.x, shipCreateCmd.y, shipCreateCmd.userId, shipCreateCmd.npc, shipCreateCmd.userName, shipCreateCmd.factionId);
      if(a.ships[shipCreateCmd.userId].isNpc)
        a.npcs[shipCreateCmd.userId] = NpcFactory.create(a.ships[shipCreateCmd.userId]);
    }
  }

  get handler() {
    return this._handler;
  }
}