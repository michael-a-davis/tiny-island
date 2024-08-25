function GenerateControls() {
    window.addEventListener("keydown", function() {
        if (this.event.keyCode == 87) {
            Move("up");
            clickSound.play();
        }
        if (this.event.keyCode == 83) {
            Move("down");
            clickSound.play();
        }
        if (this.event.keyCode == 68) {
            Move("right");
            clickSound.play();
        }
        if (this.event.keyCode == 65) {
            Move("left");
            clickSound.play();
        }
        if (this.event.keyCode == 74) {
            APress();
            clickSound.play();
        }
        if (this.event.keyCode == 73) {
            CloseCrafting();
            CloseHint();
            CloseMenu();
            CloseInventory();
            clickSound.play();
        }
        if (this.event.keyCode == 76) {
            UseTool();
            clickSound.play();
        }
        if (this.event.keyCode == 75) {
            UsePlaceable();
            clickSound.play();
        }
        if (this.event.keyCode == 72) {
            ToggleHint();
            clickSound.play();
        }
        if (this.event.keyCode == 69) {
            ToggleInventory();
            clickSound.play();
        }
        if (this.event.keyCode == 79) {
            ToggleMenu();
            clickSound.play();
        }
    })
    upButton.addEventListener("click", function() {
        Move("up");
        clickSound.play();
    })
    downButton.addEventListener("click", function() {
        Move("down");
        clickSound.play();
    })
    leftButton.addEventListener("click", function() {
        Move("left");
        clickSound.play();
    })
    rightButton.addEventListener("click", function() {
        Move("right");
        clickSound.play();
    })
    aButton.addEventListener("click", function() {
        APress();
        clickSound.play();
    })
    bButton.addEventListener("click", function() {
        CloseCrafting();
        CloseHint();
        CloseMenu();
        CloseInventory();
        clickSound.play();
    })
    xButton.addEventListener("click", function() {
        UseTool();
        clickSound.play();
    })
    yButton.addEventListener("click", function() {
        UsePlaceable();
        clickSound.play();
    })
    hintButton.addEventListener("click", function() {
        ToggleHint();
        clickSound.play();
    });
    inventoryButton.addEventListener("click", function() {
        ToggleInventory();
        clickSound.play();
    });
    menuButton.addEventListener("click", function() {
        ToggleMenu();
        clickSound.play();
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
            break;
    }
    player.facing = direction;
    if (!tiles[FindNeighbor(direction, player.location)].collision) {
        player.location = FindNeighbor(direction, player.location);
        UpdateActions();
        UpdateGrid(player.location);
    } else {
        UpdateActions();
        return;
    }
}

function APress() {
    switch(aAction) {
        case "shakeTree":
            ShakeTree();
            break;
        case "searchSand":
            SearchSand();
            break;
        case "toggleCrafting":
            ToggleCrafting();
            break;
        case "pickUpBrick":
            PickUpBrick();
            break;
        default:
            logText.innerHTML = "There's nothing to do here...";
            break;
    }
}