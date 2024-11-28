import { Equipment } from "./classes.js";
export var ItemType;
(function (ItemType) {
    ItemType["RustyDagger"] = "Rusty Dagger";
    ItemType["Whip"] = "Whip";
    ItemType["Bow"] = "Bow";
    ItemType["RabbitsFoot"] = "Rabbit's Foot";
    ItemType["SturdyBoots"] = "Sturdy Boots";
    ItemType["Shield"] = "Shield";
})(ItemType || (ItemType = {}));
export class ItemFactory {
    static createItem(type) {
        switch (type) {
            case ItemType.RustyDagger:
                return new Equipment(ItemType.RustyDagger, // Name
                10, // Value
                "../img/items/placeholder.png", // Sprite
                2, // Attack Mod
                0, // Defense Mod
                0, // Health Mod
                () => { }, // Attack Script
                () => { } // Hurt Script
                );
            case ItemType.Whip:
                return new Equipment(ItemType.Whip, // Name
                15, // Value
                "../img/items/placeholder.png", // Sprite
                1, // Attack Mod
                0, // Defense Mod
                0, // Health Mod
                () => { }, // Attack Script
                (target) => {
                    target.extraDamage = (target.extraDamage || 0) + 1;
                });
            case ItemType.Bow:
                return new Equipment(ItemType.Bow, // Name
                25, // Value
                "../img/items/placeholder.png", // Sprite
                2, // Attack Mod
                0, // Defense Mod
                0, // Health Mod
                (target) => {
                    if (target.enemies && target.enemies.length > 0) {
                        const randomEnemy = target.enemies[Math.floor(Math.random() * target.enemies.length)];
                        randomEnemy.health -= 4;
                    }
                }, () => { } // Hurt Script
                );
            case ItemType.RabbitsFoot:
                return new Equipment(ItemType.RabbitsFoot, // Name
                15, // Value
                "../img/items/placeholder.png", // Sprite
                0, // Attack Mod
                0, // Defense Mod
                0, // Health Mod
                () => { }, // Attack Script
                (target) => {
                    if (Math.random() < 0.1) {
                        target.isDodged = true;
                    }
                });
            case ItemType.SturdyBoots:
                return new Equipment(ItemType.SturdyBoots, // Name
                15, // Value
                "../img/items/placeholder.png", // Sprite
                0, // Attack Mod
                2, // Defense Mod
                0, // Health Mod
                () => { }, // Attack Script
                () => { } // Hurt Script
                );
            case ItemType.Shield:
                return new Equipment(ItemType.Shield, // Name
                20, // Value
                "../img/items/placeholder.png", // Sprite
                0, // Attack Mod
                4, // Defense Mod
                0, // Health Mod
                () => { }, // Attack Script
                () => { } // Hurt Script
                );
            default:
                throw new Error(`Unknown item type: ${type}`);
        }
    }
}
