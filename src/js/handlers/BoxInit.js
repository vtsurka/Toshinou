/*
Created by Freshek on 07.10.2017
*/

class BoxInit {
  constructor() {
    this._handler = function(e) {
      var box = JSON.parse(e.detail);

      var pBox = new Box(box.x, box.y, box.hash, box["_-g2v"]);
      window.boxes[box.hash] = pBox;
      window.minimap.addBox(pBox);
    };
  }

  get handler() {
    return this._handler;
  }
}
