/*
Created by Freshek on 07.10.2017
*/
window.minimap = new Minimap();
window.minimap.createWindow();

window.attackWindow = new AttackWindow();
window.attackWindow.createWindow();

window.ships = [];
window.boxes = [];

var userIdPttrn = /userID=([0-9]+)/g;
var flashVars = document.querySelectorAll('[name="flashvars"]')[0].getAttribute("value");
window.userId = userIdPttrn.exec(flashVars)[1];

HandlersManager.register("boxInit", new BoxInitHandler());
HandlersManager.register("shipAttack", new ShipAttackHandler());
HandlersManager.register("shipCreate", new ShipCreateHandler());
HandlersManager.register("updateHeroPos", new HeroPositionUpdateHandler());
HandlersManager.register("assetRemoved", new AssetRemovedHandler());

Injector.injectScriptFromResource("res/injectables/HeroPositionUpdater.js");
