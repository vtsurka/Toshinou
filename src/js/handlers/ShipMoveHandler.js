/*
Created by Freshek on 16.10.2017
*/

class ShipMoveHandler {
  constructor() {
    this._handler = function(e) {
      var shipMoveCmd = JSON.parse(e.detail);
      // console.log(shipMoveCmd);
    }
  }

  get handler() {
    return this._handler;
  }
}
