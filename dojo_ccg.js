class Card{
    constructor(name,cost){
        this.name = name;
        this.cost = cost;
    }
}

class Unit extends Card{
    constructor(name,cost,power,res){
        super(name,cost);
        this.power = power;
        this.res = res;
    }
    attack(target){
        
        if (target instanceof Unit){
            target.res -= this.power;
        }
        else {
            throw new Error( "Target must be a unit!" );
        }
    }

    showStats(){
        console.log("Ninja Stats:");
        console.log("name: " + this.name);
        console.log("cost: " + this.cost);
        console.log("power: " + this.power);
        console.log("res: " + this.res);
    }
}

class Effect extends Card{
    constructor(name, cost, text){
        super(name, cost);
        this.text = text;
    }

    playEffect(target){
        if (target instanceof Unit){

            
            let resilienceEffect = this.text.toLowerCase().includes("resilience") ? true : false;
            let powerEffect = this.text.toLowerCase().includes("power") ? true : false;
            let raiseEffect = this.text.toLowerCase().includes("raise") ? true : false;
            let lowerEffect = this.text.toLowerCase().includes("lower") ? true : false;
            let amount = parseInt(this.text.match(/\d+/g)); // regex exression

            if (raiseEffect){
                if (resilienceEffect){
                    target.res += amount;
                }
                else if (powerEffect){
                    target.power += amount;
                }
            }

            else if (lowerEffect){
                if (resilienceEffect){
                    target.res -= amount;
                }
                else if (powerEffect){
                    target.power -= amount;
                }
            }
        }
        else{
            throw new Error( "Target must be a unit!" );
        }

    }
}

// ------------------
// TURN 1
// ------------------

console.log("-".repeat(50));
console.log("Turn 1");
console.log("-".repeat(50));

// 1.1 Player 1 summons "Red Belt Ninja"
console.log("Player 1 summons 'Red Belt Ninja'");
redBeltNinja = new Unit("Red Belt Ninja",3,3,4);
redBeltNinja.showStats();
console.log("\n");

// 2.1 Player 1 plays "Hard Algorithm" on "Red Belt Ninja"
console.log("Player 1 plays 'Hard Algorithm' on 'Red Belt Ninja'");
hardalgorithm = new Effect("Hard Algorithm",2,"Raise target's resilience by 3");
hardalgorithm.playEffect(redBeltNinja);
redBeltNinja.showStats();
console.log("\n");

// ------------------
// TURN 2
// ------------------

console.log("-".repeat(50));
console.log("Turn 2");
console.log("-".repeat(50));

// 2.1 Player 2 summons "Black Belt Ninja"
blackBeltNinja = new Unit("Black Belt Ninja",4,5,4);
blackBeltNinja.showStats();
console.log("\n");

// 2.2 Player 2 plays "Unhandled Promise Rejection" on "Red Belt Ninja"
unhandledPromiseRejection = new Effect("Unhandled Promise Rejection",1,"Lower target's resilience by 2");
unhandledPromiseRejection.playEffect(redBeltNinja);
redBeltNinja.showStats();
console.log("\n");


// ------------------
// TURN 3
// ------------------

console.log("-".repeat(50));
console.log("Turn 3");
console.log("-".repeat(50));

// 3.1 Player 1 plays "Pair Programming" on "Red Belt Ninja"
pairProgramming = new Effect("Pair Programming",3,"Raise target's power by 2");
pairProgramming.playEffect(redBeltNinja);
redBeltNinja.showStats();
console.log("\n");

// 3.2 Player 1 has "Red Belt Ninja" attack "Black Belt Ninja"
redBeltNinja.attack(blackBeltNinja);
blackBeltNinja.showStats();
console.log("\n");

// ------------------
// GAME OVER
// ------------------

console.log("-".repeat(50));
console.log("GAME OVER");
console.log("-".repeat(50));
console.log("Black Belt Ninja Die! Player 2 lose and Player 1 wins!!!");
console.log("\n");