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

window.addEventListener("keydown", function() {
    if (this.event.keyCode == 87) {
        Up();
    }
    if (this.event.keyCode == 83) {
        Down();
    }
    if (this.event.keyCode == 68) {
        Right();
    }
    if (this.event.keyCode == 65) {
        Left();
    }
    console.log(player.facing);
})

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
    playerTile.src = "assets/player/back.png";
    player.facing = "up";
    if(!tiles[player.location - gridColumns].collision) {
        player.location = player.location - gridColumns;
        UpdateGrid(player.location);
    }
}

function Down() {
    playerTile.src = "assets/player/front.png";
    player.facing = "down";
    if(!tiles[player.location + gridColumns].collision) {
        player.location = player.location + gridColumns;
        UpdateGrid(player.location);
    }
}

function Left() {
    playerTile.src = "assets/player/left.png";
    player.facing = "left";
    if(!tiles[player.location - 1].collision) {
        player.location = player.location - 1;
        UpdateGrid(player.location);
    }
}

function Right() {
    playerTile.src = "assets/player/right.png";
    player.facing = "right";
    if(!tiles[player.location + 1].collision) {
        player.location = player.location + 1;
        UpdateGrid(player.location);
    }
}