/**
 * @TODO 
 * In feature do extends of Ship because App will be contains two collection of heroes and npcs; 
 */
class Npc {
    constructor(ship, stats) {
        console.log(stats);
        this.ship = ship;
        this.maps = [];       
        this.fullHp = stats.hp;
        this.fullShield = stats.shield;
        this.hp = stats.hp;
        this.shield = stats.shield;
        //stats for future
        this.rangeBase = 0;
        this.rangeToFinish = 0;
        //to sorting priority attack queue
        this.speed = 0;
    }

    canBeAttacked() {        
        return this.shield == this.fullShield || (this.shield+1) == this.fullShield; //for some npc shield api data store shield +1
    }

    updateStats(hp,shield, fullHp, fullShield) {
        this.hp = hp;
        this.shield = shield;
        
        if (this.fullHp == 0 && this.fullShield == 0) {
            this.fullHp = fullHp;            
            this.fullShield = fullShield;
        }
    }

    isRunAway() {                
        return (this.hp / this.fullHp) <= 0.25; // when bot runaway
    }
    
}