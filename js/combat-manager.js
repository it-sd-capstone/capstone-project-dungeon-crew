import { Monster, Boss, Dungeon } from "./classes.js";
import { ItemType } from "./item-factory.js";
export class CombatManager {
    constructor(player, enemies = []) {
        this.player = player;
        this.enemies = enemies;
        this.turn = "player";
        this.isCombatActive = false;
        this.combatInterval = null;
    }
    setEnemies(enemies) {
        this.enemies = enemies;
    }
    startCombat(updateRoom, updateStats, updateInventory) {
        this.turn = "player";
        this.isCombatActive = true;
        updateStatusBar(`Combat started! It's your turn.`);
        this.startCombatLoop(updateRoom, updateStats, updateInventory);
    }
    startCombatLoop(updateRoom, updateStats, updateInventory) {
        this.combatInterval = setInterval(() => {
            if (this.turn === "player") {
                // Wait for player input via main.js
            } else if (this.turn === "enemies") {
                this.enemyAttack(updateRoom, updateStats, updateInventory);
            }

            // Check combat end after each turn
            if (this.isCombatOver()) {
                clearInterval(this.combatInterval);
                this.endCombat();
            }
        }, 1700);
    }
    nextTurn() {
        if (this.turn === "player" && this.isCombatActive) {
            this.turn = "enemies";
            this.startCombatLoop(updateRoom, updateStats, updateInventory);
        }
    }
    playerAttack(targetIndex) {
        // Make sure playerAttack() is only triggered if it's player's turn and combat is active
        if (this.turn !== "player" || !this.isCombatActive) {
            return;
        }

        // Grab correct target clicked
        const target = this.enemies[targetIndex];

        // Make sure target is valid
        if (!target) {
            return;
        }

        // Calculate damage
        const damage = Math.max(0, this.player.attack - target.defense);
        
        // Assign damage to target health
        target.health -= damage;

        // Update status bar to show damage to which enemy
        updateStatusBar(`You attacked ${target.name} for ${damage} damage.`);
    
        // Check to see if all enemies or player died
        this.checkCombatEnd();

        if (this.isCombatOver) {
            this.turn = "enemies";
        } else {
            this.nextTurn();
        }
    }
    enemyAttack(updateRoom, updateStats, updateInventory) {
        let enemyIndex = 0;

        // loop to handle attacks
        for (enemyIndex; enemyIndex < this.enemies.length; enemyIndex++) {
            const enemy = this.enemies[enemyIndex];

            // Attack player if the enemy is still alive
            if (enemy.health > 0) {
                this.player.takeDamage(enemy);

                // Update information after each attack
                updateRoom();
                updateStats();
                updateInventory();

                // Check if combat is over after this attack
                if (this.isCombatOver()) {
                    return; // Stop if the game is over
                }
            }
        } 

        if (enemyIndex >= this.enemies.length) {
            // After all enemies have attacked, switch turn to player
            this.turn = "player";
        }
    }
    // enemyAttack() {
    //     // Make sure combat is active
    //     if (!this.isCombatActive) {
    //         return;
    //     }

    //     // Have each enemy attack player
    //     this.enemies.forEach(enemy => {
    //         if (enemy.health > 0) {
    //             // const damage = Math.max(0, enemy.attack - this.player.defense);

    //             this.player.takeDamage(enemy);
    //         }
    //     });

    //     // Check to see if all enemies or player died
    //     this.checkCombatEnd();

    //     if (!this.isCombatOver()) {
    //         this.turn = "player";
    //         // this.nextTurn();
    //     }
    // }
    useItem(itemIndex) {
        // Grab correct item clicked
        const item = this.player.inventory[itemIndex];

        // Apply the item effect
        item.applyEffect(this.player);

        // Remove item from inventory
        this.player.inventory.splice(itemIndex, 1);
        updateStatusBar(`You used ${item.name}.`);

        this.turn = "enemies";
        // this.nextTurn();
    }
    applyItemEffect(effect, target) {
        effect(target, this);
    }
    getRandomEnemies() {
        const aliveEnemies = this.enemies.filter(enemy => enemy.health > 0);
        if (aliveEnemies.length === 0) {
            throw new Error("No enemies to target.");
        }
        return aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    }
    isCombatOver() {
        // Check if all enemies health is 0
        const allEnemiesDefeated = this.enemies.every(enemy => enemy.health <= 0);

        // Check if player's health is 0
        const playerDefeated = this.player.health <= 0;

        return allEnemiesDefeated || playerDefeated;
    }
    checkCombatEnd() {
        if (this.isCombatOver()) {
            this.endCombat();
        }
    }
    endCombat() {
        // Set isCombatActive false and clear combatInterval
        this.isCombatActive = false;
        clearInterval(this.combatInterval);

        // Make variables for check if all enemies and player have 0 health
        const allEnemiesDefeated = this.enemies.every(enemy => enemy.health <= 0);
        const playerDefeated = this.player.health <= 0;

        if (allEnemiesDefeated) {
            const goldAward = this.calculateGoldReward();
            
            updateStatusBar(`You are victorious! You earned ${goldAward} gold.`)
            this.player.gold += goldAward;
        } else if (playerDefeated) {
            this.player.health = 0;
            updateStatusBar(`You were defeated!`);
            alert("Game over!");
        }

    }
    // checkCombatEnd() {
    //     // Place all enemies at 0 health check into variable
    //     const allEnemiesDefeated = this.enemies.every(enemy => enemy.health <= 0);

    //     // Place player at 0 health check into variable
    //     const playerDefeated = this.player.health <= 0;

    //     // If all enemies defeated, award gold the sum of enemies health
    //     if (allEnemiesDefeated) {
    //         let goldAward = this.calculateGoldReward();
    //         updateStatusBar(`You are victorious! You earned ${goldAward} gold.`);
    //         this.player.gold += goldAward;
    //         return;
    //     } else if (playerDefeated) {            // If player dies give prompt
    //         // this.player.health = 0;
    //         alert(`You were defeated!`);
    //         // Death logic !!!!!!!!!!!!!!
    //         return;
    //     } else {
    //         this.turn = "enemies";
    //     }
        
    // }
    
    calculateGoldReward() {
        let totalGold = 0;

        // Add up total of each monster's health for gold award
        this.enemies.forEach((enemy) => {
            if (enemy.health <= 0) {
                totalGold += enemy.maxHealth;
            }
        });

        return totalGold;
    }
}

// So it can be used in other files
export function updateStatusBar(message) {
    const statusBar = document.getElementById("statusBarText");
    if (statusBar) {
        statusBar.innerHTML = message;
    }
}
