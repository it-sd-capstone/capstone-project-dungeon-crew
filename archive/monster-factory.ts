import { Monster, Boss } from "./classes";

export enum EnemyType {
  Seeker = "Seeker",
  CrimeSlime = "Crime Slime", 
  Snobgoblin = "Snobgoblin",
  LazyBones = "Lazy Bones",
  HungryGhost = "Hungry Ghost"
}

export class EnemyFactory {
  static createEnemy(type: EnemyType, difficultyMultiplier: number): Monster {
    switch (type) {
      case EnemyType.Seeker:
        return new Monster(
          5 * difficultyMultiplier,           // Health
          5 * difficultyMultiplier,           // Max Health
          2 * difficultyMultiplier,           // Attack
          0 * difficultyMultiplier,           // Defense
          EnemyType.Seeker,                   // Name
          "../img/monsters/seeker.gif"        // Sprite
        );

      case EnemyType.CrimeSlime:
        return new Monster(
          10 * difficultyMultiplier,          // Health
          10 * difficultyMultiplier,          // Max Health
          3 * difficultyMultiplier,           // Attack
          3 * difficultyMultiplier,           // Defense
          EnemyType.CrimeSlime,               // Name
          "../img/monsters/crime-slime.gif"   // Sprite
        );

      case EnemyType.Snobgoblin:
        return new Monster(
          20 * difficultyMultiplier,          // Health
          20 * difficultyMultiplier,          // Max Health
          6 * difficultyMultiplier,           // Attack
          5 * difficultyMultiplier,           // Defense
          EnemyType.Snobgoblin,               // Name
          "../img/monsters/snobgoblin.gif"    // Sprite
        );

      case EnemyType.LazyBones:
        return new Monster(
          35 * difficultyMultiplier,          // Health
          35 * difficultyMultiplier,          // Max Health
          10 * difficultyMultiplier,          // Attack
          10 * difficultyMultiplier,          // Defense
          EnemyType.LazyBones,                // Name
          "../img/monsters/lazy-bones.gif"    // Sprite
        );

      case EnemyType.HungryGhost:
        return new Monster(
          50 * difficultyMultiplier,          // Health
          50 * difficultyMultiplier,          // Max Health
          20 * difficultyMultiplier,          // Attack
          25 * difficultyMultiplier,          // Defense
          EnemyType.HungryGhost,              // Name
          "../img/monsters/hungry-ghost.gif"  // Sprite
        );

        default:
          throw new Error(`Unknown enemy type: ${type}`);
    }
  }
}