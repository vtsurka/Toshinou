/*
Created by Freshek on 07.10.2017
*/

class HeroPositionUpdateHandler {
  constructor() {
    this._handler = function(e) {
      var positions = e.detail.split("|");
      window.minimap.setHeroPos(parseInt(positions[0]), parseInt(positions[1]));
    }
  }

  get handler() {
    return this._handler;
  }
}
