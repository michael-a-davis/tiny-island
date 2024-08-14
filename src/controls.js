function GenerateControls() {
    window.addEventListener("keydown", function() {
        if (this.event.keyCode == 87) {
            Move("up");
        }
        if (this.event.keyCode == 83) {
            Move("down");
        }
        if (this.event.keyCode == 68) {
            Move("right");
        }
        if (this.event.keyCode == 65) {
            Move("left");
        }
        if (this.event.keyCode == 75) {
            APress();
        }
        if (this.event.keyCode == 79) {
            BPress();
        }
        console.log(player.facing);
    })
    upButton.addEventListener("click", function() {
        Move("up");
    })
    downButton.addEventListener("click", function() {
        Move("down");
    })
    leftButton.addEventListener("click", function() {
        Move("left");
    })
    rightButton.addEventListener("click", function() {
        Move("right");
    })
    aButton.addEventListener("click", function() {
        APress();
    })
    bButton.addEventListener("click", function() {
        BPress();
    })
}

function Move(direction) {
    logText.innerHTML = "";
    switch(direction) {
        case "up":
            playerTile.src = assets.player.up;
            break;
        case "down":
            playerTile.src = assets.player.down;
            break;
        case "left":
            playerTile.src = assets.player.left;
            break;
        case "right":
            playerTile.src = assets.player.right;
            break;
        default:
            console.log("invalid");
            break;
    }
    player.facing = direction;
    UpdateActions();
    if (tiles[FindNeighbor(direction, player.location)].collision) {
        return;
    }
    player.location = FindNeighbor(direction, player.location);
    UpdateActions();
    UpdateGrid(player.location);
}

function APress() {
    switch(currentAction) {
        case "shakeTree":
            let gotStick = Roll(1, 5);
            if (!gotStick) {
                logText.innerHTML = "You shook the tree!";
                break;
            }
            if (gotStick) {
                player.inventory.sticks++;
                logText.innerHTML = "You shook the tree, and got a stick! You now have " + player.inventory.sticks + " sticks.";
                console.log(player.inventory);
                break;
            }
        default:
            logText.innerHTML = "There's nothing to do here...";
            break;
    }
}