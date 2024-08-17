function UpdateActions() {
    let facingTree = DetermineFacingTree();
    let onCoast = DetermineOnCoast();
    if (facingTree) {
        aAction = "shakeTree";
    } else if (onCoast) {
        aAction = "searchSand";
    } else {
        aAction = null;
    }
}

function DetermineFacingTree() {
    if (tiles[FindNeighbor("up", player.location)].state === "tree" && player.facing === "up" ||
        tiles[FindNeighbor("down", player.location)].state === "tree" && player.facing === "down" ||
        tiles[FindNeighbor("left", player.location)].state === "tree" && player.facing === "left" ||
        tiles[FindNeighbor("right", player.location)].state === "tree" && player.facing === "right") {
        return true;
    } else {
        return false;
    }
}

function DetermineFacingOcean() {
    if (tiles[FindNeighbor("up", player.location)].perimeter && player.facing === "up" ||
        tiles[FindNeighbor("down", player.location)].perimeter && player.facing === "down" ||
        tiles[FindNeighbor("left", player.location)].perimeter && player.facing === "left" ||
        tiles[FindNeighbor("right", player.location)].perimeter && player.facing === "right") {
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

    hintText.innerHTML = hints[1];

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
    console.log(currentTool);
    switch(currentTool) {
        case "Fishing Pole":
            let isFacingOcean = DetermineFacingOcean();
            if (!isFacingOcean) {
                logText.innerHTML = "You can't fish here, there's no water!";
                break;
            }
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
    }
}