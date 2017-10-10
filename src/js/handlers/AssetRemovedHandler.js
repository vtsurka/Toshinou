/*
Created by Freshek on 07.10.2017
*/

class AssetRemovedHandler {
  constructor() {
    this._handler = function(e) {
      var parsedCmd = JSON.parse(e.detail);

      if (parsedCmd.hash in window.boxes) {
        delete window.boxes[parsedCmd.hash];
      }
      window.minimap.removeBox(parsedCmd.hash);
    }
  }

  get handler() {
    return this._handler;
  }
}
