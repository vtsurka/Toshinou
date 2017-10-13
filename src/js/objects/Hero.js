/*
Created by Freshek on 07.10.2017
*/

class Hero extends Movable {
  constructor(x, y) {
    super();
    this.position = new Vector2D(x, y);
  }

  move(pos) {
    if (pos instanceof Vector2D) {
      Injector.injectScript('document.getElementById("preloader").moveShip(' + pos.x + ',' + pos.y + ');');
    }
  }
}
