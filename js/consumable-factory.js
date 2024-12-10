import { Player, Monster, Boss, Consumable } from "./classes.js";
import {calcDamage, updateStatusBar} from "./combat-manager.js";
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
    ConsumableType["LightningScroll"] = "Lightning Scroll";
})(ConsumableType || (ConsumableType = {}));
export class ConsumableFactory {
    static createConsumable(type) {
        switch (type) {
            case ConsumableType.LesserHealingPotion:
                return new Consumable(
                    ConsumableType.LesserHealingPotion, // Name
                    10, // Value
                    "img/items/lesser-healing-potion.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    () => { }, // Attack Script
                    (target) => {
                        const healAmount = Math.floor(target.player.getMaxHealth * 0.5);
                        target.player.heal(healAmount);

                     } // Hurt Script
                );
            case ConsumableType.GreaterHealingPotion:
                return new Consumable(
                    ConsumableType.GreaterHealingPotion, // Name
                    15, // Value
                    "img/items/greater-healing-potion.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    () => { }, // Attack Script
                    (target) => {
                        target.player.healFull();
                    }
                );
            case ConsumableType.BlizzardScroll:
                return new Consumable(
                    ConsumableType.BlizzardScroll, // Name
                    25, // Value
                    "img/items/blizzard-scroll.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    (target) => {
                        target.enemies.forEach(enemy => {
                            let damage = calcDamage(target.player.attack,enemy.defense);
                            enemy.health-=damage;
                        });
                        updateStatusBar(`Blizzard Scroll deals ${target.player.attack} damage to all enemies!`)
                    }, 
                    () => { } // Hurt Script
                );
            case ConsumableType.FireballScroll:
                return new Consumable(
                    ConsumableType.FireballScroll, // Name
                    25, // Value
                    "img/items/fireball-scroll.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    (target) => {
                        if (target.enemies && target.enemies.length > 0) {
                            const aliveEnemies = target.enemies.filter(enemy => enemy.health > 0);
                            if (aliveEnemies.length > 0) {
                                const randomEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
                                let damage = calcDamage(target.player.attack*3,randomEnemy.defense);
                                randomEnemy.health -= damage;
                                updateStatusBar(`Fireball Scroll deals ${damage} to ${randomEnemy.name}!`);
                            }
                        }
                    }, // Attack Script
                    () => { } // Hurt Script
                );
            case ConsumableType.Bomb:
                return new Consumable(
                    ConsumableType.Bomb, // Name
                    15, // Value
                    "img/items/bomb.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    (target) => {
                        target.enemies.forEach(enemy => {
                            let damage = calcDamage(25,enemy.defense);
                            enemy.health -= damage;
                        });

                        updateStatusBar("Bomb deals 25 damage to all enemies!")
                     }, // Attack Script
                    () => { } // Hurt Script
                );
            case ConsumableType.SuperiorHealingPotion:
                return new Consumable(
                    ConsumableType.SuperiorHealingPotion, // Name
                    30, // Value
                    "img/items/superior-healing-potion.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    () => { }, // Attack Script
                    (target) => {
                        const healAmount = Math.floor(target.player.getMaxHealth * 1.5);
                        target.player.health = healAmount;
                     } // Hurt Script
                );
            case ConsumableType.LightningScroll:
                return new Consumable(
                    ConsumableType.LightningScroll, // Name
                    20, // Value
                    "img/items/lightning-scroll.png", // Sprite
                    0, // Attack Mod
                    0, // Defense Mod
                    0, // Health Mod
                    () => { }, // Attack Script
                    (target) => {
                        if (target.enemies && target.enemies.length > 0) {
                            const aliveEnemies = target.enemies.filter(enemy => enemy.health > 0);
                            aliveEnemies.forEach(enemy => {
                                if (Math.random() < 0.66) {
                                    let damage = calcDamage(target.player.attack*2,enemy.defense)
                                    enemy.health -= damage;

                                    updateStatusBar(`Lightning Scroll deals ${damage} damage to ${enemy.name}!`)
                                }
                            });
                        }
                    } // Hurt Script
                );
            default:
                throw new Error(`Unknown consumable type: ${type}`);
        }
    }
}
