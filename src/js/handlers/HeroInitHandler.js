/*
Created by Freshek on 13.10.2017
*/

class HeroInitHandler {
  constructor(f) {
    this._handler = function(e) {
      f();
    }
  }

  get handler() {
    return this._handler;
  }
}
