import $ from 'jquery';
import {Room,MonsterRoom,ItemRoom,ShopRoom,BossRoom,Monster} from './classes'

export function rmHideAllRooms() : void {
    let shopRoom = $("#shopRoom");
    let itemRoom = $("#itemRoom");
    let monsterRoom = $("#monsterRoom");
    let bossRoom = $("#bossRoom");

    shopRoom.addClass("hide");
    itemRoom.addClass("hide");
    monsterRoom.addClass("hide");
    bossRoom.addClass("hide");
}

export function rmBuildRoom(room : Room) : void {
    rmHideAllRooms();
    if (room instanceof MonsterRoom) {
        let buildRoom : MonsterRoom = room as MonsterRoom;
        let monsterRoom = $("#monsterRoom");
        monsterRoom.removeClass("hide");

        let monster1 = $(".monster1");
        let monster2 = $(".monster2");
        let monster3 = $(".monster3");
        let monster1Img = $(".monster1 img");
        let monster2Img = $(".monster2 img");
        let monster3Img = $(".monster3 img");

        if (buildRoom.monsters.length >= 1) {
            monster1.removeClass("hide");
            monster1Img.attr("src",buildRoom.monsters[0].sprite);
            monster1Img.attr("alt",buildRoom.monsters[0].name);

            console.log(buildRoom.monsters[0].name+" "+buildRoom.monsters[0].health);
        } else {
            monster1.addClass("hide");
        }

        if (buildRoom.monsters.length >= 2) {
            monster2.removeClass("hide");
            monster2Img.attr("src",buildRoom.monsters[1].sprite);
            monster2Img.attr("alt",buildRoom.monsters[1].name);


        } else {
            monster2.addClass("hide");
        }

        if (buildRoom.monsters.length == 3) {
            monster3.removeClass("hide");
            monster3Img.attr("src",buildRoom.monsters[2].sprite);
            monster3Img.attr("alt",buildRoom.monsters[2].name);


        } else {
            monster3.addClass("hide");
        }
    }
    if (room instanceof ItemRoom) {
        let buildRoom : ItemRoom = room as ItemRoom;
        let itemRoom = $("#itemRoom");
        itemRoom.removeClass("hide");

        let chest = $(".chestDiv");
        let item = $(".itemDiv");
        let chestImg = $(".chestDiv img");
        let itemImg = $(".itemDiv img");

        chestImg.attr("src","img/room/chest-closed.png");
        item.addClass("hide")
        itemImg.attr("src",buildRoom.item.sprite).attr("alt",buildRoom.item.name);
    }
    if (room instanceof ShopRoom) {
        let buildRoom : ShopRoom = room as ShopRoom;
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

        item1.removeClass("hide");
        item2.removeClass("hide");
        item3.removeClass("hide");
        item4.removeClass("hide");

        item1Img.attr("src",buildRoom.forSale[0].sprite).attr("alt",buildRoom.forSale[0].name);
        item2Img.attr("src",buildRoom.forSale[1].sprite).attr("alt",buildRoom.forSale[1].name);
        item3Img.attr("src",buildRoom.forSale[2].sprite).attr("alt",buildRoom.forSale[2].name);
        item4Img.attr("src",buildRoom.forSale[3].sprite).attr("alt",buildRoom.forSale[3].name);
    }
    if (room instanceof BossRoom) {
        let buildRoom : BossRoom = room as BossRoom;
        let bossRoom = $("#bossRoom");
        bossRoom.removeClass("hide");

        let boss = $(".bossEnemyDiv");
        let bossImg = $(".bossEnemyDiv img");



        boss.removeClass("hide");
        bossImg.attr("src",buildRoom.boss.sprite).attr("alt",buildRoom.boss.name);

    }
}

export function rmBuildSampleMonster() {
    let testSlime : Monster = new Monster(5,5,1,1,"Test Slime","img/monster/crime-slime.gif");
    let monstRoom : MonsterRoom = new MonsterRoom("monster",[testSlime,testSlime,testSlime],false);
    rmBuildRoom(monstRoom);
}