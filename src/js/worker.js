/*
Created by Freshek on 07.10.2017
*/

$(document).ready(function() {
  var preloader = $("#preloader").attr("wmode", "opaque");
  $("#preloader").remove();

  var check = SafetyChecker.check();

  if (check !== true) {
    var warning = jQuery("<div>");
    warning.css({top: 0, left: 0, position: "absolute", width: "100%", height: "100%", backgroundColor: "gray", textAlign: "center"});

    jQuery("<h1>").text("The tool has detected unwanted changes in the game.").appendTo(warning);
    jQuery("<h2>").text("Loading stopped, your account should stay safe.").appendTo(warning);
    jQuery("<h3>").text("cause: " + check).appendTo(warning);

    warning.appendTo("body");
    throw new Error("Safety tests failed!");
  }

  preloader.appendTo($("#container"));

  var userIdPttrn = /userID=([0-9]+)/g;
  var flashVars = document.querySelectorAll('[name="flashvars"]')[0].getAttribute("value");
  window.userId = userIdPttrn.exec(flashVars)[1];

  window.settings = new Settings(false, false, false);
  window.initialized = false;

  window.ships = [];
  window.boxes = [];

  window.targetBoxHash = null;

  window.movementDone = true;

  HandlersManager.register("boxInit", new BoxInitHandler());
  HandlersManager.register("shipAttack", new ShipAttackHandler());
  HandlersManager.register("shipCreate", new ShipCreateHandler());
  HandlersManager.register("shipMove", new ShipMoveHandler());
  HandlersManager.register("updateHeroPos", new HeroPositionUpdateHandler());
  HandlersManager.register("assetRemoved", new AssetRemovedHandler());
  HandlersManager.register("heroInit", new HeroInitHandler(init));
  HandlersManager.register("movementDone", new MovementDoneHandler());
  HandlersManager.register("shipDestroyed", new ShipDestroyedHandler());
  HandlersManager.register("shipRemoved", new ShipRemovedHandler());
});

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

  window.setInterval(logic, 300);
}

function logic() {
  window.minimap.draw();

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
