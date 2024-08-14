function UpdateActions() {
    let neighborStates = GenerateNeighborStateString(player.location);

    if (neighborStates.charAt(0) === "T" && player.facing === "up" ||
        neighborStates.charAt(2) === "T" && player.facing === "right" ||
        neighborStates.charAt(4) === "T" && player.facing === "down" ||
        neighborStates.charAt(6) === "T" && player.facing === "left") {
            currentAction = "shakeTree";
        }
    else {
        currentAction = null;
    }
}