/*
Created by Freshek on 13.10.2017
*/

class HeroInitHandler {
  constructor(f) {
    this._handler = function(e) {
      var heroJson = JSON.parse(e.detail);
      if (window.hero == null) {
        window.hero = new Hero(heroJson.x, heroJson.y);
      }
      f();
    }
  }

  get handler() {
    return this._handler;
  }
}
