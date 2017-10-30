/*
Created by Freshek on 28.10.2017
*/
class Api {
  static lockShip(ship) {
    if (!(ship instanceof Ship))
      return;

    if (window.ships[ship.id] == null)
      return;

    ship.update();
    var pos = ship.position;
    var scr = 'document.getElementById("preloader").lockShip(' + ship.id + ',' + Math.round(pos.x) + ',' + Math.round(pos.y) + ',' + Math.round(window.hero.position.x) + ',' + Math.round(window.hero.position.y) + ');';
    Injector.injectScript(scr);
  }

  static collectBox(box) {
    if (!(box instanceof Box))
      return;

    if (window.boxes[box.hash] == null)
      return;

    Injector.injectScript('document.getElementById("preloader").collectBox' + box.hash + '()');
  }

  static move(x, y) {
    if (!isNaN(x) && !isNaN(y)) {
      window.hero.move(new Vector2D(x, y));
    }
  }
}
