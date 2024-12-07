import { Monster, Boss, Dungeon } from "./classes.js";
import { ItemType } from "./item-factory.js";
export class CombatManager {
    constructor(player, enemies = []) {
        this.player = player;
        this.enemies = enemies;
        this.turn = "player";
    }
    setEnemies(enemies) {
        this.enemies = enemies;
    }
    startCombat() {
        updateStatusBar(`Combat started! It's your turn.`);
    }
    nextTurn() {
        if (this.turn === "enemies") {
            this.enemyAttack();
        }
    }
    playerAttack(targetIndex) {
        // Grab correct target clicked
        const target = this.enemies[targetIndex];

        // Calculate damage
        const damage = Math.max(0, this.player.attack - target.defense);
        
        // Assign damage to target health
        target.health -= damage;

        // Update status bar to show damage to which enemy
        console.log(`You attacked ${target.name} for ${damage} damage.`); // Debugging purpose
        updateStatusBar(`You attacked ${target.name} for ${damage} damage.`);
    
        // Check to see if all enemies or player died
        this.checkCombatEnd();

        if (!this.isCombatOver) {
            console.log("Inside of isCombatOver if statement"); // Debugging purpose
            this.turn = "enemies";
            this.nextTurn();
        }
    }
    enemyAttack() {
        this.enemies.forEach(enemy => {
            if (enemy.health > 0) {
                const damage = Math.max(0, enemy.attack - this.player.defense);
                this.player.health -= damage;
                console.log(`${enemy.name} attacked you for ${damage} damage.`); // Debugging purpose
                updateStatusBar(`${enemy.name} attacked you for ${damage} damage.`);
                // Check if player is defeated
                if (this.player.health <= 0) {
                    this.checkCombatEnd();
                    return;
                }
            }
        });
        this.checkCombatEnd();
        if (!this.isCombatOver()) {
            this.turn = "player";
            this.nextTurn();
        }
    }
    useItem(itemIndex) {
        const item = this.player.inventory[itemIndex];
        item.applyEffect(this.player);
        this.player.inventory.splice(itemIndex, 1);
        updateStatusBar(`You used ${item.name}.`);
        this.turn = "enemies";
        this.nextTurn();
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
        const allEnemiesDefeated = this.enemies.every(enemy => enemy.health <= 0);
        const playerDefeated = this.player.health <= 0;
        return allEnemiesDefeated || playerDefeated;
    }
    checkCombatEnd() {
        // Place all enemies at 0 health check into variable
        const allEnemiesDefeated = this.enemies.every(enemy => enemy.health <= 0);

        // Place player at 0 health check into variable
        const playerDefeated = this.player.health <= 0;

        // If all enemies defeated, award gold the sum of enemies health
        if (allEnemiesDefeated) {
            let goldAward = this.calculateGoldReward();
            updateStatusBar(`You are victorious! You earned ${goldAward} gold.`);
            this.player.gold += goldAward;
            return;
        } else if (playerDefeated) {            // If player dies give prompt
            alert(`You were defeated!`);
            // Death logic !!!!!!!!!!!!!!
            return;
        } else {
            this.turn = "enemies";
        }
        
    }
    calculateGoldReward() {
        let totalGold = 0;

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
