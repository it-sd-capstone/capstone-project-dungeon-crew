import { Player, Monster, Boss, Equipment, Consumable } from "./classes";

export class CombatManager {
  player: Player;
  enemies: (Monster | Boss)[];
  turn: "player" | "enemies";
  onUpdate: (player: Player, enemies: (Monster | Boss)[]) => void;

  constructor(player: Player, enemies: (Monster | Boss)[], onUpdate: (player: Player, enemies: (Monster | Boss)[]) => void) {
    this.player = player;
    this.enemies = enemies;
    this.turn = "player";
    this.onUpdate = onUpdate;
  }

  startCombat(): void {
    this.updateUI();
    this.updateStatusBar(`Combat started! It's your turn.`)
    this.nextTurn();
  }

  nextTurn(): void {
    if (this.turn === "player") {
      this.updateStatusBar(`It's your turn! Choose and action.`);
      // Wait for player input !!!!!!!!!!
    } else {
      this.enemyAttack();
    }
  }

  playerAttack(targetIndex: number): void {
    const target = this.enemies[targetIndex];
    if (target.health > 0) {
      const damage = Math.max(0, this.player.attack - target.defense);
      target.health -= damage;
      this.updateStatusBar(`You attacked ${target.name} for ${damage} damage.`);
    } else {
      this.updateStatusBar(`${target.name} is already defeated.`)
    }
    this.updateUI();
    this.checkCombatEnd();
    this.turn = "enemies";
    this.nextTurn();
  }

  enemyAttack(): void {
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

  useItem(itemIndex: number): void {
    const item = this.player.inventory[itemIndex];
    item.applyEffect(this.player)
    this.player.inventory.splice(itemIndex, 1);
    this.updateStatusBar(`You used ${item.name}.`);
    this.updateUI();
    this.turn = "enemies";
    this.nextTurn();
  }

  checkCombatEnd(): void {
    const allEnemiesDefeated = this.enemies.every(enemy => enemy.health <= 0);
    const playerDefeated = this.player.health <= 0;

    if (allEnemiesDefeated) {
      this.updateStatusBar(`You are victorious!`);
      // Victory logic !!!!!!!!!!!!!!!
      return;
    } else if (playerDefeated) {
      this.updateStatusBar(`You were defeated!`);
      // Death logic !!!!!!!!!!!!!!
      return;
    } else {
      this.nextTurn();
    }
  }

  updateStatusBar(message: string): void {
    const statusBar = document.getElementById("statusBarText") as HTMLInputElement;
    if (statusBar) {
      statusBar.value = message;
    }
  }

  updateUI(): void {
    // Update player's stats
    (document.getElementById("health") as HTMLInputElement).value = `${this.player.health}`;
    (document.getElementById("attack") as HTMLInputElement).value = `${this.player.attack}`;
    (document.getElementById("defense") as HTMLInputElement).value = `${this.player.defense}`;
    (document.getElementById("gold") as HTMLInputElement).value = `${this.player.gold}`;
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

  getRandomEnemies(): Monster | Boss {
    const aliveEnemies = this.enemies.filter(enemy => enemy.health > 0);
    if (aliveEnemies.length === 0) {
      throw new Error("No enemies to target.");
    }
    
    return aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
  }

  applyItemEffect(effect: (target: Player | Monster | Boss, combatManager: CombatManager) => void, target: Player | Monster | Boss) {
    effect(target, this);
  }

  isCombatOver(): boolean {
    const allEnemiesDefeated = this.enemies.every(enemy => enemy.health <= 0);
    const playerDefeated = this.player.health <= 0;
    return allEnemiesDefeated || playerDefeated;
  }

  resolveTurn(action: "attack" | "useItem", target?: Monster | Boss | Player, itemEffect?: () => void) {
    if (action === "attack" && (target instanceof Monster || target instanceof Boss)) {
      const damage = this.player.attack - target.defense;
      target.health -= Math.max(damage, 0); // Ensure damage isn't negative
    } else if (action === "useItem" && itemEffect) {
      itemEffect();
    }
  }
}

export function updateStatusBar(message: string): void {
  const statusBar = document.getElementById("statusBarText") as HTMLInputElement;
  if (statusBar) {
    statusBar.value = message;
  }
}