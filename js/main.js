import { rmBuildSampleMonster, rmBuildSampleItem, rmBuildSampleShop, rmBuildSampleBoss } from "./roommanager.js";
import { Room, BossRoom, ShopRoom, ItemRoom, MonsterRoom, Boss, Item, Monster, Creature, Dungeon, Player, Equipment, Consumable } from "./classes.js";

// Generate Dungeon

function generateRooms(difficulty) {
    let roomCount = Math.round(8*difficulty); // total rooms in current dungeon layout
    let roomCountMod = roomCount-2; // total rooms minus boss and shop
    const itemRatio = 0.25; // how many item rooms there are compared to monster rooms
    let itemRooms = Math.round(roomCountMod*itemRatio);
    let monsterRooms = roomCountMod-itemRooms;

    let rooms = new Array();

    // CURRENTLY USING PLACEHOLDER VALUES!
    // !! TODO replace with normal values once implemented. !!
    let testItem = new Item("test item",1,"img/monsters/crime-slime.gif");
    let testMonster = new Monster("test slime",1,"img/monsters/crime-slime.gif");

    let bossRoom = new BossRoom("boss",new Boss(5,5,1,1,"test boss","img/monsters/crime-slime.gif",testItem),false);
    rooms[roomCount-1] = bossRoom; // last room = boss room

    let shopRoom = new ShopRoom("shop",[testItem,testItem,testItem,testItem]);
    rooms[roomCount-2] = shopRoom; // second to last room = shop

    let remainingRooms = new Array();
    for (var i = 0; i < roomCountMod; i++) { remainingRooms.push(i) } // generate all remaining room numbers

    for (var i = 0; i < itemRooms; i++) { // randomly select and generate item rooms
        let randSelect = Math.floor(Math.random()*remainingRooms.length);
        let newIndex = remainingRooms[randSelect];
        remainingRooms.splice(randSelect,1);
        rooms[newIndex] = new ItemRoom("item",testItem,false);
    }

    for (var i = 0; i < remainingRooms.length; i++) { // fill remaining rooms with monsters
        let monsterCount = Math.floor(Math.random()*3)+1;
        let monsters = new Array();
        for (var j = 0; j < monsterCount; j++) {
            monsters.push(testMonster);
        }

        rooms[remainingRooms[i]] = new MonsterRoom("monster",monsters,false);
    }

    return rooms;
}

let dungeon = new Dungeon(generateRooms(1),1,0)