"use strict";
// 
// Creatures
// 
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dungeon = exports.ItemRoom = exports.MonsterRoom = exports.BossRoom = exports.ShopRoom = exports.Room = exports.Equipment = exports.Consumable = exports.Item = exports.Boss = exports.Monster = exports.Player = exports.Creature = void 0;
class Creature {
    constructor(health, maxHealth, attack, defense) {
        this.health = health;
        this.maxHealth = maxHealth;
        this.attack = attack;
        this.defense = defense;
    }
    takeDamage(damage) {
        this.health = damage / (this.defense + 100 / 100); // Test
    }
    get getAttack() {
        return this.attack;
    }
    get getDefense() {
        return this.defense;
    }
    get getHealth() {
        return this.health;
    }
    get getMaxHealth() {
        return this.maxHealth;
    }
    set heal(healAmount) {
        this.health = +healAmount;
    }
    healFull() {
        this.health = this.maxHealth;
    }
}
exports.Creature = Creature;
class Player extends Creature {
    constructor(health, maxHealth, attack, defense, gold, inventory, equipped) {
        super(health, maxHealth, attack, defense);
        this.gold = gold;
        this.inventory = inventory;
        this.equipped = equipped;
    }
    get getGold() {
        return this.gold;
    }
    set addGold(goldAmount) {
        this.gold = +goldAmount;
    }
    set removeGold(goldAmount) {
        this.gold = -goldAmount;
    }
    get getInventory() {
        return this.inventory;
    }
    set addToInventory(consumable) {
        this.inventory.push(consumable);
    }
    set removeFromInventory(consumable) {
        let itemIndex = this.inventory.findIndex(consumable);
        this.inventory.splice(itemIndex, 1);
    }
    get getEquipment() {
        return this.equipped;
    }
    set addToEquipment(equipment) {
        this.equipped.push(equipment);
    }
    set removeFromEquipment(equipment) {
        let itemIndex = this.equipped.findIndex(equipment);
        this.equipped.splice(itemIndex, 1);
    }
}
exports.Player = Player;
class Monster extends Creature {
    constructor(health, maxHealth, attack, defense, name, sprite) {
        super(health, maxHealth, attack, defense);
        this.name = name;
        this.sprite = sprite;
    }
    get getSprite() {
        return this.sprite;
    }
    get getName() {
        return this.name;
    }
}
exports.Monster = Monster;
class Boss extends Monster {
    constructor(health, maxHealth, attack, defense, name, sprite, itemDrop) {
        super(health, maxHealth, attack, defense, name, sprite);
        this.itemDrop = itemDrop;
    }
    get getDrop() {
        return this.itemDrop;
    }
}
exports.Boss = Boss;
// 
// Items
// 
class Item {
    constructor(name, value, sprite) {
        this.name = name;
        this.value = value;
        this.sprite = sprite;
    }
}
exports.Item = Item;
class Consumable extends Item {
    constructor(name, value, sprite, effect) {
        super(name, value, sprite);
        this.effect = effect;
    }
    useItem() {
        this.effect();
    }
}
exports.Consumable = Consumable;
class Equipment extends Item {
    constructor(name, value, sprite, attackMod, defenseMod, healthMod, attackScript, hurtScript) {
        super(name, value, sprite);
        this.attackMod = attackMod;
        this.defenseMod = defenseMod;
        this.healthMod = healthMod;
        this.attackScript = attackScript; // Test
        this.hurtScript = hurtScript; // Test
    }
    get getAtkMod() {
        return this.attackMod;
    }
    get getDefMod() {
        return this.defenseMod;
    }
    get getHealtMod() {
        return this.healthMod;
    }
    executeAttack() {
        this.attackScript;
    }
    executeHurt() {
        this.hurtScript;
    }
}
exports.Equipment = Equipment;
// 
// Rooms
// 
class Room {
    constructor(type) {
        this.type = type;
    }
    get getType() {
        return this.type;
    }
}
exports.Room = Room;
class ShopRoom extends Room {
    constructor(type, forSale) {
        super(type);
        this.forSale = forSale;
    }
    get getForSale() {
        return this.forSale;
    }
}
exports.ShopRoom = ShopRoom;
class BossRoom extends Room {
    constructor(type, boss, cleared) {
        super(type);
        this.boss = boss;
        this.cleared = cleared;
    }
    get getBoss() {
        return this.boss;
    }
    get isCleared() {
        return this.cleared;
    }
}
exports.BossRoom = BossRoom;
class MonsterRoom extends Room {
    constructor(type, monsters, cleared) {
        super(type);
        this.monsters = monsters;
        this.cleared = cleared;
    }
    get getMonsters() {
        return this.monsters;
    }
    get isCleared() {
        return this.cleared;
    }
}
exports.MonsterRoom = MonsterRoom;
class ItemRoom extends Room {
    constructor(type, item, taken) {
        super(type);
        this.item = item;
        this.taken = taken;
    }
    get getItem() {
        return this.item;
    }
    get isTaken() {
        return this.taken;
    }
}
exports.ItemRoom = ItemRoom;
class Dungeon {
    constructor(rooms, difficultyMultiplier, currentRoomIndex) {
        this.rooms = rooms;
        this.difficultyMultiplier = difficultyMultiplier;
        this.currentRoomIndex = currentRoomIndex;
    }
    get getRooms() {
        return this.rooms;
    }
    get getCurrentRoom() {
        return this.rooms[this.currentRoomIndex];
    }
    get getDifficulty() {
        return this.difficultyMultiplier;
    }
    set setDifficulty(difficulty) {
        this.difficultyMultiplier = difficulty;
    }
}
exports.Dungeon = Dungeon;
