function GetCraftableItems() {
    let craftables = [];
    for (const item of items) {
        if (!item.craftable) {
            continue;
        }
        if ((item.cost.sticks <= inventory.sticks || !item.cost.sticks) &&
            (item.cost.leaves <= inventory.leaves || !item.cost.leaves)) {
            craftables.push(item.name);
        }
    }
    return craftables;
}