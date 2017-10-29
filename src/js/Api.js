/*
Created by Freshek on 28.10.2017
*/
class Api {
  static lockShip(ship) {
    if (!(ship instanceof Ship))
      return;

    ship.update();
    var pos = ship.position;
    var scr = 'document.getElementById("preloader").lockShip(' + ship.id + ',' + Math.round(pos.x) + ',' + Math.round(pos.y) + ',' + Math.round(window.hero.position.x) + ',' + Math.round(window.hero.position.y) + ');';
    Injector.injectScript(scr);
  }
}
