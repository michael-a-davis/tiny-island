//Action processing
function UpdateActions() {
    let facingTree = DetermineFacing("tree");
    let onCoast = DetermineOn("coast");
    let facingBench0 = DetermineFacing("workbench0");
    let facingBench1 = DetermineFacing("workbench1");
    let onDryBrick = DetermineOn('brick-dry');
    if (facingBench0 || facingBench1) {
        aAction = "toggleCrafting"
    }
    else if (facingTree) {
        aAction = "shakeTree";
    } 
    else if (onCoast) {
        aAction = "searchSand";
    } 
    else if (onDryBrick) {
        aAction = "pickUpBrick";
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

function DetermineOn(state) {
    if (state === "coast") {
        if (tiles[player.location].shore) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (tiles[player.location].state === state) {
            return true;
        } else {
            return false;
        }
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
        case "fishing_Pole":
            UseFishingPole();
            break;
        case "copper_Chisel":
        case "stone_Chisel":
            UseChisel();
            break;
        case "copper_Spade":
        case "stone_Spade":
            UseSpade();
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
        case "wet_Clay_Bricks":
            PlaceWetBricks();
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

function AddByTool(direction, state) {
    let tile = tiles[FindNeighbor(direction, player.location)];
    tile.state = state;
    switch(state) {
        case "sapling":
            SaplingGrows(tile.id);
            tile.collision = true;
            break;
        case "brick-wet":
            BrickDries(tile.id);
            break;
        case "workbench0":
            tile.collision = true;
            break;
        default:
            break;

    }
    UpdateActions();
}

function AddToInventory(item) {
    for (const object in inventory) {
        if (item === inventory[object].name) {
            inventory[object].quantity++;
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
            logText.innerHTML = "You shook the tree, and got a sapling! Maybe you can plant them somehow?"
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
        logText.innerHTML = "You cast your line... but you didn't catch anything.";
        return;
    }
    if (odds > 90) {
        logText.innerHTML = "You cast your line... and you caught... a copper nugget?!";
        AddToInventory('copper');
    }
    else if (odds > 70) {
        logText.innerHTML = "You cast your line... and you caught a clownfish!";
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
        switch(toolUsed.tier) {
            case 0:
                toolUsed.durability = 15;
                break;
            case 1:
                toolUsed.durability = 30;
                break;
            case 2:
                toolUsed.durability = 60;
                break;
            case 3:
                toolUsed.durability = 120;
                break;
            case 4:
                toolUsed.durability = 250;
                break;
        }
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

function UseSpade() {
    let isFacingEmpty = DetermineFacing("remove");
    let onCoast = DetermineOnCoast();
    if (isFacingEmpty) {
        AddByTool(player.facing, 'hole');
        UpdateGrid(player.location);
        logText.innerHTML = "You dug a small hole in the ground!";
        CheckDurability();
    }
    else if (onCoast) {
        let gotClay = Roll(1, 3);
        if (gotClay) {
            logText.innerHTML = "You dug in the sand, and found some wet clay!";
            AddToInventory('wet_Clay');
        } else {
            logText.innerHTML = "You dug in the sand, but didn't find anything.";
        }
        CheckDurability();
    }
    else {
        logText.innerHTML = "You can't dig here...";
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
    let isFacingHole = DetermineFacing("hole");
    if (!isFacingHole) {
        logText.innerHTML = "You can't plant that here...";
        return;
    }
    AddByTool(player.facing, "sapling");
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
    AddByTool(player.facing, "workbench0");
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
    AddByTool(player.facing, 'workbench1');
    UpdateGrid(player.location);
    logText.innerHTML = "You upgraded the work bench!";
    inventory.workbench_Upgrade_Tier_1.quantity--;
    workbenchTier++;
}

function PlaceWetBricks() {
    let isFacingEmpty = DetermineFacing("remove");
    if (!isFacingEmpty) {
        logText.innerHTML = "You can't place that here...";
        return;
    }
    AddByTool(player.facing, 'brick-wet');
    UpdateGrid(player.location);
    inventory.wet_Clay_Bricks.quantity--;
    if (inventory.wet_Clay_Bricks.quantity === 0) {
        logText.innerHTML = "You've placed your last wet brick!";
        currentPlaceable = null;
    }
    else {
        logText.innerHTML = "You placed a wet brick! I wonder if it will dry?";
    }
}

function BrickDries(brickLocation) {
    let maxSpeed = brickDryMax * 60000;
    let minSpeed = brickDryMin * 60000;
    let speed = RollBetween(minSpeed, maxSpeed);
    setTimeout(() => {
        tiles[brickLocation].state = "brick-dry";
        UpdateGrid(player.location);
    }, speed);
}

function PickUpBrick() {
    tiles[player.location].state = "remove";
    AddToInventory('bricks');
    UpdateGrid(player.location);
    logText.innerHTML = "You picked up the brick!"
}