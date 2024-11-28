import { Boss } from "./classes";

export var BossType;
(function (BossType) {
    BossType["Eyemalgam"] = "Eyemalgam";
    BossType["Slimelord"] = "Slimelord";
    BossType["Orchestrator"] = "Orchestrator";
    BossType["GrimSleeper"] = "Grim Sleeper";
    BossType["SoulFeaster"] = "Soul Feaster";
})(BossType || (BossType = {}));

export class BossFactory {
    static createBoss(type, difficultyMultiplier) {
        switch (type) {
            case BossType.Eyemalgam:
                return new Boss(
                25 * difficultyMultiplier, // Health
                25 * difficultyMultiplier, // Max Health
                5 * difficultyMultiplier, // Attack
                0 * difficultyMultiplier, // Defense
                BossType.Eyemalgam, // Name
                "../img/bosses/eyemalgam.gif" // Sprite
                );
            case BossType.Slimelord:
                return new Boss(
                40 * difficultyMultiplier, // Health
                40 * difficultyMultiplier, // Max Health
                7 * difficultyMultiplier, // Attack
                5 * difficultyMultiplier, // Defense
                BossType.Slimelord, // Name
                "../img/bosses/slimelord.gif" // Sprite
                );
            case BossType.Orchestrator:
                return new Boss(
                75 * difficultyMultiplier, // Health
                75 * difficultyMultiplier, // Max Health
                10 * difficultyMultiplier, // Attack
                10 * difficultyMultiplier, // Defense
                BossType.Orchestrator, // Name
                "../img/bosses/orchestrator.gif" // Sprite
                );
            case BossType.GrimSleeper:
                return new Boss(
                100 * difficultyMultiplier, // Health
                100 * difficultyMultiplier, // Max Health
                20 * difficultyMultiplier, // Attack
                15 * difficultyMultiplier, // Defense
                BossType.GrimSleeper, // Name
                "../img/bosses/grimsleeper.gif" // Sprite
                );
            case BossType.SoulFeaster:
                return new Boss(
                200 * difficultyMultiplier, // Health
                200 * difficultyMultiplier, // Max Health
                30 * difficultyMultiplier, // Attack
                30 * difficultyMultiplier, // Defense
                BossType.SoulFeaster, // Name
                "../img/bosses/soulfeaster.gif" // Sprite
                );
            default:
                throw new Error(`Unknown boss type: ${type}`);
        }
    }
}