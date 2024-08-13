class Tile {
    constructor(id, state, perimeter, shore, collision) {
        this.id = id;
        this.state = state;
        this.perimeter = perimeter;
        this.shore = shore;
        this.collision = collision;
    }
}
class Tool {
    constructor(name, icon, toggled, active) {
        this.name = name;
        this.icon = icon;
        this.toggled = toggled;
        this.active = active;
    }
}
class Player {
    constructor(location, inventory, facing) {
        this.location = location;
        this.inventory = inventory;
        this.facing = facing;
    }
}

let cameraColumns = 5;
let cameraScope = cameraColumns ** 2;
let cameraCenter = (cameraScope / 2) - 0.5
let currentTool = "axe";
let tiles = [];
let gridSize = gridColumns ** 2;
let gridCenter = (gridSize / 2) - 0.5;
let player = new Player(gridCenter, {}, "down");

let tools = [
    new Tool("axe", "assets/icons/axe.svg", true, axeTool),
    new Tool("pick", "assets/icons/pick.svg", true, pickTool),
    new Tool("Example", "i", true, false),
    new Tool("Example2", "i", true, false)
];

let controls = [
    "up",
    "down",
    "left",
    "right"
]

const toolBox = document.getElementById('toolBox');
const islandGrid = document.getElementById('islandGrid');
const movementBox = document.getElementById('movementBox');
const playerGrid = document.getElementById('playerGrid');
islandGrid.style.gridTemplateColumns = `repeat(${cameraColumns}, 1fr)`;
islandGrid.style.gridTemplateRows = `repeat(${cameraColumns}, 1fr)`;
playerGrid.style.gridTemplateColumns = `repeat(${cameraColumns}, 1fr)`;
playerGrid.style.gridTemplateRows = `repeat(${cameraColumns}, 1fr)`;

function Roll(min, max) {
    let roll = Math.floor(Math.random() * (max - min + 1) + min);
    if (roll === max) {
        return true;
    } else {
        return false;
    }
}