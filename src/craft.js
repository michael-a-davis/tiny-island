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

function GetItemsUsedToCraft() {
    let crafters = []
    for (const key in inventory) {
        if (inventory[key].usedToCraft) {
            crafters.push(inventory[key]);
        }
    }
    console.log(crafters);
    return crafters;
}

function Craft(item) {
    if (!inventory[item.name]) {
        inventory[item.name] = item;
    } else {
        inventory[item.name].quantity++;
    }

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
        if (toolCount < 2) {
            logText.innerHTML = "The " + item.name + " is now equipped to the X button.";
            xAction = "useTool";
        }
        else {
            logText.innerHTML = "The " + item.name + " is now equipped to the X button. Press Y to swap tools."
            yAction = "swapTool";
        }
    }

    UpdateCraftingMenu();
}