function UpdateActions() {
    let facingTree = DetermineFacingTree();
    if (facingTree) {
        aAction = "shakeTree";
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


function ShakeTree() {
    gotStick = Roll(1, stickChance);
    gotLeaf = Roll(1, leafChance);

    if (gotStick && gotLeaf || !gotStick && !gotLeaf) {
        logText.innerHTML = "You shook the tree, but nothing happened.";
        return;
    } else if (gotStick) {
        logText.innerHTML = "You shook the tree, and got a stick!";
        if (!inventory.sticks) {
            inventory.sticks = 1;
        } else {
            inventory.sticks++;
        }
    } else if (gotLeaf) {
        logText.innerHTML = "You shook the tree, and got a BIG leaf!";
        if (!inventory.leaves) {
            inventory.leaves = 1;
        } else {
            inventory.leaves++;
        }
    }
}