/*
Created by Freshek on 07.10.2017
*/

class Box {
  constructor(x, y, hash, type) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.hash = hash;
    this.type = type;
  }

  toString() {
    return JSON.parse(this);
  }
}
