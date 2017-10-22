/*
Created by Freshek on 07.10.2017
*/

class Minimap {
  createWindow() {
    this.minimap = WindowFactory.createWindow({width: 300, height: 200, text: "Minimap"});

    this.canvas = jQuery("<canvas/>", {
      width: 300,
      height: 200,
    });

    this.ctx = this.canvas.get(0).getContext("2d");

    this.canvas.appendTo(this.minimap);

    var self = this;

    this.canvas.click(function(e) {
      var pos = self.minimap.position();
      var x = e.clientX - pos.left;
      var y = e.clientY - pos.top - 40;

      Injector.injectScript('document.getElementById("preloader").moveShip(' + x * 70 + ',' + y * 70 + ');');
    });
  }

  draw() {
    var ct = this.ctx;

    ct.clearRect(0, 0, this.canvas.width(), this.canvas.height());

    ct.fillStyle = 'green';
    ct.fillRect(window.hero.position.x / 70, window.hero.position.y / 90, 4, 4);

    ct.fillStyle = "yellow";
    for (var property in window.boxes) {
      var box = window.boxes[property];
      ct.fillRect(box.position.x / 70, box.position.y / 90, 2, 2);
    }

    // ct.fillStyle = "red";
    // for (var property in window.ships) {
    //   var ship = window.ships[property];
    //
    //   if (ship == null)
    //     return;
    //
    //   ship.update();
    //   var pos = ship.position;
    // }
  }
}
