// 
// Creatures
// 
export class Creature {
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
export class Player extends Creature {
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
export class Monster extends Creature {
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
export class Boss extends Monster {
    constructor(health, maxHealth, attack, defense, name, sprite, itemDrop) {
        super(health, maxHealth, attack, defense, name, sprite);
        this.itemDrop = itemDrop;
    }
    get getDrop() {
        return this.itemDrop;
    }
}
// 
// Items
// 
export class Item {
    constructor(name, value, sprite) {
        this.name = name;
        this.value = value;
        this.sprite = sprite;
    }
}
export class Consumable extends Item {
    constructor(name, value, sprite, effect) {
        super(name, value, sprite);
        this.effect = effect;
    }
    useItem() {
        this.effect();
    }
}
export class Equipment extends Item {
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
// 
// Rooms
// 
export class Room {
    constructor(type) {
        this.type = type;
    }
    get getType() {
        return this.type;
    }
}
export class ShopRoom extends Room {
    constructor(type, forSale) {
        super(type);
        this.forSale = forSale;
    }
    get getForSale() {
        return this.forSale;
    }
}
export class BossRoom extends Room {
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
export class MonsterRoom extends Room {
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
export class ItemRoom extends Room {
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
export class Dungeon {
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
