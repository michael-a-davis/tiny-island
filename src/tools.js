for (i = 0; i < tools.length; i++) {
    if (!tools[i].active) {
        continue;
    }
    const button = document.createElement('button');
    button.classList.add('button');
    button.id = "button" + (i + 1);
    const icon = document.createElement('img');
    icon.classList.add("icon");
    icon.alt = button.id;
    icon.src = tools[i].icon;
    let index = i;
    button.appendChild(icon);
    toolBox.appendChild(button);
}

const axeButton = document.getElementById('button1');
const pickButton = document.getElementById('button2');

axeButton.addEventListener("click", function() {
    UseAxe();
})

pickButton.addEventListener("click", function() {
    UsePick();
})

window.addEventListener("keydown", function() {
    if (this.event.keyCode == 73) {
        UseAxe();
    }
})
function UseAxe() {
    let neighborStates = GenerateNeighborStateString(player.location);
    console.log(neighborStates);
    if (neighborStates.charAt(0) === "T" && player.facing === "up") {
        tiles[player.location - gridColumns].state = "remove";
        tiles[player.location - gridColumns].collision = false;
        UpdateGrid(player.location);
    }
    if (neighborStates.charAt(2) === "T" && player.facing === "right") {
        tiles[player.location + 1].state = "remove";
        tiles[player.location + 1].collision = false;
        UpdateGrid(player.location);
    }
    if (neighborStates.charAt(4) === "T" && player.facing === "down") {
        tiles[player.location + gridColumns].state = "remove";
        tiles[player.location + gridColumns].collision = false;
        UpdateGrid(player.location);
    }
    if (neighborStates.charAt(6) === "T" && player.facing === "left") {
        tiles[player.location - 1].state = "remove";
        tiles[player.location - 1].collision = false;
        UpdateGrid(player.location);
    }
    console.log(GenerateNeighborStateString(player.location));
}

function UsePick() {
    let neighborStates = GenerateNeighborStateString(player.location);
    console.log(neighborStates);
    if (neighborStates.charAt(0) === "R" && player.facing === "up") {
        tiles[player.location - gridColumns].state = "remove";
        tiles[player.location - gridColumns].collision = false;
        UpdateGrid(player.location);
    }
    if (neighborStates.charAt(2) === "R" && player.facing === "right") {
        tiles[player.location + 1].state = "remove";
        tiles[player.location + 1].collision = false;
        UpdateGrid(player.location);
    }
    if (neighborStates.charAt(4) === "R" && player.facing === "down") {
        tiles[player.location + gridColumns].state = "remove";
        tiles[player.location + gridColumns].collision = false;
        UpdateGrid(player.location);
    }
    if (neighborStates.charAt(6) === "R" && player.facing === "left") {
        tiles[player.location - 1].state = "remove";
        tiles[player.location - 1].collision = false;
        UpdateGrid(player.location);
    }
    console.log(GenerateNeighborStateString(player.location));
}