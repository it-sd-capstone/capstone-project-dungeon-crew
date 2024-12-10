import { Equipment } from "./classes.js";
import { calcDamage, updateStatusBar } from "./combat-manager.js"
export var ItemType;
(function (ItemType) {
    ItemType["RustyDagger"] = "Rusty Dagger";
    ItemType["Whip"] = "Whip";
    ItemType["Bow"] = "Bow";
    ItemType["RabbitsFoot"] = "Rabbit's Foot";
    ItemType["SturdyBoots"] = "Sturdy Boots";
    ItemType["Shield"] = "Shield";
    ItemType["HeartPendant"] = "Heart Pendant";
    ItemType["ChainmailOfVitality"] = "Chainmail of Vitality";
    ItemType["ButterKnife"] = "Butter Knife";
    ItemType["CatONineTails"] = "Cat O' Nine Tails";
    ItemType["VampireCharm"] = "Vampire Charm";
    ItemType["KettleHat"] = "Kettle Hat";
    ItemType["RingOfVigor"] = "Ring of Vigor";
    ItemType["LightningStaff"] = "Lightning Staff";
    ItemType["TitaniumGreatsword"] = "Titanium Greatsword";
    ItemType["AmuletOfProtection"] = "Amulet of Protection";
})(ItemType || (ItemType = {}));
export class ItemFactory {
    static createItem(type) {
        switch (type) {
            case ItemType.RustyDagger:
                return new Equipment(ItemType.RustyDagger, // Name
                10, // Value
                "img/items/rusty-dagger.png", // Sprite
                2, // Attack Mod
                0, // Defense Mod
                0, // Health Mod
                () => { }, // Attack Script
                () => { } // Hurt Script
                );
            case ItemType.Whip:
                return new Equipment(ItemType.Whip, // Name
                15, // Value
                "img/items/whip.png", // Sprite
                1, // Attack Mod
                0, // Defense Mod
                0, // Health Mod
                (target) => {
                    if (target.enemies && target.enemies.length > 0) {
                        const aliveEnemies = target.enemies.filter(enemy => enemy.health > 0);
                        if (aliveEnemies.length > 0) {
                            aliveEnemies.forEach(monster => {
                                monster.health -= 1;
                            });
                            updateStatusBar("All enemies where whipped for 1 damage!");
                        }
                    }
                },
                () => { }, // Attack Script
                );
            case ItemType.Bow:
                return new Equipment(ItemType.Bow, // Name
                25, // Value
                "img/items/bow.png", // Sprite
                2, // Attack Mod
                0, // Defense Mod
                0, // Health Mod
                (target) => {
                    //console.log("Target in bow", target);
                    if (target.enemies && target.enemies.length > 0) {
                        const aliveEnemies = target.enemies.filter(enemy => enemy.health > 0);
                        if (aliveEnemies.length > 0) {
                            const randomEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
                            const damage = calcDamage(4,randomEnemy.defense);

                            //console.log("aliveEnemies in bow", aliveEnemies);
                            updateStatusBar(`Bow deals ${damage} damage to ${randomEnemy.name}`);

                            randomEnemy.health -= damage;
                        }
                    }
                }, () => { } // Hurt Script
                );
            case ItemType.RabbitsFoot:
                return new Equipment(ItemType.RabbitsFoot, // Name
                15, // Value
                "img/items/rabbits-foot.png", // Sprite
                0, // Attack Mod
                0, // Defense Mod
                0, // Health Mod
                () => { }, // Attack Script
                (target) => {
                    target.dodgeChance += 0.1;
                });
            case ItemType.SturdyBoots:
                return new Equipment(ItemType.SturdyBoots, // Name
                15, // Value
                "img/items/sturdy-boots.png", // Sprite
                0, // Attack Mod
                2, // Defense Mod
                0, // Health Mod
                () => { }, // Attack Script
                () => { } // Hurt Script
                );
            case ItemType.Shield:
                return new Equipment(ItemType.Shield, // Name
                20, // Value
                "img/items/shield.png", // Sprite
                0, // Attack Mod
                4, // Defense Mod
                0, // Health Mod
                () => { }, // Attack Script
                () => { } // Hurt Script
                );
            case ItemType.HeartPendant:
                return new Equipment(ItemType.HeartPendant,
                    25,
                    "img/items/heart-pendant.png",
                    0,
                    0,
                    10,
                    () => {},
                    () => {},
                );
            case ItemType.ChainmailOfVitality:
                return new Equipment(ItemType.ChainmailOfVitality,
                    60,
                    "img/items/chainmail-of-vitality.png",
                    0,
                    4,
                    25,
                    () => {},
                    () => {},
                );
            case ItemType.ButterKnife:
                return new Equipment(ItemType.ButterKnife,
                    5,
                    "img/items/butter-knife.png",
                    1,
                    0,
                    0,
                    () => {},
                    () => {},
                );
            case ItemType.CatONineTails:
                return new Equipment(ItemType.CatONineTails,
                    75,
                    "img/items/cat-o-nine-tails.png",
                    5,
                    0,
                    0,
                    (target) => {
                        if (target.enemies && target.enemies.length > 0) {
                            const aliveEnemies = target.enemies.filter(enemy => enemy.health > 0);
                            if (aliveEnemies.length > 0) {
                                aliveEnemies.forEach(monster => {
                                    monster.health -= calcDamage(5,monster.defense);
                                });
                                updateStatusBar("All enemies where whipped for 5 damage!");
                            }
                        }
                    },
                    () => {},
                );
            case ItemType.VampireCharm:
                return new Equipment(ItemType.VampireCharm,
                    75,
                    "img/items/vampire-charm.png",
                    0,
                    0,
                    10,
                    (target) => {
                        let healAmount = Math.floor(Math.max(1,target.player.maxHealth*0.02));
                        target.player.heal(healAmount);
                        updateStatusBar(`You were healed by Vampire Charm for ${healAmount} health!`);
                    },
                    () => {},
                );
            case ItemType.KettleHat:
                return new Equipment(ItemType.KettleHat,
                    15,
                    "img/items/kettle-hat.png",
                    0,
                    3,
                    0,
                    () => {},
                    () => {},
                );
            case ItemType.RingOfVigor:
                return new Equipment(ItemType.RingOfVigor,
                    75,
                    "img/items/ring-of-vigor.png",
                    3,
                    3,
                    25,
                    () => {},
                    () => {},
                );
            case ItemType.LightningStaff:
                return new Equipment(ItemType.LightningStaff,
                    50,
                    "img/items/lightning-staff.png",
                    0,
                    0,
                    0,
                    (target) => {
                        console.log("Target in staff", target);
                        if (target.enemies && target.enemies.length > 0) {
                            const aliveEnemies = target.enemies.filter(enemy => enemy.health > 0);
                            if (aliveEnemies.length > 0) {
                                const randomEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
                                const damage = calcDamage(10,randomEnemy.defense);

                                updateStatusBar(`Lightning Staff deals ${damage} damage to ${randomEnemy.name}`);

                                randomEnemy.health -= damage;
                            }
                        } },
                    () => {},
                );
            case ItemType.TitaniumGreatsword:
                return new Equipment(ItemType.TitaniumGreatsword,
                    75,
                    "img/items/titanium-greatsword.png",
                    10,
                    0,
                    0,
                    () => {},
                    () => {},
                );
            case ItemType.AmuletOfProtection:
                return new Equipment(ItemType.AmuletOfProtection,
                    60,
                    "img/items/amulet-of-protection.png",
                    0,
                    8,
                    0,
                    () => {},
                    () => {},
                );
            default:
                throw new Error(`Unknown item type: ${type}`);
        }
    }
}
