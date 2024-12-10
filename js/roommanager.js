import './jquery-3.7.1.min.js';
import {Room,ItemRoom,MonsterRoom,ShopRoom,BossRoom,Monster,Boss,BaseItem,Dungeon } from './classes.js';

export function rmHideAllRooms() {
    let shopRoom = $("#shopRoom");
    let itemRoom = $("#itemRoom");
    let monsterRoom = $("#monsterRoom");
    let bossRoom = $("#bossRoom");
    let helpDiv = $("#howToPlay");
    let equipDiv = $("#equipmentDiv");
    shopRoom.addClass("hide");
    itemRoom.addClass("hide");
    monsterRoom.addClass("hide");
    bossRoom.addClass("hide");
    helpDiv.addClass("hide");
    equipDiv.addClass("hide");
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

        if (buildRoom.cleared === true) {
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

function updateDirections(currentRoom) {
    const roomDirections = {
        shop: "The shop contains 4 items that you may choose to buy, <br> provided you have enough gold. The doctor also offers <br> a full healing service that can be purchased for 10 gold.",
        boss: "Works the same as monster rooms. Prepare <br> for a tough fight! The boss won't go down easily.",
        item: "The chest can be clicked, opening and closing it.<br> Search the chest for a powerful item to aid in your journey.",
        monster: "You may either click on a monster to attack it,<br> or click on an inventory item to use it.<br> Defeat the monsters to progress to the next room.",
        default: "Explore the dungeon and move forward carefully."
    };

    const directionsText = roomDirections[currentRoom] || roomDirections.default;
    const directionsParagraph = document.getElementById("directionsText");

    directionsParagraph.innerHTML = directionsText;
}

export function rmBuildMap(dungeon) {

    updateDirections(dungeon.getCurrentRoom.type);
    console.log();
    // Update Map
    let mapNum1 = $("#mapNumberRow .mapCol1");
    let mapNum2 = $("#mapNumberRow .mapCol2");
    let mapNum3 = $("#mapNumberRow .mapCol3");
    let mapNum4 = $("#mapNumberRow .mapCol4"); //CURRENT
    let mapNum5 = $("#mapNumberRow .mapCol5");
    let mapNum6 = $("#mapNumberRow .mapCol6");
    let mapNum7 = $("#mapNumberRow .mapCol7");

    let mapType1 = $("#mapTypeRow .mapCol1");
    let mapType2 = $("#mapTypeRow .mapCol2");
    let mapType3 = $("#mapTypeRow .mapCol3");
    let mapType4 = $("#mapTypeRow .mapCol4");
    let mapType5 = $("#mapTypeRow .mapCol5");
    let mapType6 = $("#mapTypeRow .mapCol6");
    let mapType7 = $("#mapTypeRow .mapCol7");

    let mapRemaining = $("#mapRemaining td");

    let curRoom = dungeon.currentRoomIndex;
    let dunLength = dungeon.rooms.length;

    if (curRoom-3 < 0) { //col 1
        mapNum1.addClass("mapBlack");
        mapType1.addClass("mapBlack");
    } else {
        mapNum1.removeClass("mapBlack");
        mapType1.removeClass("mapBlack");
        mapNum1.text(curRoom-2);
        mapType1.text(dungeon.rooms[curRoom-3].type.toUpperCase().charAt(0));
    }

    if (curRoom-2 < 0) { //col 2
        mapNum2.addClass("mapBlack");
        mapType2.addClass("mapBlack");
    } else {
        mapNum2.removeClass("mapBlack");
        mapType2.removeClass("mapBlack");
        mapNum2.text(curRoom-1);
        mapType2.text(dungeon.rooms[curRoom-2].type.toUpperCase().charAt(0));
    }

    if (curRoom-1 < 0) { //col 3
        mapNum3.addClass("mapBlack");
        mapType3.addClass("mapBlack");
    } else {
        mapNum3.removeClass("mapBlack");
        mapType3.removeClass("mapBlack");
        mapNum3.text(curRoom);
        mapType3.text(dungeon.rooms[curRoom-1].type.toUpperCase().charAt(0));
    }

    //col 4 (ALWAYS ACTIVE)
    mapNum4.text(curRoom+1);
    mapType4.text(dungeon.getCurrentRoom.type.toUpperCase().charAt(0));
    
    if (curRoom+1 >= dunLength) { //col 5
        mapNum5.addClass("mapBlack");
        mapType5.addClass("mapBlack");
    } else {
        mapNum5.removeClass("mapBlack");
        mapType5.removeClass("mapBlack");
        mapNum5.text(curRoom+2);
        mapType5.text(dungeon.rooms[curRoom+1].type.toUpperCase().charAt(0));
    }

    if (curRoom+2 >= dunLength) { //col 6
        mapNum6.addClass("mapBlack");
        mapType6.addClass("mapBlack");
    } else {
        mapNum6.removeClass("mapBlack");
        mapType6.removeClass("mapBlack");
        mapNum6.text(curRoom+3);
        mapType6.text(dungeon.rooms[curRoom+2].type.toUpperCase().charAt(0));
    }

    if (curRoom+3 >= dunLength) { //col 7
        mapNum7.addClass("mapBlack");
        mapType7.addClass("mapBlack");
    } else {
        mapNum7.removeClass("mapBlack");
        mapType7.removeClass("mapBlack");
        mapNum7.text(curRoom+4);
        mapType7.text(dungeon.rooms[curRoom+3].type.toUpperCase().charAt(0));
    }

    let roomsLeft = ((dunLength-1)-curRoom)
    if (roomsLeft !== 0) {
        mapRemaining.text(roomsLeft+" Room"+((roomsLeft === 1)?"":"s")+" Until Boss");
    } else {
        mapRemaining.text("");
    }

}

/*
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
 */
export function rmBuildStats(player) {
    // Update player's stats
    $("#healthVal").text(player.health);
    $("#maxHealthVal").text(player.maxHealth);
    $("#attackVal").text(player.attack);
    $("#defenseVal").text(player.defense);
    $("#goldVal").text(player.gold);
    // $("#scoreVal").text(player.score);   Don't have score built out yet !!!!!!!!!!!!
}

export function rmBuildInventory(player) {
    const inventoryList = $(".invItem");
    const inventoryImgList = $(".invItem img");

    for (let i = 0; i < inventoryList.length; i++) {
        if (i < player.inventory.length) {
            inventoryList.eq(i).removeClass("hide");

            // Update image and alt text for item
            inventoryImgList.eq(i).attr("src",player.inventory[i].sprite);
            inventoryImgList.eq(i).attr("alt",player.inventory[i].name);
        } else {
            inventoryList.eq(i).addClass("hide");
        }
    }
}

export function rmBuildEquip(player) {
    $("#gameWrapper").addClass("hide");

    let equipDiv = $("#equipmentDiv");
    let equipHolder = $("#equipHolder div");
    let equipText = $("#equipName");

    equipDiv.removeClass("hide");

    // remove all preexisting items
    $("#equipHolder .itemHoldDiv").remove();

    // rebuild all current items
    /*player.equipped.forEach((value,index)=>{
        let sprite = value.sprite;
        let name = value.name;
        equipHolder.append(`<img src="${sprite}" alt="${name}">`).on("mouseenter",()=>{
            equipText.text(value.name);
        }).on("mouseleave",()=>{
            equipText.text("");
        });
    })*/

    for (let i = 0; i < player.equipped.length; i++) {
        let sprite = player.equipped[i].sprite;
        let name = player.equipped[i].name;

        equipHolder.append(`<div class="itemHoldDiv"><img src="${sprite}" alt="${name}" class="equipItem${i} imgFill"></div>`);

        $(`.equipItem${i}`).on("mouseenter",()=>{
            equipText.text(name);
        }).on("mouseleave",()=>{
            equipText.text("");
        });
    }
}



// TEST FUNCTIONS
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

