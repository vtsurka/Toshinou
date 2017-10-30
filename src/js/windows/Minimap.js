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

      Injector.injectScript('document.getElementById("preloader").moveShip(' + x * 70 + ',' + y * 90 + ');');
    });
  }

  draw() {
    var ct = this.ctx;

    ct.clearRect(0, 0, this.canvas.width(), this.canvas.height());

    ct.fillStyle = 'green';
    ct.fillRect(window.hero.position.x / 70, window.hero.position.y / 90, 4, 4);

    for (var property in window.boxes) {
      var box = window.boxes[property];

      if (box == null)
        continue;

      ct.fillStyle = BoxType.getColor(box.type);

      ct.fillRect(box.position.x / 70, box.position.y / 90, 2, 2);
    }

    for (var property in window.ships) {
      var ship = window.ships[property];

      if (ship == null)
        continue;

      ship.update();
      var pos = ship.position;

      if (ship.isNpc) {
        ct.fillStyle = "rgb(255, 0, 245)";
      } else if (ship.isEnemy) {
        ct.fillStyle = "rgb(74, 0, 0)";
      } else {
        ct.fillStyle = "rgb(0, 125, 255)";
      }

      this._drawCircle(ct, pos.x / 70, pos.y / 90, 2);
    }
  }

  _drawCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}
