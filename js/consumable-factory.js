import { Player, Monster, Boss, Consumable } from "./classes.js";
export var ConsumableType;

// Finish up the combat system
// Allow the player to use consumables out of battle (and in obviously)

(function (ConsumableType) {
    ConsumableType["LesserHealingPotion"] = "Lesser Healing Potion";
    ConsumableType["GreaterHealingPotion"] = "Greater Healing Potion";
    ConsumableType["BlizzardScroll"] = "Blizzard Scroll";
    ConsumableType["FireballScroll"] = "Fireball Scroll";
    ConsumableType["Bomb"] = "Bomb";
    ConsumableType["SuperiorHealingPotion"] = "Superior Healing Potion";
})(ConsumableType || (ConsumableType = {}));
export class ConsumableFactory {
    static createConsumable(type) {
        switch (type) {
            case ConsumableType.LesserHealingPotion:
                return new Consumable(
                    ConsumableType.LesserHealingPotion, // Name
                    10, // Value
                    "../img/consumables/lesser-healing-potion.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    () => { }, // Attack Script
                    (target) => {
                        const healAmount = Math.floor(target.getMaxHealth() * 0.5);
                        target.heal(healAmount);
                        if (target.health > target.getMaxHealth()) {
                            target.health = target.getMaxHealth();
                        }
                     } // Hurt Script
                );
            case ConsumableType.GreaterHealingPotion:
                return new Consumable(
                    ConsumableType.GreaterHealingPotion, // Name
                    15, // Value
                    "../img/consumables/greater-healing-potion.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    () => { }, // Attack Script
                    (target) => {
                        target.healFull();
                    }
                );
            case ConsumableType.BlizzardScroll:
                return new Consumable(
                    ConsumableType.BlizzardScroll, // Name
                    25, // Value
                    "../img/consumables/blizzard-scroll.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    (target) => {
                        target.enemies.forEach((enemy) => {
                            enemy.takeDamage(target.getAttack());
                        });
                    }, 
                    () => { } // Hurt Script
                );
            case ConsumableType.FireballScroll:
                return new Consumable(
                    ConsumableType.FireballScroll, // Name
                    15, // Value
                    "../img/consumables/fireball-scroll.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    (target) => {
                        target.enemy.takeDamage(target.getAttack() * 2);
                    }, // Attack Script
                    () => { } // Hurt Script
                );
            case ConsumableType.Bomb:
                return new Consumable(
                    ConsumableType.Bomb, // Name
                    15, // Value
                    "../img/consumables/bomb.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    (target) => {
                        target.enemies.forEach((enemy) => {
                            enemy.takeDamage(25);
                        });
                     }, // Attack Script
                    () => { } // Hurt Script
                );
            case ConsumableType.SuperiorHealingPotion:
                return new Consumable(
                    ConsumableType.SuperiorHealingPotion, // Name
                    20, // Value
                    "../img/consumables/superior-healing-potion.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    () => { }, // Attack Script
                    (target) => {
                        const healAmount = Math.floor(target.getMaxHealth() * 1.5);
                        target.heal(healAmount);
                     } // Hurt Script
                );
            default:
                throw new Error(`Unknown consumable type: ${type}`);
        }
    }
}
