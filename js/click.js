function enterRoom(roomId) {
    // Hide all rooms
    const rooms = document.querySelectorAll('.hide');
    rooms.forEach(room => {
        room.classList.remove('visible');
    });

    // Show the selected room
    const nextRoom = document.getElementById(roomId);
    if (nextRoom) {
        nextRoom.classList.add('visible');
    }
}

function clickObject() {
   alert("Hello World");
}

