/*
Created by Freshek on 24.10.2017
*/

class ShipRemovedHandler {
  static get ID() {
    return 15495;
  }

  constructor() {
    this._handler = function(e, a) {
      var parsed = JSON.parse(e.detail);
      var id = parsed.userId;

      var ship = a.ships[id];

      if (ship != null) {
        delete a.ships[id];
      }
    }
  }

  get handler() {
    return this._handler;
  }
}
