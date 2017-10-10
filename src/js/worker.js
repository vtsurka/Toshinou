/*
Created by Freshek on 07.10.2017
*/

console.log("[jCheat:JS] Welcome from the JS side!");

window.minimap = new Minimap();
window.minimap.createWindow();

window.attackWindow = new AttackWindow();
window.attackWindow.createWindow();

window.ships = [];
window.boxes = [];

var userIdPttrn = /userID=([0-9]+)/g;
var flashVars = document.querySelectorAll('[name="flashvars"]')[0].getAttribute("value");
window.userId = userIdPttrn.exec(flashVars)[1];

HandlersManager.register("boxInit", new BoxInit());
HandlersManager.register("shipAttack", new ShipAttack());

document.addEventListener("shipCreate", function (e) {
  var shipCreateCmd = JSON.parse(e.detail);
  window.ships[shipCreateCmd.userId] = shipCreateCmd.userName;
  console.log(ships);
}, false);

document.addEventListener("updateHeroPos", function (e) {
  var positions = e.detail.split("|");
  window.minimap.setHeroPos(parseInt(positions[0]), parseInt(positions[1]));
}, false);


Injector.injectScriptFromResource("res/injectables/HeroPositionUpdater.js");
