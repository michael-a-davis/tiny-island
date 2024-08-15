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
        if (this.event.keyCode == 74) {
            APress();
        }
        if (this.event.keyCode == 73) {
            BPress();
        }
        if (this.event.keyCode == 76) {
            XPress();
        }
        if (this.event.keyCode == 75) {
            YPress();
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
    xButton.addEventListener("click", function() {
        XPress();
    })
    yButton.addEventListener("click", function() {
        YPress();
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
            let gotStick = Roll(1, 3);
            let gotSeed = Roll(1, 3);
            if (!gotStick && !gotSeed || gotStick & gotSeed) {
                logText.innerHTML = "You shook the tree, but nothing happened.";
                break;
            }
            else if (!gotStick && gotSeed) {
                player.inventory.Seeds++;
                logText.innerHTML = "You shook the tree, and got a seed!";
                break;
            }
            else if (gotStick && !gotSeed) {
                player.inventory.Sticks++;
                logText.innerHTML = "You shook the tree, and got a stick!";
                break;
            }
        case "grabRock":
            let gotRock = Roll(1, 5);
            if (!gotRock) {
                logText.innerHTML = "You tried to break off a piece of rock, but you couldn't.";
                break;
            }
            if (gotRock) {
                player.inventory.Rocks++;
                logText.innerHTML = "You found a rock! You now have " + player.inventory.Rocks + " rocks.";
                break;
            }
        default:
            logText.innerHTML = "There's nothing to do here...";
            break;
    }
}