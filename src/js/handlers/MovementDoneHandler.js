/*
Created by Freshek on 13.10.2017
*/

class MovementDoneHandler {
  constructor() {
    this._handler = function() {
      window.movementDone = true;
    }
  }

  get handler() {
    return this._handler;
  }
}
