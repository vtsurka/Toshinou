/*
Created by Freshek on 24.10.2017
*/

class ShipRemovedHandler {
  constructor() {
    this._handler = function(e) {
      var parsed = JSON.parse(e.detail);
      var id = parsed.userId;

      var ship = window.ships[id];

      if (ship != null) {
        delete window.ships[id];
      }
    }
  }

  get handler() {
    return this._handler;
  }
}
