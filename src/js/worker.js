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
  hm.registerCommand(ShipSelectedHandler.ID, new ShipSelectedHandler());

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

  window.npcSettingsWindow = new NpcSettingsWindow();
  window.npcSettingsWindow.createWindow();

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

  if (api.targetBoxHash == null && api.targetShip == null) {
    if (window.settings.killNpcs) {
      if (api.targetShip == null) {
        var minDist = 100000;
        var finalShip;
        for (var property in api.ships) {
          var ship = api.ships[property];
          ship.update();
          var dist = ship.distanceTo(window.hero.position);

          if (dist < minDist) {
            if (window.settings.getNpc(ship.name)) {
              finalShip = ship;
              minDist = dist;
            }
          }
        }

        if (finalShip != null) {
          if (minDist < 1000) {
            api.lockShip(finalShip);
            api.triedToLock = true;
          } else {
            finalShip.update();
            api.move(finalShip.position.x - MathUtils.random(-50, 50), finalShip.position.y - MathUtils.random(-50, 50));
          }
          api.targetShip = finalShip;
          return;
        }
      }
    }

    if (window.settings.collectBoxes || window.settings.collectMaterials) {
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
    }
  }

  if (api.targetShip && window.settings.killNpcs) {
    if (!api.triedToLock && (api.lockedShip == null || api.lockedShip.id != api.targetShip)) {
      api.targetShip.update();
      var dist = api.targetShip.distanceTo(window.hero.position);
      if (dist < 1000) {
        api.lockShip(api.targetShip);
        api.triedToLock = true;
        return;
      }
    }

    if (!api.attacking && api.lockedShip) {
      api.startLaserAttack();
      api.attacking = true;
      return;
    }
  }

  if (api.targetBoxHash != null && $.now() - api.collectTime > 5000) {
    delete api.boxes[api.targetBoxHash];
    api.blackListHash(api.targetBoxHash);
    api.targetBoxHash = null;
  }

  //HACK: npc stucks fallback
  if (api.targetShip && $.now() - api.lockTime > 5000 && !api.attacking) {
    api.targetShip = null;
    api.attacking = false;
    api.triedToLock = false;
    api.lockedShip = null;
  }

  var x;
  var y;

  if (api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.moveRandomly) {
    x = MathUtils.random(100, 20732);
    y = MathUtils.random(58, 12830);
  }

  if (api.targetShip) {
    api.targetShip.update();
    var dist = api.targetShip.distanceTo(window.hero.position);

    if (dist > 1000 && (api.lockedShip == null || api.lockedShip.id != api.targetShip.id)) {
      x = api.targetShip.position.x - MathUtils.random(-50, 50);
      y = api.targetShip.position.y - MathUtils.random(-50, 50);
    } else if (dist > 500 && api.lockedShip && api.lockedShip.id == api.targetShip.id) {
      x = api.targetShip.position.x - 350 + MathUtils.random(-50, 50);
      y = api.targetShip.position.y - 350 + MathUtils.random(-50, 50);
    }
  }

  if (x && y) {
    api.move(x, y);
    window.movementDone = false;
  }
}
