/*
Created on 04.11.2017 by Freshek
    fullHp: "_-D3h",
    fullShield: "_-x3q",
    hp: "_-O2J",
    shield: "shield"
*/

class ShipSelectedHandler {  

  static get ID() {
    return 20164;
  }

  constructor() {
    this._handler = function(e, a) {    
      var parsedJson = JSON.parse(e.detail);    
      
      if (a.npcs.hasOwnProperty(parsedJson.userId)) {
          var npc = a.npcs[parsedJson.userId];      
          
          npc.updateStats(parsedJson["_-O2J"], parsedJson["shield"], parsedJson["_-D3h"], parsedJson["_-x3q"]);
          
          if (a.lockedShip && (a.lockedShip.id == parsedJson.userId) && (a.lockedShip == a.targetShip)) { return; }
          
          if (npc.canBeAttacked()) {         
            a.npcs[parsedJson.userId] = npc;
            a.lockedShip = npc.ship;            
          } else {            
            a.targetShip = null;
            a.attacking = false;
            a.triedToLock = false;
            a.lockedShip = null;
          }            
          return;
      }
    }
  }

  get handler() {
    return this._handler;
  }
}