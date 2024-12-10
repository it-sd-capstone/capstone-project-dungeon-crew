import { updateStatusBar } from "./combat-manager.js";
// 
// Creatures
// 
export class Creature {
    constructor(health, maxHealth, attack, defense, dodgeChance = 0.1) {
        this.health = Math.round(health);
        this.maxHealth = Math.round(maxHealth);
        this.attack = Math.round(attack);
        this.defense = Math.round(defense);
        this.dodgeChance = dodgeChance;
        this.isDodged = false;
    }
    dodgeAttack() {
        const random = Math.random();
        this.isDodged = random < this.dodgeChance;
        return this.isDodged;
    }
    takeDamage(enemy) {
        const damageAfterDefense = enemy.attack * (1 - this.defense / 100); // Test
        

        if (this.dodgeAttack()) {
            updateStatusBar("Attack dodged!");
            return;
        }

        this.health = Math.max(0, this.health - damageAfterDefense);

        updateStatusBar(`${enemy.name} attacked you for ${damageAfterDefense} damage.`);
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
    heal(healAmount) {
        this.health += healAmount;
    }
    healFull() {
        this.health = this.maxHealth;
    }
}
export class Player extends Creature {
    constructor(health, maxHealth, attack, defense, gold, inventory, equipped, dodgeChance = 0.2) {
        super(health, maxHealth, attack, defense, dodgeChance);
        this.gold = gold;
        this.inventory = inventory;
        this.equipped = equipped;
    }
    get getGold() {
        return this.gold;
    }
    set addGold(goldAmount) {
        this.gold += goldAmount;
    }
    set removeGold(goldAmount) {
        this.gold -= goldAmount;
    }
    get getInventory() {
        return this.inventory;
    }
    set addToInventory(consumable) {
        this.inventory.push(consumable);
    }
    set removeFromInventory(consumable) {
        const itemIndex = this.inventory.findIndex(item => item === consumable);
        if (itemIndex !== -1) {
            this.inventory.splice(itemIndex, 1);
        }
    }
    get getEquipment() {
        return this.equipped;
    }
    set addToEquipment(equipment) {
        if (equipment instanceof Equipment) {
            this.equipped.push(equipment);
            equipment.applyEffect(this);
        }
    }
    set removeFromEquipment(equipment) {
        const itemIndex = this.equipped.findIndex(item => item === equipment);
        if (itemIndex !== -1) {
            this.attack -= equipment.attackMod;
            this.defense -= equipment.defenseMod;
            this.health -= Math.min(this.maxHealth, this.health - equipment.healthMod);
            this.equipped.splice(itemIndex, 1);
        }
    }
}
export class Monster extends Creature {
    constructor(health, maxHealth, attack, defense, name, sprite, dodgeChance = 0.05) {
        super(health, maxHealth, attack, defense, dodgeChance);
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
    constructor(health, maxHealth, attack, defense, name, sprite, itemDrops, dodgeChance = 0.1) {
        super(health, maxHealth, attack, defense, name, sprite, dodgeChance);
        this.itemDrops = itemDrops;
    }
    get getRandomDrop() {
        const randomIndex = Math.floor(Math.random() * this.itemDrops.length);
        return this.itemDrops[randomIndex];
    }
}
// 
// Items
// 
export class BaseItem {
    constructor(name, value, sprite) {
        this.name = name;
        this.value = value;
        this.sprite = sprite;
    }
}
export class Consumable extends BaseItem {
    constructor(name, value, sprite, attackMod, defenseMod, healthMod, attackScript = () => {}, hurtScript = () => {}) {
        super(name, value, sprite);
        this.attackMod = attackMod;
        this.defenseMod = defenseMod;
        this.healthMod = healthMod;
        this.attackScript = attackScript; // Test
        this.hurtScript = hurtScript; // Test
    }
    applyEffect(target) {
        if (this.attackScript) {
            this.attackScript(target);
        } 

        if (this.hurtScript) {
            this.hurtScript(target);
        }
    }
}
export class Equipment extends BaseItem {
    constructor(name, value, sprite, attackMod, defenseMod, healthMod, attackScript = () => {}, hurtScript = () => {}) {
        super(name, value, sprite);
        this.attackMod = attackMod;
        this.defenseMod = defenseMod;
        this.healthMod = healthMod;
        this.attackScript = attackScript; // Test
        this.hurtScript = hurtScript; // Test
    }
    applyEffect(target) {
        target.attack += this.attackMod;
        target.defense += this.defenseMod;

        // Only increase health if healMod is not 0
        target.maxHealth += this.healthMod;
        
        if (this.attackScript) {
            this.attackScript(target);
        }

        if (this.hurtScript) {
            this.hurtScript(target);
        }
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
    removeMonster() {
        if (this.monsters[index]) {
            this.monsters.splice(index, 1);
        }
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
    isCleared() {
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
    isCleared() {
        return this.cleared;
    }
}
export class ItemRoom extends Room {
    constructor(type, item, taken, chestOpen) {
        super(type);
        this.item = item;
        this.taken = taken;
        this.chestOpen = chestOpen;
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

    nextRoom() {
        this.currentRoomIndex++;
    }

    resetRoomIndex() {
        this.currentRoomIndex = 0;
    }

    set setRooms(rooms) {
        this.rooms = rooms;
    }
}
