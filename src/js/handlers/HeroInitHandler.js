/*
Created by Freshek on 13.10.2017
*/

class HeroInitHandler {
  constructor(f) {
    this._handler = function(e) {

      // FIXME? reconnect/revive bug? needs confiramtion
      window.ships = [];
      window.boxes = [];

      var heroJson = JSON.parse(e.detail);

      if (window.hero == null) {
        window.hero = new Hero(heroJson.x, heroJson.y, heroJson.factionId);
      }
      f();
      window.initialized = true;
    }
  }

  get handler() {
    return this._handler;
  }
}
