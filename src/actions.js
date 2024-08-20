//Action processing
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

function UseTool() {
    switch(currentTool) {
        case "Fishing Pole":
            UseFishingPole();
            break;
        case "Copper Axe":
            UseAxe();
            break;
        case "Copper Pick":
            UsePick();
            break;
        default:
            break;
    }
}

function UsePlaceable() {
    switch(currentPlaceable) {
        case "Saplings":
            PlantSapling();
            break;
        default:
            break;
    }
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

function AddByTool(state) {
    if (player.facing === "up") {
        tiles[FindNeighbor("up", player.location)].state = state;
        tiles[FindNeighbor("up", player.location)].collision = true;
        if (state === "sapling") {
            SaplingGrows(FindNeighbor("up", player.location));
        }
    }
    if (player.facing === "down") {
        tiles[FindNeighbor("down", player.location)].state = state;
        tiles[FindNeighbor("down", player.location)].collision = true;
        if (state === "sapling") {
            SaplingGrows(FindNeighbor("down", player.location));
        }
    }
    if (player.facing === "right") {
        tiles[FindNeighbor("right", player.location)].state = state;
        tiles[FindNeighbor("right", player.location)].collision = true;
        if (state === "sapling") {
            SaplingGrows(FindNeighbor("right", player.location));
        }
    }
    if (player.facing === "left") {
        tiles[FindNeighbor("left", player.location)].state = state;
        tiles[FindNeighbor("left", player.location)].collision = true;
        if (state === "sapling") {
            SaplingGrows(FindNeighbor("left", player.location));
        }
    }
}

function AddToInventory(item) {
    let itemIndex;
    for (i = 0; i < items.length; i++) {
        if (item === items[i].name) {
            itemIndex = i;
            break;
        }
    }
    if (!inventory[item]) {
        inventory[item] = items[itemIndex];
    }
    else {
        inventory[item].quantity++;
    }
}

//Action functions
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

    if (odds > stringChance) {
        logText.innerHTML = "You shook the tree, and a spider came out! You got its string!";
        AddToInventory('string');
        return;
    } 
    else if (odds > saplingChance) {
        if (!haveGotSapling) {
            logText.innerHTML = "You shook the tree, and got a sapling! You can plant it with Y."
            haveGotSapling = true;
        } else {
            logText.innerHTML = "You shook the tree, and got a sapling!";
        }
        currentPlaceable = "Saplings";
        AddToInventory('Saplings');
        return;
    }
    else {
        logText.innerHTML = "You shook the tree, and got a stick!";
        AddToInventory('sticks');
    }
}

function SearchSand() {
    let odds = RollBetween(1, 100);

    if (odds > wormChance) {
        logText.innerHTML = "WOAH! You found a worm, creeping and crawling through the sand!";
        AddToInventory('worms');
    } else {
        logText.innerHTML = "You play in the sand, but find nothing.";
    }
}

function UseFishingPole() {
    let isFacingOcean = DetermineFacing("water");
    if (!isFacingOcean) {
        logText.innerHTML = "You can't fish here, there's no water!";
        return;
    }
    if (!hasFishedBefore) {
        UpdateHint();
    }
    hasFishedBefore = true;
    let odds = RollBetween(1, 100);
    let gotSomething = Roll(1, 2);
    if (!gotSomething) {
        logText.innerHTML = "You cast your line... But caught nothing."
        return;
    }
    if (odds > 85) {
        logText.innerHTML = "You cast your line... And you caught... a copper nugget?!"
        AddToInventory('copper');
    }
    else {
        logText.innerHTML = "TRY AGAIN LOSER!";
    }
}

function UseAxe() {
    let isFacingTree = DetermineFacing("tree");
    if (!isFacingTree) {
        logText.innerHTML = "You swing your axe, but hit nothing...";
        return;
    }
    RemoveByTool();
    UpdateGrid(player.location);
    logText.innerHTML = "You cut down the tree, and got a log!";
    AddToInventory('logs');
}

function UsePick() {
    let isFacingRock = DetermineFacing("rock");
    if (!isFacingRock) {
        logText.innerHTML = "You swing your pick, and hit nothing...";
        return;
    }
    RemoveByTool();
    logText.innerHTML = "You swung at the rock, and got a chunk of stone!";
    AddToInventory('stones');
    UpdateGrid(player.location);
}

function PlantSapling() {
    let isFacingEmpty = DetermineFacing("remove");
    if (!isFacingEmpty) {
        logText.innerHTML = "You can't plant that here...";
        return;
    }
    AddByTool("sapling");
    UpdateGrid(player.location);
    inventory.Saplings.quantity--;
    if (inventory.Saplings.quantity <= 0) {
        logText.innerHTML = "You planted your last sapling!";
        currentPlaceable = 0;
    } else {
        logText.innerHTML = "You planted a sapling!";
    }
}

function SaplingGrows(saplingLocation) {
    let maxSpeed = treeGrowMax * 60000;
    let minSpeed = treeGrowMin * 60000;
    let speed = RollBetween(minSpeed, maxSpeed);
    setTimeout(() => {
        tiles[saplingLocation].state = "tree";
        UpdateGrid(player.location);
    }, speed);
}