import './jquery-3.7.1.min.js';
import {Room,ItemRoom,MonsterRoom,ShopRoom,BossRoom,Monster,Boss,BaseItem } from './classes.js';

export function rmHideAllRooms() {
    let shopRoom = $("#shopRoom");
    let itemRoom = $("#itemRoom");
    let monsterRoom = $("#monsterRoom");
    let bossRoom = $("#bossRoom");
    shopRoom.addClass("hide");
    itemRoom.addClass("hide");
    monsterRoom.addClass("hide");
    bossRoom.addClass("hide");
}
export function rmBuildRoom(room) {
    rmHideAllRooms();
    if (room instanceof MonsterRoom) {
        let buildRoom = room;

        let monsterRoom = $("#monsterRoom");
        monsterRoom.removeClass("hide");

        let monster1 = $(".monster1");
        let monster2 = $(".monster2");
        let monster3 = $(".monster3");
        let monster1Img = $(".monster1 img");
        let monster2Img = $(".monster2 img");
        let monster3Img = $(".monster3 img");

        let mon1Name = $(".monster1 .monsterName");
        let mon1Health = $(".monster1 .monsterHealth");
        let mon1MaxHealth = $(".monster1 .monsterMaxHealth");

        let mon2Name = $(".monster2 .monsterName");
        let mon2Health = $(".monster2 .monsterHealth");
        let mon2MaxHealth = $(".monster2 .monsterMaxHealth");

        let mon3Name = $(".monster3 .monsterName");
        let mon3Health = $(".monster3 .monsterHealth");
        let mon3MaxHealth = $(".monster3 .monsterMaxHealth");

        let doorImg = $(".doorDiv img");

        if (buildRoom.monsters.length >= 1 && buildRoom.monsters[0].health > 0) {
            monster1.removeClass("hide");
            monster1Img.attr("src", buildRoom.monsters[0].sprite);
            monster1Img.attr("alt", buildRoom.monsters[0].name);

            mon1Name.text(buildRoom.monsters[0].name);
            mon1Health.text(buildRoom.monsters[0].health);
            mon1MaxHealth.text(buildRoom.monsters[0].maxHealth);
        }
        else {
            monster1.addClass("hide");
        }
        if (buildRoom.monsters.length >= 2 && buildRoom.monsters[1].health > 0) {
            monster2.removeClass("hide");
            monster2Img.attr("src", buildRoom.monsters[1].sprite);
            monster2Img.attr("alt", buildRoom.monsters[1].name);

            mon2Name.text(buildRoom.monsters[1].name);
            mon2Health.text(buildRoom.monsters[1].health);
            mon2MaxHealth.text(buildRoom.monsters[1].maxHealth);
        }
        else {
            monster2.addClass("hide");
        }
        if (buildRoom.monsters.length === 3 && buildRoom.monsters[2].health > 0) {
            monster3.removeClass("hide");
            monster3Img.attr("src", buildRoom.monsters[2].sprite);
            monster3Img.attr("alt", buildRoom.monsters[2].name);

            mon3Name.text(buildRoom.monsters[2].name);
            mon3Health.text(buildRoom.monsters[2].health);
            mon3MaxHealth.text(buildRoom.monsters[2].maxHealth);
        }
        else {
            monster3.addClass("hide");
        }

        if (buildRoom.isCleared === true) {
            doorImg.attr("src","img/room/door.png");
        } else {
            doorImg.attr("src","img/room/door-gray.png");
        }
    }
    if (room instanceof ItemRoom) {
        let buildRoom = room;

        let itemRoom = $("#itemRoom");
        itemRoom.removeClass("hide");

        let chest = $(".chestDiv");
        let item = $(".chestItemDiv");
        let chestImg = $(".chestDiv img");
        let itemImg = $(".chestItemDiv img");

        let doorImg = $(".doorDiv img");

        if (buildRoom.chestOpen === false) {
            chestImg.attr("src", "img/room/chest-closed.png");
            item.addClass("hide");
            itemImg.attr("src", buildRoom.item.sprite).attr("alt", buildRoom.item.name);
        } else {
            chestImg.attr("src", "img/room/chest-open.png");
            if (buildRoom.isTaken === true) {
                item.addClass("hide");
            } else {
                item.removeClass("hide");
            }
            itemImg.attr("src", buildRoom.item.sprite).attr("alt", buildRoom.item.name);
        }

        doorImg.attr("src","img/room/door.png");
    }
    if (room instanceof ShopRoom) {
        let buildRoom = room;

        let shopRoom = $("#shopRoom");
        shopRoom.removeClass("hide");

        let item1 = $(".sItem1");
        let item2 = $(".sItem2");
        let item3 = $(".sItem3");
        let item4 = $(".sItem4");
        let item1Img = $(".sItem1 img");
        let item2Img = $(".sItem2 img");
        let item3Img = $(".sItem3 img");
        let item4Img = $(".sItem4 img");

        let item1Label = $(".sItem1 .sItemLabel");
        let item2Label = $(".sItem2 .sItemLabel");
        let item3Label = $(".sItem3 .sItemLabel");
        let item4Label = $(".sItem4 .sItemLabel");

        let doorImg = $(".doorDiv img");

        if (buildRoom.forSale[0] !== undefined) {
            item1.removeClass("hide");
            item1Img.attr("src", buildRoom.forSale[0].sprite).attr("alt", buildRoom.forSale[0].name);
            item1Label.text(buildRoom.forSale[0].value+" gold");
        } else {
            item1.addClass("hide");
        }

        if (buildRoom.forSale[1] !== undefined) {
            item2.removeClass("hide");
            item2Img.attr("src", buildRoom.forSale[1].sprite).attr("alt", buildRoom.forSale[1].name);
            item2Label.text(buildRoom.forSale[1].value+" gold");
        } else {
            item2.addClass("hide");
        }

        if (buildRoom.forSale[2] !== undefined) {
            item3.removeClass("hide");
            item3Img.attr("src", buildRoom.forSale[2].sprite).attr("alt", buildRoom.forSale[2].name);
            item3Label.text(buildRoom.forSale[2].value+" gold");
        } else {
            item3.addClass("hide");
        }

        if (buildRoom.forSale[3] !== undefined) {
            item4.removeClass("hide");
            item4Img.attr("src", buildRoom.forSale[3].sprite).attr("alt", buildRoom.forSale[3].name);
            item4Label.text(buildRoom.forSale[3].value+" gold");
        } else {
            item4.addClass("hide");
        }

        doorImg.attr("src","img/room/door.png");
    }
    if (room instanceof BossRoom) {
        let buildRoom = room;

        let bossRoom = $("#bossRoom");
        bossRoom.removeClass("hide");

        let boss = $(".bossEnemyDiv");
        let bossImg = $(".bossEnemyDiv img");

        let bossName = $(".bossEnemyDiv .monsterName");
        let bossHealth = $(".bossEnemyDiv .monsterHealth");
        let bossMaxHealth = $(".bossEnemyDiv .monsterMaxHealth");

        let doorImg = $(".doorDiv img");

        if (buildRoom.boss.health > 0) {
            boss.removeClass("hide");
            bossImg.attr("src", buildRoom.boss.sprite).attr("alt", buildRoom.boss.name);
            bossName.text(buildRoom.boss.name);
            bossHealth.text(buildRoom.boss.health);
            bossMaxHealth.text(buildRoom.boss.maxHealth);
        } else {
            boss.addClass("hide");
        }

        if (buildRoom.isCleared === true) {
            doorImg.attr("src","img/room/door.png");
        } else {
            doorImg.attr("src","img/room/door-gray.png");
        }
    }
}
export function rmBuildSampleMonster() {
    let testSlime = new Monster(5, 5, 1, 1, "Test Slime", "img/monsters/crime-slime.gif");
    let monstRoom = new MonsterRoom("monster", [testSlime, testSlime, testSlime], false);
    rmBuildRoom(monstRoom);
}

export function rmBuildSampleItem() {
    let testItem = new BaseItem("Test Sword",1,"img/monsters/crime-slime.gif");
    let itemRoom = new ItemRoom("item",testItem,false);
    rmBuildRoom(itemRoom);
}

export function rmBuildSampleShop() {
    let testItem = new BaseItem("Test Sword",1,"img/monsters/crime-slime.gif");
    let shopRoom = new ShopRoom("shop",[testItem,testItem,testItem,testItem]);
    rmBuildRoom(shopRoom);
}

export function rmBuildSampleBoss() {
    let testItem = new BaseItem("Test Sword",1,"img/monsters/crime-slime.gif");
    let boss = new Boss(5,5,1,1,"Test Boss","img/monsters/crime-slime.gif",testItem);
    let bossRoom = new BossRoom("boss",boss,false);
    rmBuildRoom(bossRoom);
}