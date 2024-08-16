function GetCraftableItems() {
    let craftables = [];
    for (const item of items) {
        if (!item.craftable) {
            continue;
        }
        if ((item.cost.sticks <= inventory.sticks || !item.cost.sticks) &&
            (item.cost.leaves <= inventory.leaves || !item.cost.leaves) &&
            (item.cost.worms <= inventory.worms || !item.cost.worms) &&
            (item.cost.string <= inventory.string || !item.cost.string)) {
            craftables.push(item);
        }
    }
    return craftables;
}

function Craft(item) {
    if (!inventory[item.name]) {
        inventory[item.name] = 1;
    } else {
        inventory[item.name]++;
    }

    if (item.cost.sticks) {
        inventory.sticks -= item.cost.sticks;
    }
    if (item.cost.string) {
        inventory.string -= item.cost.string;
    }
    if (item.cost.worms) {
        inventory.worms -= item.cost.worms;
    }

    if (item.type === "tool") {
        currentTool = item.name;
        logText.innerHTML = "The " + item.name + " is now equpped to the X button.";
        xAction = "useTool";
    }

    UpdateCraftingMenu();
}