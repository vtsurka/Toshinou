/*
Created by Freshek on 07.10.2017
*/

class Box extends Movable {
  constructor(x, y, hash, type) {
    super();
    this.position = new Vector2D(x, y);
    this.hash = hash;
    this.type = type;
  }

  toString() {
    return JSON.parse(this);
  }

  isMaterial() {
    var type = this.type.toLowerCase();
    return (type == "mucosum" || type == "prismatium" || type == "scrapium" || type == "boltrum");
  }
}
