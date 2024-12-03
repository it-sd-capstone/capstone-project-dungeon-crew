import { Monster, Boss, Dungeon } from "./classes.js";
import { ItemType } from "./item-factory.js";
export class CombatManager {
    constructor(player, enemies, onUpdate) {
        this.player = player;
        this.enemies = enemies;
        this.turn = "player";
        this.onUpdate = onUpdate;
    }
    startCombat() {
        this.updateUI();
        this.updateStatusBar(`Combat started! It's your turn.`);
        this.nextTurn();
    }
    handleCombat(monster) {
        const targetIndex = this.enemies.findIndex(enemy => enemy === monster);
        if (this.turn === "player") {
            this.playerAttack(targetIndex)
        } else {
            this.enemyAttack();
        }
    }
    nextTurn() {
        if (this.turn === "player") {
            this.updateStatusBar(`It's your turn! Choose and action.`);
        }
        else {
            this.enemyAttack();
        }

        this.updateUI();
    }
    resolveTurn(action, target, itemEffect) {
        if (action === "attack" && (target instanceof Monster || target instanceof Boss)) {
            const damage = this.player.attack - target.defense;
            target.health -= Math.max(damage, 0); // Ensure damage isn't negative
        }
        else if (action === "useItem" && itemEffect) {
            itemEffect();
        }
        this.updateUI();
    }
    playerAttack(targetIndex) {
        const target = this.enemies[targetIndex];
        const damage = Math.max(0, this.player.attack - target.defense);

        if (target.health <= 0) {
            this.updateStatusBar(`${target.name} is already defeated.`);
            return;
        }
        
        target.health -= damage;
        this.updateStatusBar(`You attacked ${target.name} for ${damage} damage.`);

        this.updateUI();
        this.checkCombatEnd();
        this.turn = "enemies";
        this.nextTurn();
    }
    enemyAttack() {
        this.enemies.forEach(enemy => {
            if (enemy.health > 0) {
                const damage = Math.max(0, enemy.attack - this.player.defense);
                this.player.health -= damage;
                this.updateStatusBar(`${enemy.name} attacked you for ${damage} damage.`);
                // Check if player is defeated
                if (this.player.health <= 0) {
                    this.updateUI();
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
        this.updateStatusBar(`You used ${item.name}.`);
        this.updateInventoryUI();
        this.updateUI();
        this.turn = "enemies";
        this.nextTurn();
    }
    applyItemEffect(effect, target) {
        effect(target, this);
        this.updateUI();
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
        const allEnemiesDefeated = this.enemies.every(enemy => enemy.health <= 0);
        const playerDefeated = this.player.health <= 0;
        if (allEnemiesDefeated) {
            let goldAward = this.calculateGoldReward();
            this.updateStatusBar(`You are victorious! You earned ${goldAward} gold.`);
            this.player.gold += goldAward;
            return;
        }
        else if (playerDefeated) {
            this.updateStatusBar(`You were defeated!`);
            // Death logic !!!!!!!!!!!!!!
            return;
        }
        else {
            this.nextTurn();
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
    updateUI() {
        // Update player's stats
        document.getElementById("health").value = `${this.player.health}`;
        document.getElementById("attack").value = `${this.player.attack}`;
        document.getElementById("defense").value = `${this.player.defense}`;
        document.getElementById("gold").value = `${this.player.gold}`;
        // (document.getElementById("score") as HTMLInputElement).value = `${this.player.score}`;   Don't have score built out yet !!!!!!!!!!!!
        // Update enemies' statuses in Monster room
        this.enemies.forEach((enemy, index) => {
            const monsterText = document.getElementById(`monster${index + 1}Text`);
            if (monsterText) {
                monsterText.textContent = `${enemy.name} - Health: ${enemy.health}`;
            }
        });
        this.onUpdate(this.player, this.enemies);
    }
    updateInventoryUI() {
        const inventoryList = document.querySelectorAll('#inventory button');

        inventoryList.forEach((button, index) => {
            const img = button.querySelector('img');

            if (this.player.inventory[index]) {
                const item = this.player.inventory[index];
                
                // Update image and alt text for item
                img.src = item.sprite;
                img.alt = item.name;
                
                // Attach click event to each item slot
                button.onclick = () => this.useItem(index);
                button.disabled = false; // Ensure button is clickable
            } else {
                // Clear empty slots (if inventory has less than 8 items)
                img.src = "#";  // Set an empty img
                img.alt = "Empty"
                button.onclick = null;  // Disable click event
                button.disabled = true; // Disable button
            }
        });
    }
    // So it can be used in this class
    updateStatusBar(message) {
        const statusBar = document.getElementById("statusBarText");
        if (statusBar) {
            statusBar.value = message;
        }
    }
}

// So it can be used in other files
export function updateStatusBar(message) {
    const statusBar = document.getElementById("statusBarText");
    if (statusBar) {
        statusBar.value = message;
    }
}
