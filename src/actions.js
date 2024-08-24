//Action processing
function UpdateActions() {
    let facingTree = DetermineFacing("tree");
    let onCoast = DetermineOnCoast();
    let facingBench = DetermineFacing("workbench0");
    if (facingBench) {
        aAction = "toggleCrafting"
    }
    else if (facingTree) {
        aAction = "shakeTree";
    } 
    else if (onCoast) {
        aAction = "searchSand";
    } 
    else {
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
        case "crappy_Fishing_Pole":
            UseFishingPole();
            break;
        case "copper_Chisel":
            UseChisel();
            break;
        case "stone_Axe":
            UseAxe();
            break;
        case "stone_Pick":
            UsePick();
            break;
        case "workbench_Upgrade_Tier_1":
            UpgradeBench();
            break;
        default:
            break;
    }
}

function UsePlaceable() {
    switch(currentPlaceable) {
        case "saplings":
            PlantSapling();
            break;
        case "workbench":
            PlaceWorkBench();
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
    UpdateActions();
}

function AddToInventory(item) {
    for (const object in inventory) {
        if (item === inventory[object].name) {
            inventory[object].quantity++;
            if (inventory[object] instanceof Tool) {
                inventory[object].durability = 20;
            }
        }
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
        currentPlaceable = "saplings";
        AddToInventory('saplings');
        return;
    }
    else {
        logText.innerHTML = "You shook the tree, and got a stick!";
        AddToInventory('sticks');
    }
}

function SearchSand() {
    let odds = RollBetween(1, 100);

    if (!haveSearchedCoasts) {
        hintText.innerHTML = hints[3];
        haveSearchedCoasts = true;
    }

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
        hintText.innerHTML = hints[4];
        hasFishedBefore = true;
    }
    let odds = RollBetween(1, 100);
    let gotSomething = Roll(1, 2);
    if (!gotSomething) {
        logText.innerHTML = "You cast your line... But you didn't catch anything.";
        return;
    }
    if (odds > 90) {
        logText.innerHTML = "You cast your line... And you caught... a copper nugget?!";
        AddToInventory('copper');
    }
    else if (odds > 70) {
        logText.innerHTML = "You casat your line... And you caught a clownfish!";
        AddToInventory('clownfish');
    }
    else if (odds > 40) {
        logText.innerHTML = "You cast your line... and you caught a salmon!";
        AddToInventory('salmon');
    }
    else {
        logText.innerHTML = "You cast your line... and you caught a bass!";
        AddToInventory('bass');
    }
    CheckDurability();
}

function CheckDurability() {
    let toolUsed = FindItemInInventory(currentTool);
    toolUsed.durability--;
    if (toolUsed.durability === 0) {
        logText.innerHTML = logText.innerHTML + " Uh oh, your " + ConvertName(toolUsed) + " broke!";
        toolUsed.quantity--;
        currentTool = null;
        if (!toolHasBroken) {
            hintText.innerHTML = hints[5];
            toolHasBroken = true;
        }
    }
}

function UseChisel() {
    let isFacingRock = DetermineFacing("rock");
    if (!isFacingRock) {
        logText.innerHTML = "There's nothing to chisel here...";
        return;
    }
    let gotStones = Roll(1, 2);
    if (gotStones) {
        logText.innerHTML = "You chiseled at the rocks, and got a stone!";
        AddToInventory('stones');
        CheckDurability();
    } else {
        logText.innerHTML = "You chiseled at the rocks, and it's beginning to crack...";
        CheckDurability();
    }
}

function UseAxe() {
    let isFacingTree = DetermineFacing("tree");
    let isFacingBench = DetermineFacing("workbench0");
    if (!isFacingTree && !isFacingBench) {
        logText.innerHTML = "You swing your axe, but hit nothing...";
        return;
    }
    RemoveByTool();
    UpdateGrid(player.location);
    if (isFacingTree) {
        logText.innerHTML = "You cut down the tree, and got a log!";
        AddToInventory('logs');
    }
    else if (isFacingBench) {
        logText.innerHTML = "You picked up the crappy workbench! Place it with Y.";
        currentPlaceable = "workbench";
        AddToInventory('workbench');
    }
    CheckDurability();
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
    CheckDurability();
}

function PlantSapling() {
    let isFacingEmpty = DetermineFacing("remove");
    if (!isFacingEmpty) {
        logText.innerHTML = "You can't plant that here...";
        return;
    }
    AddByTool("sapling");
    UpdateGrid(player.location);
    inventory.saplings.quantity--;
    if (inventory.saplings.quantity <= 0) {
        logText.innerHTML = "You planted your last sapling!";
        currentPlaceable = null;
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

function PlaceWorkBench() {
    let isFacingEmpty = DetermineFacing("remove");
    if (!isFacingEmpty) {
        logText.innerHTML = "You can't place that here...";
        return;
    }
    AddByTool("workbench0");
    UpdateGrid(player.location);
    inventory.workbench.quantity--;
    if (inventory.workbench.quantity === 0) {
        logText.innerHTML = "You placed the workbench!";
        currentPlaceable = null;
    }
}

function UpgradeBench() {
    let isFacingBench = DetermineFacing("workbench0");
    if (!isFacingBench) {
        logText.innerHTML = "There's no bench to upgrade here...";
        return;
    }
    logText.innerHTML = "You upgraded the work bench!";
    inventory.workbench_Upgrade_Tier_1.quantity--;
    workbenchTier++;
}