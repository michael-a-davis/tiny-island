let haveShakenTree = false;
let hasFishedBefore = false;

function UpdateActions() {
    let facingTree = DetermineFacing("tree");
    let onCoast = DetermineOnCoast();
    if (facingTree) {
        aAction = "shakeTree";
    } else if (onCoast) {
        aAction = "searchSand";
    } else {
        aAction = null;
    }
}

function DetermineFacing(object) {
    if (tiles[FindNeighbor("up", player.location)].state === object && player.facing === "up" ||
        tiles[FindNeighbor("down", player.location)].state === object && player.facing === "down" ||
        tiles[FindNeighbor("left", player.location)].state === object && player.facing === "left" ||
        tiles[FindNeighbor("right", player.location)].state === object && player.facing === "right") {
        return true;
    } else {
        return false;
    }
}

function DetermineOnCoast() {
    if (tiles[player.location].shore) {
        return true;
    } else {
        return false;
    }
}

function ShakeTree() {
    let odds = RollBetween(1, 100);
    let gotSomething = Roll(1, 2);

    if (!haveShakenTree) {
        hintText.innerHTML = hints[2];
    }
    haveShakenTree = true;

    if (!gotSomething) {
        logText.innerHTML = "You shook the tree, but nothing happened.";
        return;
    }

    if (odds >= 75) {
        logText.innerHTML = "You shook the tree, and a spider came out! You got its string!";
        if (!inventory.string) {
            inventory.string = items[1];
        } else {
            inventory.string.quantity++;
        }
        console.log(inventory);
        return;
    } else if (odds >= 50) {
        logText.innerHTML = "You shook the tree, and got a BIG leaf!";
        if (!inventory.leaves) {
            inventory.leaves = items[2];
        } else {
            inventory.leaves.quantity++;
        }
        console.log(inventory);
        return;
    }
    else {
        logText.innerHTML = "You shook the tree, and got a stick!";
        if (!inventory.sticks) {
            inventory.sticks = items[0];
        } else {
            inventory.sticks.quantity++;
        }
        console.log(inventory);
        return;
    }
}

function SearchSand() {
    gotWorm = Roll(1, wormChance);

    if (gotWorm) {
        logText.innerHTML = "WOAH! You found a worm, creeping and crawling through the sand!";
        if (!inventory.worms) {
            inventory.worms = items[3];
        } else {
            inventory.worms.quantity++;
        }
    } else {
        logText.innerHTML = "You play in the sand, but find nothing.";
    }
}

function UseTool() {
    switch(currentTool) {
        case "Fishing Pole":
            let isFacingOcean = DetermineFacing("water");
            if (!isFacingOcean) {
                logText.innerHTML = "You can't fish here, there's no water!";
                break;
            }
            if (!hasFishedBefore) {
                UpdateHint();
            }
            hasFishedBefore = true;
            let odds = RollBetween(1, 100);
            let gotSomething = Roll(1, 2);
            if (!gotSomething) {
                logText.innerHTML = "You cast your line... But caught nothing."
                break;
            }
            if (odds > 85) {
                logText.innerHTML = "You cast your line... And you caught... a copper nugget?!"
                if (!inventory.copper) {
                    inventory.copper = items[5];
                } else {
                    inventory.copper.quantity++;
                }
            }
            else {
                logText.innerHTML = "TRY AGAIN LOSER!";
            }
            break;
        case "Copper Axe":
            let isFacingTree = DetermineFacing("tree");
            if (!isFacingTree) {
                logText.innerHTML = "You swing your axe, but hit nothing...";
                break;
            }
            RemoveByTool();
            logText.innerHTML = "You cut down the tree, and got a log!";
            if (!inventory.logs) {
                inventory.logs = items[8];
            } else {
                inventory.logs.quantity++;
            }
            UpdateGrid(player.location);
            break;
        default:
            break;
        case "Copper Pick":
            let isFacingRock = DetermineFacing("rock");
            if (!isFacingRock) {
                logText.innerHTML = "You swing your pick, and hit nothing...";
                break;
            }
            RemoveByTool();
            logText.innerHTML = "You swung at the rock, and got a chunk of stone!";
            if (!inventory.stones) {
                inventory.stones = items[9];
            } else {
                inventory.stones.quantity++;
            }
            UpdateGrid(player.location);
            break;

    }
}

function SwapTool() {
    let tools = [];

    for (const key in inventory) {
        if (inventory[key].type === "tool") {
            tools.push(inventory[key]);
        }
    }

    let currentToolIndex;

    for (i = 0; i < tools.length; i++) {
        if (tools[i].name === currentTool) {
            currentToolIndex = i;
            break;
        }
    }

    if (currentToolIndex >= tools.length - 1) {
        currentTool = tools[0].name;
    } else {
        currentTool = tools[currentToolIndex + 1].name;
    }
    logText.innerHTML = "The " + currentTool + " is now equipped to the X button."
}

function RemoveByTool() {
    if (player.facing === "up") {
        tiles[FindNeighbor("up", player.location)].state = "remove";
        tiles[FindNeighbor("up", player.location)].collision = false;
    }
    if (player.facing === "down") {
        tiles[FindNeighbor("down", player.location)].state = "remove";
        tiles[FindNeighbor("down", player.location)].collision = false;
    }
    if (player.facing === "right") {
        tiles[FindNeighbor("right", player.location)].state = "remove";
        tiles[FindNeighbor("right", player.location)].collision = false;
    }
    if (player.facing === "left") {
        tiles[FindNeighbor("left", player.location)].state = "remove";
        tiles[FindNeighbor("left", player.location)].collision = false;
    }
}