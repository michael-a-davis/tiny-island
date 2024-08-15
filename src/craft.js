function GeneratePossibleCrafts() {
    let possibleCrafts = [];
    if (player.inventory.Sticks >= 3 && player.inventory.Rocks >= 3) {
        possibleCrafts.push("Axe");
        possibleCrafts.push("Pick");
    }
    return possibleCrafts;
}

function Craft(item) {
    player.inventory[item] = item;
}