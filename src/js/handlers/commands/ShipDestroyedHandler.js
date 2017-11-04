/*
Created by Freshek on 24.10.2017
*/

class ShipDestroyedHandler {
  static get ID() {
    return 586;
  }

  constructor() {
    this._handler = function(e, a) {
      var parsed = JSON.parse(e.detail);
      var id = parsed[Variables.shipDestoyedId];

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
