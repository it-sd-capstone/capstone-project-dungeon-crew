import { BaseItem, Equipment } from "./classes";

export enum ItemType {
  RustyDagger = "Rusty Dagger",
  Whip = "Whip",
  Bow = "Bow",
  RabbitsFoot = "Rabbit's Foot",
  SturdyBoots = "Study Boots",
  Shield = "Shield"
}

export class ItemFactory {
  static createItem(type: ItemType): BaseItem {
    switch (type) {
      case ItemType.RustyDagger:
        return new Equipment(
          ItemType.RustyDagger,
          10,                               // Value
          "../img/items/rusty-dagger.png",  // Sprite
          2,                                // Attack Mod
          0,                                // Defense Mod
          0,                                // Health Mod
          () => {},                         // Attack Script
          () => {}                          // Hurt Script
        );

      case ItemType.Whip:
        return new Equipment(
          ItemType.Whip,
          15,
          "../img/items/whip.png",
          1,
          0,
          0,
          () => {},
          (target) => {
            target.extraDamage = (target.extraDamage || 0) + 1;
          }
        );

      case ItemType.Bow:
        return new Equipment(
          ItemType.Bow,
          25,
          "../img/items/bow.png",
          2,
          0,
          0,
          (target) => {
            const randomEnemy = target.enemies[Math.floor(Math.random() * target.enemies.length)];
            randomEnemy.health - 4;
          },
          () => {}
        );

      case ItemType.RabbitsFoot:
        return new Equipment(
          ItemType.RabbitsFoot,
          15,
          "../img/items/rabbits-foot.png",
          0,
          0,
          0,
          () => {},
          (target) => {
            if (Math.random() < 0.1) {
              target.isDodged = true;
            }
          }
        );

      case ItemType.SturdyBoots:
        return new Equipment(
          ItemType.SturdyBoots,
          15,
          "../img/items/sturdy-boots.png",
          0,
          2,
          0,
          () => {},
          () => {}
        );

      case ItemType.Shield:
        return new Equipment(
          ItemType.Shield,
          20,
          "../img/items/shield.png",
          0,
          4,
          0,
          () => {},
          () => {}
        );

      default:
        throw new Error(`Unknown item type: ${type}`);
    }
  }
}