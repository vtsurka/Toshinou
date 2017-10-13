/*
Created by Freshek on 07.10.2017
*/

class Minimap {
  createWindow() {
    this.minimap = WindowFactory.createWindow({width: 300, height: 200, text: "Minimap"});

    this.canvas = jQuery("<div/>", {
      width: 300,
      height: 200,
      id: "minimap"
    });
    this.canvas.appendTo(this.minimap);

    this.stage = new Konva.Stage({
      container: 'minimap',
      width: 300,
      height: 200
    });

    this.layer = new Konva.Layer();

    this.stage.add(this.layer);

    this.boxes = [];

    this.hero = new Konva.Circle({
      x: -10,
      y: -10,
      radius: 5,
      fill: "green",
    });

    this.layer.add(this.hero);

    var self = this;

    this.canvas.click(function(e) {
      var pos = self.minimap.position();
      var x = e.clientX - pos.left;
      var y = e.clientY - pos.top - 40;
      console.log(x + "/" + y);
      Injector.injectScript('document.getElementById("preloader").moveShip(' + x * 70 + ',' + y * 70 + ');');
    });
  }

  addBox(box) {
    var boxRect = new Konva.Rect({
      x: box.position.x / 70,
      y: box.position.y / 70,
      width: 2,
      height: 2,
      fill: 'gold',
      opacity: 0.8
    });

    this.boxes[box.hash] = boxRect;
    this.layer.add(boxRect);

    this.layer.draw();
  }

  removeBox(hash) {
    if (hash in this.boxes) {
      this.boxes[hash].destroy();
      delete this.boxes[hash];
      this.layer.draw();
    }
  }

  setHeroPos(x, y) {
    var xp = x / 70;
    var yp = y / 70;

    this.hero.position({
      x: xp,
      y: yp
    });

    this.layer.draw();
  }
}
