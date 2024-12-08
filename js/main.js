import './jquery-3.7.1.min.js'
import {
    rmBuildSampleMonster,
    rmBuildSampleItem,
    rmBuildSampleShop,
    rmBuildSampleBoss,
    rmBuildRoom, rmBuildMap, rmBuildInventory, rmBuildStats, rmBuildEquip
} from "./roommanager.js";
import { Room, BossRoom, ShopRoom, ItemRoom, MonsterRoom, Boss, BaseItem, Monster, Creature, Dungeon, Player, Equipment, Consumable } from "./classes.js";
import {ItemFactory, ItemType} from './item-factory.js';
import {EnemyFactory, EnemyType} from "./monster-factory.js";
import { CombatManager, updateStatusBar } from './combat-manager.js';
import {BossFactory,BossType} from "./boss-factory.js";
import {ConsumableFactory,ConsumableType} from "./consumable-factory.js";

// player initialization
let player = new Player(25,25,5,0,25,[],[], 0);

// combat manager initialization
let combatManager = new CombatManager(player, []);

// Generate Dungeon

function generateRooms(difficulty) {
    let roomCount = Math.round(8*difficulty); // total rooms in current dungeon layout
    let roomCountMod = roomCount-2; // total rooms minus boss and shop
    const itemRatio = 0.25; // how many item rooms there are compared to monster rooms
    let itemRooms = Math.round(roomCountMod*itemRatio);

    let rooms = [];


    // !! TODO add more items to pools once implemented. !!

    let shopEquipPool = [
        ItemType.Bow,
        ItemType.Whip,
        ItemType.Shield
    ];
    let shopConsumePool = [
        ConsumableType.LesserHealingPotion,
        ConsumableType.GreaterHealingPotion,
        ConsumableType.Bomb
    ];
    let itemEquipPool = [
        ItemType.RabbitsFoot,
        ItemType.RustyDagger,
        ItemType.Shield
    ];
    let itemConsumePool = [
        ConsumableType.BlizzardScroll,
        ConsumableType.FireballScroll,
        ConsumableType.LesserHealingPotion,
        ConsumableType.GreaterHealingPotion,
        ConsumableType.SuperiorHealingPotion
    ];

    // Build Monster Pool
    let monsterPool = [EnemyType.Seeker];
    let floorBoss = BossType.Eyemalgam;

    if (difficulty >= 1) {
        monsterPool.push(EnemyType.CrimeSlime);
    }
    if (difficulty >= 1.25) {
        monsterPool.push(EnemyType.Snobgoblin);
        floorBoss = BossType.Slimelord;
    }
    if (difficulty >= 1.5) {
        monsterPool.push(EnemyType.LazyBones);
        floorBoss = BossType.Orchestrator;
    }
    if (difficulty >= 1.75) {
        monsterPool.push(EnemyType.HungryGhost);
        floorBoss = BossType.GrimSleeper;
    }
    if (difficulty >= 2) {
        floorBoss = BossType.SoulFeaster;
    }

    let bossRoom = new BossRoom("boss",BossFactory.createBoss(floorBoss,difficulty),false);
    rooms[roomCount-1] = bossRoom; // last room = boss room

    let sItem1 = ItemFactory.createItem(shopEquipPool[Math.floor(Math.random()*shopEquipPool.length)]);
    let sItem2 = ItemFactory.createItem(shopEquipPool[Math.floor(Math.random()*shopEquipPool.length)]);
    let sItem3 = ConsumableFactory.createConsumable(shopConsumePool[Math.floor(Math.random()*shopConsumePool.length)]);
    let sItem4 = ConsumableFactory.createConsumable(shopConsumePool[Math.floor(Math.random()*shopConsumePool.length)]);

    let shopRoom = new ShopRoom("shop",[sItem1,sItem2,sItem3,sItem4]);
    rooms[roomCount-2] = shopRoom; // second to last room = shop

    let remainingRooms = [];
    for (let i = 0; i < roomCountMod; i++) { remainingRooms.push(i) } // generate all remaining room numbers

    for (let i = 0; i < itemRooms; i++) { // randomly select and generate item rooms
        let randSelect = Math.floor(Math.random()*remainingRooms.length);
        let newIndex = remainingRooms[randSelect];
        remainingRooms.splice(randSelect,1);

        let rewardItem;
        if (Math.random() < .5) { //give equipment
            rewardItem = ItemFactory.createItem(itemEquipPool[Math.floor(Math.random()*itemEquipPool.length)]);
        } else { //give consumable
            rewardItem = ConsumableFactory.createConsumable(itemConsumePool[Math.floor(Math.random()*itemConsumePool.length)]);
        }

        rooms[newIndex] = new ItemRoom("item",rewardItem,false, false);
    }

    for (let i = 0; i < remainingRooms.length; i++) { // fill remaining rooms with monsters
        let monsterCount = Math.floor(Math.random()*3)+1;
        let monsters = [];
        for (let j = 0; j < monsterCount; j++) {
            monsters.push(EnemyFactory.createEnemy(monsterPool[Math.floor(Math.random()*monsterPool.length)],difficulty));
        }

        rooms[remainingRooms[i]] = new MonsterRoom("monster",monsters,false);
        combatManager.enemies = monsters;
    }

    return rooms;
}

function initRoom(firstRoom = false) {
    if (!firstRoom) {
        if (dungeon.getCurrentRoom instanceof BossRoom) { // regenerate dungeon after last room of floor
            dungeon.setDifficulty = dungeon.getDifficulty+0.25;
            dungeon.setRooms = generateRooms(dungeon.getDifficulty);
            dungeon.resetRoomIndex();

            console.log("Diff: "+dungeon.getDifficulty + ", Rooms:"+dungeon.getRooms.length)
        } else { // otherwise just move to next room
            dungeon.nextRoom();
        }
    }

    rmBuildRoom(dungeon.getCurrentRoom);
    rmBuildMap(dungeon);
    rmBuildStats(player);
    rmBuildInventory(player);

    switch (dungeon.getCurrentRoom.getType) { // room type initialization
        case "monster":
            if (dungeon.getCurrentRoom instanceof MonsterRoom) {
                let monsters = dungeon.getCurrentRoom.getMonsters;
                console.log("Current room monsters: " + JSON.stringify(monsters, null, 2)); // Debugging purpose

                combatManager.setEnemies(monsters);

                // Start combat
                combatManager.startCombat(
                    () => rmBuildRoom(dungeon.getCurrentRoom),
                    () => rmBuildStats(player),
                    () => rmBuildInventory(player)
                );
            }

            let monsterButtons = $(".enemyDiv button").toArray();

            // Remove old event listeners
            monsterButtons.forEach((button) => {
                $(button).off("click");
            });

            // Attach event listeners to monsters
            monsterButtons.forEach((button, index) => {
                $(button).on("click", () => {
                    const targetMonster = combatManager.enemies[index];
                    console.log("Clicked index: " + index); // Debugging purpose
                    if (targetMonster.health > 0) {
                        combatManager.playerAttack(index);
                    }
                    rmBuildRoom(dungeon.getCurrentRoom); // Update room
                });
            });

            break;
        case "item":
            updateStatusBar("A chest lies before you!")

            let chest = $(".chestDiv button");
            let item = $(".chestItemDiv button");
            let takeItem = dungeon.getCurrentRoom.item;

            chest.off().on("click",()=>{
                dungeon.getCurrentRoom.chestOpen = !dungeon.getCurrentRoom.chestOpen;
                rmBuildRoom(dungeon.getCurrentRoom);
            });
            item.off().on("click",()=>{
                if (!dungeon.getCurrentRoom.taken) {
                    if (takeItem instanceof Equipment) { //add item to equipment
                        player.addToEquipment = takeItem;
                        dungeon.getCurrentRoom.taken = true;
                        updateStatusBar("You took the "+takeItem.name+"!");

                        rmBuildRoom(dungeon.getCurrentRoom);
                        rmBuildInventory(player);
                    } else if (takeItem instanceof Consumable) {
                        if (player.inventory.length < 8) { //has room
                            player.addToInventory = takeItem;
                            dungeon.getCurrentRoom.taken = true;
                            updateStatusBar("You took the "+takeItem.name+"!");

                            rmBuildRoom(dungeon.getCurrentRoom);
                            rmBuildInventory(player);
                        } else { //no room
                            updateStatusBar("You have no room in your inventory!");
                        }
                    }
                }
            }).on("mouseenter",()=>{
                updateStatusBar("You've found a "+takeItem.name+"!");
            });
            break;
        case "shop":
            updateStatusBar("Welcome to the shop!");

            let item1 = $(".sItem1 button");
            let item2 = $(".sItem2 button");
            let item3 = $(".sItem3 button");
            let item4 = $(".sItem4 button");

            let shopkeeper = $(".chrShopkeeper button");
            let doctor = $(".chrDoctor button");

            let shopItem1 = dungeon.getCurrentRoom.forSale[0];
            let shopItem2 = dungeon.getCurrentRoom.forSale[1];
            let shopItem3 = dungeon.getCurrentRoom.forSale[2];
            let shopItem4 = dungeon.getCurrentRoom.forSale[3];

            // handle item 1
            item1.off().on("mouseenter",()=>{
                if (player.gold >= shopItem1.value) {
                    updateStatusBar("You could buy this "+shopItem1.name+" for "+shopItem1.value+" gold.");
                } else {
                    updateStatusBar("You can't afford this "+shopItem1.name+"... It costs "+shopItem1.value+" gold.");
                }
            }).on("click",()=>{
                if (player.gold >= shopItem1.value) {
                    if (shopItem1 instanceof Equipment) {
                        player.addToEquipment = shopItem1;
                        player.gold -= shopItem1.value;
                        delete dungeon.getCurrentRoom.forSale[0];
                        updateStatusBar("You bought the "+shopItem1.name+"!");

                        rmBuildRoom(dungeon.getCurrentRoom);
                        rmBuildStats(player);
                        rmBuildInventory(player);
                    } else if (shopItem1 instanceof Consumable) {
                        if (player.inventory.length < 8) { //has room
                            player.addToInventory = shopItem1;
                            player.gold -= shopItem1.value;
                            delete dungeon.getCurrentRoom.forSale[0];
                            updateStatusBar("You bought the "+shopItem1.name+"!");

                            rmBuildRoom(dungeon.getCurrentRoom);
                            rmBuildStats(player);
                            rmBuildInventory(player);
                        } else { //no room
                            updateStatusBar("You have no room in your inventory!");
                        }
                    }
                } else {
                    updateStatusBar("You can't afford this "+shopItem1.name+"... It costs "+shopItem1.value+" gold.");
                }
            });

            // handle item 2
            item2.off().on("mouseenter",()=>{
                if (player.gold >= shopItem2.value) {
                    updateStatusBar("You could buy this "+shopItem2.name+" for "+shopItem2.value+" gold.");
                } else {
                    updateStatusBar("You can't afford this "+shopItem2.name+"... It costs "+shopItem2.value+" gold.");
                }
            }).on("click",()=>{
                if (player.gold >= shopItem2.value) {
                    if (shopItem2 instanceof Equipment) {
                        player.addToEquipment = shopItem2;
                        player.gold -= shopItem2.value;
                        delete dungeon.getCurrentRoom.forSale[1];
                        updateStatusBar("You bought the "+shopItem2.name+"!");

                        rmBuildRoom(dungeon.getCurrentRoom);
                        rmBuildStats(player);
                        rmBuildInventory(player);
                    } else if (shopItem2 instanceof Consumable) {
                        if (player.inventory.length < 8) { //has room
                            player.addToInventory = shopItem2;
                            player.gold -= shopItem2.value;
                            delete dungeon.getCurrentRoom.forSale[1];
                            updateStatusBar("You bought the "+shopItem2.name+"!");

                            rmBuildRoom(dungeon.getCurrentRoom);
                            rmBuildStats(player);
                            rmBuildInventory(player);
                        } else { //no room
                            updateStatusBar("You have no room in your inventory!");
                        }
                    }
                } else {
                    updateStatusBar("You can't afford this "+shopItem2.name+"... It costs "+shopItem2.value+" gold.");
                }
            });

            // handle item 3
            item3.off().on("mouseenter",()=>{
                if (player.gold >= shopItem3.value) {
                    updateStatusBar("You could buy this "+shopItem3.name+" for "+shopItem3.value+" gold.");
                } else {
                    updateStatusBar("You can't afford this "+shopItem3.name+"... It costs "+shopItem3.value+" gold.");
                }
            }).on("click",()=>{
                if (player.gold >= shopItem3.value) {
                    if (shopItem3 instanceof Equipment) {
                        player.addToEquipment = shopItem3;
                        player.gold -= shopItem3.value;
                        delete dungeon.getCurrentRoom.forSale[2];
                        updateStatusBar("You bought the "+shopItem3.name+"!");

                        rmBuildRoom(dungeon.getCurrentRoom);
                        rmBuildStats(player);
                        rmBuildInventory(player);
                    } else if (shopItem3 instanceof Consumable) {
                        if (player.inventory.length < 8) { //has room
                            player.addToInventory = shopItem3;
                            player.gold -= shopItem3.value;
                            delete dungeon.getCurrentRoom.forSale[2];
                            updateStatusBar("You bought the "+shopItem3.name+"!");

                            rmBuildRoom(dungeon.getCurrentRoom);
                            rmBuildStats(player);
                            rmBuildInventory(player);
                        } else { //no room
                            updateStatusBar("You have no room in your inventory!");
                        }
                    }
                } else {
                    updateStatusBar("You can't afford this "+shopItem3.name+"... It costs "+shopItem3.value+" gold.");
                }
            });

            // handle item 3
            item4.off().on("mouseenter",()=>{
                if (player.gold >= shopItem4.value) {
                    updateStatusBar("You could buy this "+shopItem4.name+" for "+shopItem4.value+" gold.");
                } else {
                    updateStatusBar("You can't afford this "+shopItem4.name+"... It costs "+shopItem4.value+" gold.");
                }
            }).on("click",()=>{
                if (player.gold >= shopItem4.value) {
                    if (shopItem4 instanceof Equipment) {
                        player.addToEquipment = shopItem4;
                        player.gold -= shopItem4.value;
                        delete dungeon.getCurrentRoom.forSale[3];
                        updateStatusBar("You bought the "+shopItem4.name+"!");

                        rmBuildRoom(dungeon.getCurrentRoom);
                        rmBuildStats(player);
                        rmBuildInventory(player);
                    } else if (shopItem4 instanceof Consumable) {
                        if (player.inventory.length < 8) { //has room
                            player.addToInventory = shopItem4;
                            player.gold -= shopItem4.value;
                            delete dungeon.getCurrentRoom.forSale[3];
                            updateStatusBar("You bought the "+shopItem4.name+"!");

                            rmBuildRoom(dungeon.getCurrentRoom);
                            rmBuildStats(player);
                            rmBuildInventory(player);
                        } else { //no room
                            updateStatusBar("You have no room in your inventory!");
                        }
                    }
                } else {
                    updateStatusBar("You can't afford this "+shopItem4.name+"... It costs "+shopItem4.value+" gold.");
                }
            });

            let doctorCost = 10;

            doctor.off().on("mouseenter",()=>{ //doctor logic
                if (player.health < player.maxHealth) {
                    updateStatusBar("\"You're not lookin' too hot there, champ. I can fix you up for, say, "+doctorCost+" gold.\"");
                } else {
                    updateStatusBar("\"It looks to me like there's nothing I can do for you.\"");
                }
            }).on("click",()=>{
                if (player.health < player.maxHealth) {
                    if (player.gold >= doctorCost) {
                        updateStatusBar("\"There, good as new!\"");
                        player.gold-=doctorCost;
                        player.healFull();
                        rmBuildStats(player);
                    } else {
                        updateStatusBar("\"Sorry kid, I don't work for free.\"");
                    }
                } else {
                    updateStatusBar("\"It looks to me like there's nothing I can do for you.\"");
                }
            });

            shopkeeper.off().on("mouseenter",()=>{
                updateStatusBar("\"What're you lookin' at, punk?\"");
            }).on("click",()=>{
                updateStatusBar("\"Hands off! I'm not for sale!\"");
            });
            break;
        case "boss":
            if (dungeon.getCurrentRoom instanceof BossRoom) {
                let monsters = dungeon.getCurrentRoom.getBoss;
                console.log("Current room monsters: " + JSON.stringify(monsters, null, 2)); // Debugging purpose

                combatManager.setEnemies(monsters);

                // Start combat
                combatManager.startCombat();
            }

            monsterButtons = $(".bossEnemyDiv button").toArray();

            // Remove old event listeners
            monsterButtons.forEach((button, index) => {
                $(button).off("click");
            });

            // Attach event listeners to monsters
            monsterButtons.forEach((button) => {
                $(button).on("click", () => {
                    const targetMonster = combatManager.enemies[index];
                    console.log("Clicked index: " + index); // Debugging purpose
                    if (targetMonster.health > 0) {
                        combatManager.playerAttack(index);
                    }
                    rmBuildRoom(dungeon.getCurrentRoom); // update room
                });
            });

            // Monitor combat status
            combatCheckInterval = setInterval(() => {
                if (combatManager.isCombatOver()) {
                    clearInterval(combatCheckInterval);
                    if (dungeon.getCurrentRoom.isCleared()) {
                        rmBuildRoom(dungeon.getCurrentRoom);
                    }
                } else if (combatManager.turn === "enemies") {
                    combatManager.enemyAttack();
                }
            }, 100); // Check every 100ms

            break;
    }
}

// dungeon initialization
let dungeon = new Dungeon(generateRooms(1),1,0);

// initialize room
initRoom(true);

// go to next room
// TODO: ONLY ALLOW PASSAGE TO NEXT ROOM IF CURRENT ROOM IS CLEARED
$(".doorDiv button").on("click", () => {
    initRoom(false)
    
    /* USE THIS CODE INSTEAD ONCE BATTLE SYSTEM IS FUNCTIONAL
    if (dungeon.getCurrentRoom.type === "monster" || dungeon.getCurrentRoom.type === "boss") {
        if (dungeon.getCurrentRoom.isCleared()) {
            initRoom(false)
            }
            } else {
                initRoom(false)
        }
        */
    });

$("#viewEquip").on("click", ()=>{
    rmBuildEquip(player);
});

$("#returnToGame").on("click", ()=>{
    $("#gameWrapper").removeClass("hide");
    $("#equipmentDiv").addClass("hide");
});
