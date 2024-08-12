for (const control of controls) {
    const button = document.createElement('button');
    button.id = control;
    button.innerHTML = control;
    controlsBox.appendChild(button);
}

const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

upButton.addEventListener("click", function() {
    Up();
})

downButton.addEventListener("click", function() {
    Down();
})

leftButton.addEventListener("click", function() {
    Left();
})

rightButton.addEventListener("click", function() {
    Right();
})

function Up() {
    if(!tiles[player.location - gridColumns - gridColumns].perimeter &&
        tiles[player.location - gridColumns].state === "remove"
    ) {
        player.location = player.location - gridColumns;
        UpdateGrid(player.location);
    }
}

function Down() {
    if(!tiles[player.location + gridColumns + gridColumns].perimeter &&
        tiles[player.location + gridColumns].state === "remove") {
        player.location = player.location + gridColumns;
        UpdateGrid(player.location);
    }
}

function Left() {
    if(!tiles[player.location - 2].perimeter &&
        tiles[player.location - 1].state === "remove"
    ) {
        player.location = player.location - 1;
        UpdateGrid(player.location);
    }
}

function Right() {
    if(!tiles[player.location + 2].perimeter &&
        tiles[player.location + 1].state === "remove"

    ) {
        player.location = player.location + 1;
        UpdateGrid(player.location);
    }
}