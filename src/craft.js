function GetCraftableItems() {
    let craftables = [];
    for (const item in inventory) {
        if (!inventory[item].cost) {
            continue;
        }
        if (inventory[item].tier && workbenchTier < inventory[item].tier) {
            continue;
        }
        let canCraftNow;
        for (const key in inventory[item].cost) {
            if (inventory[key].quantity < inventory[item].cost[key]) {
                canCraftNow = false;
                break;
            }
            if (inventory[item].cost[key] <= inventory[key].quantity) {
                canCraftNow = true;
            }
        }
        if (canCraftNow) {
            craftables.push(inventory[item]);
        }
    }
    return craftables;
}

function GetFromInventoryOfType(objectType) {
    let array = [];
    for (const key in inventory) {
        if (inventory[key].type === objectType && inventory[key].quantity > 0) {
            array.push(inventory[key]);
        }
    }
    return array;
}

function FindItemInInventory(itemName) {
    for (const key in inventory) {
        if (inventory[key].name === itemName) {
            return inventory[key];
        }
    }
}

function Craft(item) {
    AddToInventory(item.name);
    for (const key in item.cost) {
        inventory[key].quantity -= item.cost[key];
    }
    if (item.type === "tool") {
        let toolName = ConvertName(item);
        currentTool = item.name;
        toolCount++;
        if (toolCount === 2) {
            logText.innerHTML = "The " + toolName + " is now equipped to X. Swap tools in the menu.";
        }
        else {
            logText.innerHTML = "The " + toolName + " is now equipped to X.";
        }
    }
    if (item.type === "placeable") {
        let placeableName = ConvertName(item);
        currentPlaceable = item.name;
        placeableCount++;
        if (placeableCount === 2) {
            logText.innerHTML = "The " + placeableName + " is now equipped to Y. Swap tools in the menu.";
        }
        else {
            logText.innerHTML = "The " + placeableName + " is now equipped to Y.";
        }
    }
    UpdateCraftingMenu();
}