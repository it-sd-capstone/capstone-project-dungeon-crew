import { updateStatusBar } from "./combat-manager";
// 
// Creatures
// 

export class Creature {
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  dodgeChance: number;
  isDodged: boolean;

  constructor(
    health: number,
    maxHealth: number,
    attack: number,
    defense: number,
    dodgeChance: number = 0.1,
  ) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.attack = attack;
    this.defense = defense;
    this.dodgeChance = dodgeChance;
    this.isDodged = false;
  }

  public dodgeAttack(): boolean {
    const random = Math.random();
    this.isDodged = random < this.dodgeChance;
    return this.isDodged;
  }

  public takeDamage(damage: number): void {
    const damageAfterDefense = damage * (1 - this.defense / 100); // Test
    if (this.isDodged) {
      updateStatusBar("Attack dodged!");
      return;
    }
    this.health = Math.max(this.health - damageAfterDefense, 0);
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

  public set heal(healAmount: number) {
    this.health += healAmount;
  }

  public healFull(): void {
    this.health = this.maxHealth;
  }
}

export class Player extends Creature {
  gold: number;
  inventory: BaseItem[];
  equipped: Equipment[];

  constructor(
    health: number,
    maxHealth: number,
    attack: number,
    defense: number,
    gold: number,
    inventory: BaseItem[],
    equipped: Equipment[],
    dodgeChance: number = 0.2
  ) {
    super(health, maxHealth, attack, defense, dodgeChance);
    this.gold = gold;
    this.inventory = inventory;
    this.equipped = equipped;
  }

  public get getGold(): number {
    return this.gold;
  }

  public set addGold(goldAmount: number) {
    this.gold += goldAmount;
  }

  public set removeGold(goldAmount: number) {
    this.gold -= goldAmount;
  }

  public get getInventory(): BaseItem[] {
    return this.inventory;
  }

  public set addToInventory(consumable: BaseItem) {
    this.inventory.push(consumable);
  }

  public set removeFromInventory(consumable: BaseItem) {
    const itemIndex = this.inventory.findIndex(item => item === consumable);
    if (itemIndex !== -1) {
      this.inventory.splice(itemIndex, 1);
    }
  }

  public get getEquipment(): Equipment[] {
    return this.equipped;
  }

  public set addToEquipment(equipment: Equipment) {
    this.equipped.push(equipment);
  }

  public set removeFromEquipment(equipment: Equipment) {
    const itemIndex = this.equipped.findIndex(item => item === equipment);
    if (itemIndex !== -1) {
      this.equipped.splice(itemIndex, 1);
    }
  }
}

export class Monster extends Creature {
  name: string;
  sprite: string;

  constructor(
    health: number,
    maxHealth: number,
    attack: number,
    defense: number,
    name: string,
    sprite: string,
    dodgeChance: number = 0.05
  ) {
    super(health, maxHealth, attack, defense, dodgeChance);
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

export class Boss extends Monster {
  itemDrops: BaseItem[];

  constructor(
    health: number,
    maxHealth: number,
    attack: number,
    defense: number,
    name: string,
    sprite: string,
    itemDrops: BaseItem[],
    dodgeChance: number = 0.1
  ) {
    super(health, maxHealth, attack, defense, name, sprite, dodgeChance);
    this.itemDrops = itemDrops;
  }

  public get getRandomDrop(): BaseItem {
    const randomIndex = Math.floor(Math.random() * this.itemDrops.length);
    return this.itemDrops[randomIndex];
  }
}

// 
// Items
// 

export abstract class BaseItem {

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

  abstract applyEffect(target: any): void; 
}

export class Consumable extends BaseItem {
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

    applyEffect(target: any): void {
        this.effect();
    }
}

export class Equipment extends BaseItem {
  attackMod: number;
  defenseMod: number;
  healthMod: number;
  attackScript: (target?: any) => void; // Test
  hurtScript: (target?: any) => void; // Test

  constructor(
    name: string,
    value: number,
    sprite: string,
    attackMod: number,
    defenseMod: number,
    healthMod: number,
    attackScript: (target?: any) => void,
    hurtScript: (target?: any) => void
  ) {
    super(name, value, sprite);
    this.attackMod = attackMod;
    this.defenseMod = defenseMod;
    this.healthMod = healthMod;
    this.attackScript = attackScript; // Test
    this.hurtScript = hurtScript; // Test
  }

  applyEffect(target: any): void {
      target.attack += this.attackMod;
      target.defense += this.defenseMod;
      target.health += this.healthMod;
      this.attackScript();
  }
}

// 
// Rooms
// 

export class Room {
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

export class ShopRoom extends Room {
  forSale: BaseItem[];

  constructor(
    type: string,
    forSale: BaseItem[]
  ) {
    super(type);
    this.forSale = forSale;
  }

  public get getForSale(): BaseItem[] {
    return this.forSale;
  }
}

export class BossRoom extends Room {
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

export class MonsterRoom extends Room {
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

export class ItemRoom extends Room {
  item: BaseItem;
  taken: Boolean;

  constructor(
    type: string,
    item: BaseItem,
    taken: Boolean
  ){
    super(type);
    this.item = item;
    this.taken = taken;
  }

  public get getItem(): BaseItem {
    return this.item;
  }

  public get isTaken(): Boolean {
    return this.taken;
  }
}

export class Dungeon {
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