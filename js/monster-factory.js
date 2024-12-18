import { Monster } from "./classes.js";
export var EnemyType;
(function (EnemyType) {
    EnemyType["Seeker"] = "Seeker";
    EnemyType["CrimeSlime"] = "Crime Slime";
    EnemyType["Snobgoblin"] = "Snobgoblin";
    EnemyType["LazyBones"] = "Lazy Bones";
    EnemyType["HungryGhost"] = "Hungry Ghost";
})(EnemyType || (EnemyType = {}));
export class EnemyFactory {
    static createEnemy(type, difficultyMultiplier) {
        switch (type) {
            case EnemyType.Seeker:
                return new Monster(5 * difficultyMultiplier, // Health
                5 * difficultyMultiplier, // Max Health
                1 * difficultyMultiplier, // Attack
                0 * difficultyMultiplier, // Defense
                EnemyType.Seeker, // Name
                "img/monsters/seeker.gif" // Sprite
                );
            case EnemyType.CrimeSlime:
                return new Monster(10 * difficultyMultiplier, // Health
                10 * difficultyMultiplier, // Max Health
                2 * difficultyMultiplier, // Attack
                5 * difficultyMultiplier, // Defense
                EnemyType.CrimeSlime, // Name
                "img/monsters/crime-slime.gif" // Sprite
                );
            case EnemyType.Snobgoblin:
                return new Monster(15 * difficultyMultiplier, // Health
                15 * difficultyMultiplier, // Max Health
                3 * difficultyMultiplier, // Attack
                8 * difficultyMultiplier, // Defense
                EnemyType.Snobgoblin, // Name
                "img/monsters/snobgoblin.gif" // Sprite
                );
            case EnemyType.LazyBones:
                return new Monster(20 * difficultyMultiplier, // Health
                20 * difficultyMultiplier, // Max Health
                5 * difficultyMultiplier, // Attack
                15 * difficultyMultiplier, // Defense
                EnemyType.LazyBones, // Name
                "img/monsters/lazy-bones.gif" // Sprite
                );
            case EnemyType.HungryGhost:
                return new Monster(30 * difficultyMultiplier, // Health
                30 * difficultyMultiplier, // Max Health
                15 * difficultyMultiplier, // Attack
                25 * difficultyMultiplier, // Defense
                EnemyType.HungryGhost, // Name
                "img/monsters/hungry-ghost.gif" // Sprite
                );
            default:
                throw new Error(`Unknown enemy type: ${type}`);
        }
    }
}
