// 
// Creatures
// 

class Creature {
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;

  constructor(
    health: number,
    maxHealth: number,
    attack: number,
    defense: number
  ) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.attack = attack;
    this.defense = defense;
  }

  public takeDamage(damage): void {
    this.health = damage / (this.defense + 100 / 100); // Test
  }

  public get getAttack(): number {
    return this.attack;
  }

  public get getDefense(): number {
    return this.defense;
  }

  public get getHealth(): number {
    return this.health;
  }

  public get getMaxHealth(): number {
    return this.maxHealth;
  }

  public set heal(healAmount) {
    this.health =+ healAmount;
  }

  public healFull(): void {
    this.health = this.maxHealth;
  }
}

class Player extends Creature {
  gold: number;
  inventory: Item[];
  equipped: Equipment[];

  constructor(
    health: number,
    maxHealth: number,
    attack: number,
    defense: number,
    gold: number,
    inventory: Item[],
    equipped: Equipment[]
  ) {
    super(health, maxHealth, attack, defense);
    this.gold = gold;
    this.inventory = inventory;
    this.equipped = equipped;
  }

  public get getGold(): number {
    return this.gold;
  }

  public set addGold(goldAmount) {
    this.gold =+ goldAmount;
  }

  public set removeGold(goldAmount) {
    this.gold =- goldAmount;
  }

  public get getInventory(): Item[] {
    return this.inventory;
  }

  public set addToInventory(consumable) {
    this.inventory.push(consumable);
  }

  public set removeFromInventory(consumable) {
    let itemIndex = this.inventory.findIndex(consumable);
    this.inventory.splice(itemIndex, 1);
  }

  public get getEquipment(): Equipment[] {
    return this.equipped;
  }

  public set addToEquipment(equipment) {
    this.equipped.push(equipment);
  }

  public set removeFromEquipment(equipment) {
    let itemIndex = this.equipped.findIndex(equipment);
    this.equipped.splice(itemIndex, 1);
  }


}

class Monster extends Creature {
  name: string;
  sprite: string;

  constructor(
    health: number,
    maxHealth: number,
    attack: number,
    defense: number,
    name: string,
    sprite: string
  ) {
    super(health, maxHealth, attack, defense);
    this.name = name;
    this.sprite = sprite;
  }

  public get getSprite(): string {
    return this.sprite;
  }

  public get getName(): string {
    return this.name;
  }
}

class Boss extends Monster {
  itemDrop: string;

  constructor(
    health: number,
    maxHealth: number,
    attack: number,
    defense: number,
    name: string,
    sprite: string
  ) {
    super(health, maxHealth, attack, defense, name, sprite);
    this.itemDrop = this.itemDrop;
  }

  public get getDrop(): string {
    return this.itemDrop;
  }
}

// 
// Items
// 

class Item {
  name: string;
  value: number;
  sprite: string;
  
  constructor(
    name: string,
    value: number,
    sprite: string
  ) {
    this.name = name;
    this.value = value;
    this.sprite = sprite;
  }
}

class Consumable extends Item {
    effect: () => void; // Test

    constructor(
      name: string,
      value: number,
      sprite: string,
      effect: () => void
    ) {
      super(name, value, sprite);
      this.effect = effect;
    }

    useItem(): void { // Test
      this.effect();
    }
}

class Equipment extends Item {
  attackMod: number;
  defenseMod: number;
  healthMod: number;
  attackScript: () => void; // Test
  hurtScript: () => void; // Test

  constructor(
    name: string,
    value: number,
    sprite: string,
    attackMod: number,
    defenseMod: number,
    healthMod: number,
    attackScript: () => void,
    hurtScript: () => void
  ) {
    super(name, value, sprite);
    this.attackMod = attackMod;
    this.defenseMod = defenseMod;
    this.healthMod = healthMod;
    this.attackScript = attackScript; // Test
    this.hurtScript = hurtScript; // Test
  }

  public get getAtkMod() {
    return this.attackMod;
  }

  public get getDefMod() {
    return this.defenseMod;
  }

  public executeAttack(): void { // Test
    this.attackScript;
  }
  public executeHurt(): void { // Test
    this.hurtScript;
  }
}

// 
// Rooms
// 

class Room {
  type: string;

  constructor(
    type: string
  ) {
    this.type = type;
  }

  public get getType(): string {
    return this.type;
  }
}

class ShopRoom extends Room {
  forSale: Item[];

  constructor(
    type: string,
    forSale: Item[]
  ) {
    super(type);
    this.forSale = forSale;
  }

  public get getForSale(): Item[] {
    return this.forSale;
  }
}

class BossRoom extends Room {
  boss: Boss;
  cleared: Boolean;

  constructor(
    type: string,
    boss: Boss,
    cleared: Boolean
  ) {
    super(type);
    this.boss = boss;
    this.cleared = cleared;
  }

  public get getBoss(): Boss {
    return this.boss;
  }

  public get isCleared(): Boolean {
    return this.cleared;
  }
}

class MonsterRoom extends Room {
  monsters: Monster[];
  cleared: Boolean;

  constructor(
    type: string,
    monsters: Monster[],
    cleared: Boolean
  ) {
    super(type);
    this.monsters = monsters;
    this.cleared = cleared;
  }

  public get getMonsters(): Monster[] {
    return this.monsters;
  }

  public get isCleared(): Boolean {
    return this.cleared;
  }
}

class ItemRoom extends Room {
  item: Item;
  taken: Boolean;

  constructor(
    type: string,
    item: Item,
    taken: Boolean
  ){
    super(type);
    this.item = item;
    this.taken = taken;
  }

  public get getItem(): Item {
    return this.item;
  }

  public get isTaken(): Boolean {
    return this.taken;
  }
}

class Dungeon {
  rooms: Room[];
  difficultyMultiplier: number;
  currentRoomIndex: number;

  constructor(
    rooms: Room[],
    difficultyMultiplier: number,
    currentRoomIndex: number
  ) {
    this.rooms = rooms;
    this.difficultyMultiplier = difficultyMultiplier;
    this.currentRoomIndex = currentRoomIndex;
  }

  public get getRooms(): Room[] {
    return this.rooms;
  }

  public get getCurrentRoom(): Room {
    return this.rooms[this.currentRoomIndex];
  }

  public get getDifficulty(): number {
    return this.difficultyMultiplier;
  }

  public set setDifficulty(difficulty) {
    this.difficultyMultiplier = difficulty;
  }
}