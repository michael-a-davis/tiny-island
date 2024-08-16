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

function DetermineOnCoast() {
    if (tiles[player.location].shore) {
        return true;
    } else {
        return false;
    }
}


function ShakeTree() {
    gotStick = Roll(1, stickChance);
    gotLeaf = Roll(1, leafChance);
    gotString = Roll(1, stringChance);

    if (gotStick) {
        logText.innerHTML = "You shook the tree, and got a stick!";
        if (!inventory.sticks) {
            inventory.sticks = 1;
        } else {
            inventory.sticks++;
        }
        return;
    } else if (gotLeaf) {
        logText.innerHTML = "You shook the tree, and got a BIG leaf!";
        if (!inventory.leaves) {
            inventory.leaves = 1;
        } else {
            inventory.leaves++;
        }
        return;
    } else if (gotString) {
        logText.innerHTML = "You shook the tree, and a spider came out! You got its string!";
        if (!inventory.string) {
            inventory.string = 1;
        } else {
            inventory.string++;
        }
        return;
    }
    else {
        logText.innerHTML = "You shook the tree, but nothing happened."
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