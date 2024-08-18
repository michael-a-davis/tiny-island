let isCrafting = false;
let isHint = false;
let isMenu = false;
let aAction;
let bAction = "closeMenu";
let xAction;
let yAction = "swapTool";

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
        if (this.event.keyCode == 72) {
            ToggleHint();
        }
        if (this.event.keyCode == 69) {
            ToggleCrafting();
        }
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
    hintButton.addEventListener("click", function() {
        ToggleHint();
    });
    craftButton.addEventListener("click", function() {
        ToggleCrafting();
    });
    menuButton.addEventListener("click", function() {
        ToggleMenu();
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
        default:
            logText.innerHTML = "There's nothing to do here...";
            break;
    }
}

function BPress() {
    switch(bAction) {
        case "closeMenu":
            CloseCrafting();
            CloseHint();
            CloseMenu();
            break;
        default:
            break;
    }
}

function XPress() {
    switch(xAction) {
        case "useTool":
            UseTool();
            break;
        default:
            break;
    }
}

function YPress() {
    switch(yAction) {
        case "swapTool":
            SwapTool();
            break;
        default:
            break;
    }
}