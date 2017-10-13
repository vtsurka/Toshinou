/*
Created by Freshek on 07.10.2017
*/

class BoxInitHandler {
  constructor() {
    this._handler = function(e) {
      var box = JSON.parse(e.detail);

      if (box.hash.length == 5)
        return;

      var pBox = new Box(box.x, box.y, box.hash, box[Variables.boxType]);
      window.boxes[box.hash] = pBox;
      window.minimap.addBox(pBox);
    };
  }

  get handler() {
    return this._handler;
  }
}
