/*
Created by Freshek on 13.11.2017
*/

class HeroDiedHandler {
  static get ID() {
    return 8069;
  }

  constructor() {
    this._handler = function(e, a) {
      a.heroDied = true;
    }
  }

  get handler() {
    return this._handler;
  }
}
