function GetCraftableItems() {
    let craftables = [];
    for (const item of items) {
        if (!item.craftable) {
            continue;
        }

        let canCraftNow;
        for (const key in item.cost) {
            if (!inventory[key] || item.cost[key] > inventory[key].quantity) {
                canCraftNow = false;
                break;
            }
            if (item.cost[key] <= inventory[key].quantity) {
                canCraftNow = true;
            }
        }

        if (canCraftNow) {
            craftables.push(item);
        }
    }
    return craftables;
}

function GetFromInventoryOfType(type) {
    let array = [];
    for (const key in inventory) {
        if (inventory[key].type === type) {
            array.push(inventory[key]);
        }
    }
    return array;
}

function Craft(item) {
    AddToInventory(item.name);

    for (const key in item.cost) {
        inventory[key].quantity -= item.cost[key];
    }

    if (item.type === "tool") {
        currentTool = item.name;
        let toolCount = 0;
        for (const key in inventory) {
            if (inventory[key].type === "tool") {
                toolCount++;
            }
        }
        if (!toolCount === 2) {
            logText.innerHTML = "The " + item.name + " is now equipped to X.";
            xAction = "useTool";
        }
        else {
            logText.innerHTML = "The " + item.name + " is now equipped to X. Swap tools in the crafting menu.";
        }
    }

    UpdateCraftingMenu();
}