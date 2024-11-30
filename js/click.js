function enterRoom(roomId) {
    const gameWrapperDiv = document.querySelector('#gameWrapper');
    gameWrapperDiv.classList.remove('hide');  // Ensure parent div of #roomWrapper is visible

    // Get all rooms within the parent div (e.g., `#roomWrapper > div`)
    const rooms = document.querySelectorAll('#roomWrapper > div');


    // Iterate over all rooms
    rooms.forEach((room) => {

        if (room.id === roomId) {
            room.classList.remove('hide');
        } 
        else {
            // Hide all other rooms
            room.classList.add('hide');
        }
    });

    // Hide the main menu
    const mainMenu = document.querySelector('#mainMenu');
    if (mainMenu) {
        mainMenu.classList.add('hide');
    }
}

function openDirections(divId){
    const mainMenu = document.querySelector('#mainMenu');
    if (mainMenu) {
        mainMenu.classList.add('hide');
    }

    const pageDiv = document.querySelector(`#${divId}`);
    pageDiv.classList.remove('hide');

}



function clickObject(actionId) {
    // Handle specific object clicks
    alert("Object clicked!");
    // Define object-specific logic here
}

