import './jquery-3.7.1.min.js'
import {
    rmBuildSampleMonster,
    rmBuildSampleItem,
    rmBuildSampleShop,
    rmBuildSampleBoss,
    rmBuildRoom
} from "./roommanager.js";
import { Room, BossRoom, ShopRoom, ItemRoom, MonsterRoom, Boss, BaseItem, Monster, Creature, Dungeon, Player, Equipment, Consumable } from "./classes.js";
import {ItemFactory, ItemType} from './item-factory.js';
import {EnemyFactory, EnemyType} from "./monster-factory.js";

// Generate Dungeon

function generateRooms(difficulty) {
    let roomCount = Math.round(8*difficulty); // total rooms in current dungeon layout
    let roomCountMod = roomCount-2; // total rooms minus boss and shop
    const itemRatio = 0.25; // how many item rooms there are compared to monster rooms
    let itemRooms = Math.round(roomCountMod*itemRatio);

    let rooms = [];


    // !! TODO add more items to pools once implemented. !!
    let testConsume = new Consumable("Test Potion",10,"../img/items/placeholder.png",() => {})

    let shopEquipPool = [ItemType.Bow,ItemType.Whip,ItemType.Shield];
    let shopConsumePool = [];
    let itemPool = [ItemType.RabbitsFoot,ItemType.RustyDagger,ItemType.Shield];

    // Build Monster Pool
    let monsterPool = [EnemyType.Seeker];

    if (difficulty >= 1) {
        monsterPool.push(EnemyType.CrimeSlime);
    }
    if (difficulty >= 1.25) {
        monsterPool.push(EnemyType.Snobgoblin);
    }
    if (difficulty >= 1.5) {
        monsterPool.push(EnemyType.LazyBones);
    }
    if (difficulty >= 1.75) {
        monsterPool.push(EnemyType.HungryGhost);
    }


    let bossRoom = new BossRoom("boss",new Boss(5,5,1,1,"test boss","img/monsters/crime-slime.gif",testConsume),false);
    rooms[roomCount-1] = bossRoom; // last room = boss room

    let sItem1 = ItemFactory.createItem(shopEquipPool[Math.floor(Math.random()*shopEquipPool.length)]);
    let sItem2 = ItemFactory.createItem(shopEquipPool[Math.floor(Math.random()*shopEquipPool.length)]);
    let sItem3 = testConsume;
    let sItem4 = testConsume;

    let shopRoom = new ShopRoom("shop",[sItem1,sItem2,sItem3,sItem4]);
    rooms[roomCount-2] = shopRoom; // second to last room = shop

    let remainingRooms = [];
    for (let i = 0; i < roomCountMod; i++) { remainingRooms.push(i) } // generate all remaining room numbers

    for (let i = 0; i < itemRooms; i++) { // randomly select and generate item rooms
        let randSelect = Math.floor(Math.random()*remainingRooms.length);
        let newIndex = remainingRooms[randSelect];
        remainingRooms.splice(randSelect,1);
        let rewardItem = ItemFactory.createItem(itemPool[Math.floor(Math.random()*itemPool.length)])
        rooms[newIndex] = new ItemRoom("item",rewardItem,false, false);
    }

    for (let i = 0; i < remainingRooms.length; i++) { // fill remaining rooms with monsters
        let monsterCount = Math.floor(Math.random()*3)+1;
        let monsters = [];
        for (let j = 0; j < monsterCount; j++) {
            monsters.push(EnemyFactory.createEnemy(monsterPool[Math.floor(Math.random()*monsterPool.length)],difficulty));
        }

        rooms[remainingRooms[i]] = new MonsterRoom("monster",monsters,false);
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

    switch (dungeon.getCurrentRoom.getType) { // room type initialization
        case "monster":

            break;
        case "item":

            break;
        case "shop":

            break;
        case "boss":

            break;
    }
}

// dungeon initialization
let dungeon = new Dungeon(generateRooms(1),1,0);
initRoom(true);

// player initialization
let player = new Player(25,25,5,0,0,[],[], 0);

// go to next room
// TODO: ONLY ALLOW PASSAGE TO NEXT ROOM IF CURRENT ROOM IS CLEARED
$(".doorDiv button").on("click", () => {initRoom(false)});