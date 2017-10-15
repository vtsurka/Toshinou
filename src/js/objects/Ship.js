/*
Created by Freshek on 15.10.2017
*/

class Ship extends Movable {
  constructor(id, x, y, isnpc, name) {
    super(x, y);
    this.id = id;
    this.isNpc = isnpc;
    this.name = name;
  }
}
