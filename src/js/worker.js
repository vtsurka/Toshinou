/*
Created by Freshek on 07.10.2017
*/
window.globalSettings = new GlobalSettings();
var api;

$(document).ready(function() {
  api = new Api();

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

  window.settings = new Settings();
  window.initialized = false;

  window.ships = [];
  window.boxes = [];

  window.targetBoxHash = null;

  window.movementDone = true;

  HandlersManager.register("boxInit", new BoxInitHandler(api));
  HandlersManager.register("shipAttack", new ShipAttackHandler());
  HandlersManager.register("shipCreate", new ShipCreateHandler());
  HandlersManager.register("shipMove", new ShipMoveHandler());
  HandlersManager.register("updateHeroPos", new HeroPositionUpdateHandler());
  HandlersManager.register("assetRemoved", new AssetRemovedHandler(api));
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

  window.collectingWindow = new CollectingWindow();
  window.collectingWindow.createWindow();

  window.autolockWindow = new AutolockWindow();
  window.autolockWindow.createWindow();

  Injector.injectScriptFromResource("res/injectables/HeroPositionUpdater.js");

  window.setInterval(logic, window.globalSettings.timerTick);

  $(document).keyup(function(e) {
    var key = e.key;

    if (key == "x" || key == "z") {
      var maxDist = 1000;
      var finDist = 1000000;
      var finalShip;

      for (var property in window.ships) {
        var ship = window.ships[property];
        var dist = ship.distanceTo(window.hero.position);

        if (dist < maxDist && dist < finDist && ((ship.isNpc && window.settings.lockNpc && key == "x") || (ship.isEnemy && window.settings.lockPlayers && key == "z"))) {
          finalShip = ship;
          finDist = dist;
        }
      }

      if (finalShip != null)
        api.lockShip(finalShip);
    }
  });
}

function logic() {
  window.minimap.draw();

  if (api.targetBoxHash == null) {
    var minDist = 100000;
    var finalBox;
    for (var property in window.boxes) {
      var box = window.boxes[property];
      var dist = box.distanceTo(window.hero.position);

      if (dist < minDist) {
        if (((box.type == "BONUS_BOX" || box.type == "MINI_PUMPKIN" || box.type == "TURKISH_FLAG") && window.settings.collectBoxes) || (box.isMaterial() && window.settings.collectMaterials)) {
          finalBox = box;
          minDist = dist;
        }
      }
    }

    if (finalBox != null) {
      api.collectBox(finalBox);
      api.targetBoxHash = finalBox.hash;
      return;
    }

    if (window.movementDone && window.settings.moveRandomly) {
      window.movementDone = false;
      api.move(MathUtils.random(100, 20732), MathUtils.random(58, 12830));
    }
  } else if ($.now() - api.collectTime > 5000) {
    delete window.boxes[api.targetBoxHash];
    api.blackListHash(api.targetBoxHash);
    api.targetBoxHash = null;
  }
}
