for (const control of controls) {
    const button = document.createElement('button');
    button.id = control
    const icon = document.createElement('img');
    icon.classList.add('icon');
    switch(control) {
        case "up":
            icon.src = "assets/icons/arrow-up.svg";
            break;
        case "left":
            icon.src = "assets/icons/arrow-left.svg";
            break;
        case "right":
            icon.src = "assets/icons/arrow-right.svg";
            break;
        case "down":
            icon.src = "assets/icons/arrow-down.svg";
            break;
    }
    button.appendChild(icon);
    controlsBox.appendChild(button);
}

const playerTile = document.getElementById("playerTile");
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
    if(!tiles[player.location - gridColumns].collision) {
        playerTile.src = "assets/player/back.png";
        player.location = player.location - gridColumns;
        UpdateGrid(player.location);
    }
}

function Down() {
    if(!tiles[player.location + gridColumns].collision) {
        playerTile.src = "assets/player/front.png";
        player.location = player.location + gridColumns;
        UpdateGrid(player.location);
    }
}

function Left() {
    if(!tiles[player.location - 1].collision) {
        playerTile.src = "assets/player/left.png";
        player.location = player.location - 1;
        UpdateGrid(player.location);
    }
}

function Right() {
    if(!tiles[player.location + 1].collision) {
        playerTile.src = "assets/player/right.png";
        player.location = player.location + 1;
        UpdateGrid(player.location);
    }
}