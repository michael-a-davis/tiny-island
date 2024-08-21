function GetCraftableItems() {
    let craftables = [];
    for (const item of items) {
        if (item instanceof Tool && workbenchTier >= item.tier) {
            console.log(item);
            let canCraftNow;
            for (const key in item.cost) {
                if (!inventory[key] || item.cost[key] > inventory[key].quantity) {
                    canCraftNow = false;
                    break;
                }
                else if (item.cost[key] <= inventory[key].quantity) {
                    canCraftNow = true;
                }
            }

            if (canCraftNow) {
                craftables.push(item);
            }
        }
    }
    return craftables;
}

function GetFromInventoryOfType(objectClass) {
    let array = [];
    for (const key in inventory) {
        if (inventory[key] instanceof objectClass) {
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

    if (item instanceof Tool) {
        let toolName = ConvertName(item);
        currentTool = item.name;
        let toolCount = 0;
        for (const key in inventory) {
            if (inventory[key] instanceof Tool) {
                toolCount++;
            }
        }
        if (!toolCount === 2) {
            logText.innerHTML = "The " + toolName + " is now equipped to X.";
        }
        else {
            logText.innerHTML = "The " + toolName + " is now equipped to X. Swap tools in the menu.";
        }
    }

    UpdateCraftingMenu();
    console.log(inventory);
}