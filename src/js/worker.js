/*
Created by Freshek on 07.10.2017
*/

var userIdPttrn = /userID=([0-9]+)/g;
var flashVars = document.querySelectorAll('[name="flashvars"]')[0].getAttribute("value");
window.userId = userIdPttrn.exec(flashVars)[1];

var preloader = $("#preloader").attr("wmode", "opaque");
$("#preloader").remove();
preloader.appendTo($("#container"));

window.settings = new Settings(false, false, false);
window.initialized = false;

window.ships = [];
window.boxes = [];

window.targetBoxHash = null;

window.movementDone = true;

HandlersManager.register("boxInit", new BoxInitHandler());
HandlersManager.register("shipAttack", new ShipAttackHandler());
HandlersManager.register("shipCreate", new ShipCreateHandler());
HandlersManager.register("updateHeroPos", new HeroPositionUpdateHandler());
HandlersManager.register("assetRemoved", new AssetRemovedHandler());
HandlersManager.register("heroInit", new HeroInitHandler(init));
HandlersManager.register("movementDone", new MovementDoneHandler());

function init() {
  if (window.initialized)
    return;

  window.minimap = new Minimap();
  window.minimap.createWindow();

  window.attackWindow = new AttackWindow();
  window.attackWindow.createWindow();

  window.settingsWindow = new SettingsWindow();
  window.settingsWindow.createWindow();

  Injector.injectScriptFromResource("res/injectables/HeroPositionUpdater.js");

  window.setInterval(logic, 500);
}

function logic() {
  if (window.targetBoxHash == null) {
    var minDist = 100000;
    var finalBox;
    for (var property in window.boxes) {
      var dist = window.boxes[property].distanceTo(hero.position);

      if (dist < minDist) {
        var box = window.boxes[property];
        if ((box.type == "BONUS_BOX" && window.settings.collectBoxes) || (box.isMaterial() && window.settings.collectMaterials)) {
          finalBox = box;
          minDist = dist;
        }
      }
    }

    if (finalBox != null) {
      Injector.injectScript('document.getElementById("preloader").collectBox' + finalBox.hash + '()');
      window.targetBoxHash = finalBox.hash;
      return;
    }

    if (window.movementDone && window.settings.moveRandomly) {
      window.movementDone = false;
      window.targetPosition = new Vector2D(MathUtils.random(100, 20732), MathUtils.random(58, 12830));
      window.hero.move(window.targetPosition);
    }
  }
}
