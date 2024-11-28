import { Monster, Boss } from "./classes.js";
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
    nextTurn() {
        if (this.turn === "player") {
            this.updateStatusBar(`It's your turn! Choose and action.`);
            // Wait for player input !!!!!!!!!!
        }
        else {
            this.enemyAttack();
        }
    }
    playerAttack(targetIndex) {
        const target = this.enemies[targetIndex];
        if (target.health > 0) {
            const damage = Math.max(0, this.player.attack - target.defense);
            target.health -= damage;
            this.updateStatusBar(`You attacked ${target.name} for ${damage} damage.`);
        }
        else {
            this.updateStatusBar(`${target.name} is already defeated.`);
        }
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
                if (this.player.health < 0) {
                    this.updateUI();
                    this.checkCombatEnd();
                    return;
                }
            }
        });
        this.updateUI();
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
        this.updateUI();
        this.turn = "enemies";
        this.nextTurn();
    }
    checkCombatEnd() {
        const allEnemiesDefeated = this.enemies.every(enemy => enemy.health <= 0);
        const playerDefeated = this.player.health <= 0;
        if (allEnemiesDefeated) {
            this.updateStatusBar(`You are victorious!`);
            // Victory logic !!!!!!!!!!!!!!!
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

    // So it can be used in this class
    updateStatusBar(message) {
        const statusBar = document.getElementById("statusBarText");
        if (statusBar) {
            statusBar.value = message;
        }
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
    getRandomEnemies() {
        const aliveEnemies = this.enemies.filter(enemy => enemy.health > 0);
        if (aliveEnemies.length === 0) {
            throw new Error("No enemies to target.");
        }
        return aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    }
    applyItemEffect(effect, target) {
        effect(target, this);
    }
    isCombatOver() {
        const allEnemiesDefeated = this.enemies.every(enemy => enemy.health <= 0);
        const playerDefeated = this.player.health <= 0;
        return allEnemiesDefeated || playerDefeated;
    }
    resolveTurn(action, target, itemEffect) {
        if (action === "attack" && (target instanceof Monster || target instanceof Boss)) {
            const damage = this.player.attack - target.defense;
            target.health -= Math.max(damage, 0); // Ensure damage isn't negative
        }
        else if (action === "useItem" && itemEffect) {
            itemEffect();
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
