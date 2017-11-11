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

    jQuery("<h1>").text("The tool detected changes in the game.").appendTo(warning);
    jQuery("<h2>").text("Loading stopped! Your account has to stay safe.").appendTo(warning);
    jQuery("<h3>").text("Reason: " + check).appendTo(warning);

    warning.appendTo("body");
    throw new Error("Safety tests failed!");
  }

  preloader.appendTo($("#container"));

  var userIdPttrn = /userID=([0-9]+)/g;
  var flashVars = document.querySelectorAll('[name="flashvars"]')[0].getAttribute("value");
  window.userId = userIdPttrn.exec(flashVars)[1];

  window.settings = new Settings();
  window.initialized = false;

  window.targetBoxHash = null;

  window.movementDone = true;

  var hm = new HandlersManager(api);

  hm.registerCommand(BoxInitHandler.ID, new BoxInitHandler());
  hm.registerCommand(ShipAttackHandler.ID, new ShipAttackHandler());
  hm.registerCommand(ShipCreateHandler.ID, new ShipCreateHandler());
  hm.registerCommand(ShipMoveHandler.ID, new ShipMoveHandler());
  hm.registerCommand(AssetRemovedHandler.ID, new AssetRemovedHandler());
  hm.registerCommand(HeroInitHandler.ID, new HeroInitHandler(init));
  hm.registerCommand(ShipDestroyedHandler.ID, new ShipDestroyedHandler());
  hm.registerCommand(ShipRemovedHandler.ID, new ShipRemovedHandler());
  hm.registerCommand(GateInitHandler.ID, new GateInitHandler());

  hm.registerEvent("updateHeroPos", new HeroPositionUpdateEventHandler());
  hm.registerEvent("movementDone", new MovementDoneEventHandler());

  hm.listen();
});

function init() {
  if (window.initialized)
    return;

  window.minimap = new Minimap(api);
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

      for (var property in api.ships) {
        var ship = api.ships[property];
        var dist = ship.distanceTo(window.hero.position);

        if (dist < maxDist && dist < finDist && ((ship.isNpc && window.settings.lockNpc && key == "x") || (ship.isEnemy && window.settings.lockPlayers && key == "z" && !ship.isNpc))) {
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
    for (var property in api.boxes) {
      var box = api.boxes[property];
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
    delete api.boxes[api.targetBoxHash];
    api.blackListHash(api.targetBoxHash);
    api.targetBoxHash = null;
  }
}
