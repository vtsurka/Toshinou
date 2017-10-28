/*
Created by Freshek on 16.10.2017
*/

class ShipMoveHandler {
  constructor() {
    this._handler = function(e) {
      var shipMoveCmd = JSON.parse(e.detail);

      var ship = window.ships[shipMoveCmd.userId];

      if (ship != null)
        ship.setTarget(shipMoveCmd.x, shipMoveCmd.y, shipMoveCmd[Variables.moveDuration]);
    }
  }

  get handler() {
    return this._handler;
  }
}
