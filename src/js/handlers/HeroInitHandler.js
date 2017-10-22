/*
Created by Freshek on 13.10.2017
*/

class HeroInitHandler {
  constructor(f) {
    this._handler = function(e) {
      window.ships = [];
      window.boxes = [];
      var heroJson = JSON.parse(e.detail);
      if (window.hero == null) {
        window.hero = new Hero(heroJson.x, heroJson.y);
      }
      f();
      window.initialized = true;
    }
  }

  get handler() {
    return this._handler;
  }
}
