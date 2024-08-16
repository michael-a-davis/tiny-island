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
            inventory.string = 1;
        } else {
            inventory.string++;
        }
        return;
    } else if (odds >= 50) {
        logText.innerHTML = "You shook the tree, and got a BIG leaf!";
        if (!inventory.leaves) {
            inventory.leaves = 1;
        } else {
            inventory.leaves++;
        }
        return;
    }
    else {
        logText.innerHTML = "You shook the tree, and got a stick!";
        if (!inventory.sticks) {
            inventory.sticks = 1;
        } else {
            inventory.sticks++;
        }
        return;
    }
}

function SearchSand() {
    gotWorm = Roll(1, wormChance);

    if (gotWorm) {
        logText.innerHTML = "WOAH! You found a worm, creeping and crawling through the sand!";
        if (!inventory.worms) {
            inventory.worms = 1;
        } else {
            inventory.worms++;
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
            } else {
                logText.innerHTML = "You CAN fish here, there IS water!";
            }
            break;
    }
}