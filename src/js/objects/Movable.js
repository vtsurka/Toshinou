/*
Created by Freshek on 13.10.2017
*/

class Movable {
  move(x, y) {
    this.position.set(x, y);
  }

  distanceTo(vector) {
    return this.position.distanceTo(vector);
  }
}
