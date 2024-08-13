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
    constructor(location, inventory) {
        this.location = location;
        this.inventory = inventory;
    }
}

let cameraColumns = 5;
let cameraScope = cameraColumns ** 2;
let cameraCenter = (cameraScope / 2) - 0.5
let currentTool = "path";
let tiles = [];
let gridSize = gridColumns ** 2;
let gridCenter = (gridSize / 2) - 0.5;
let player = new Player(gridCenter, {})


const toolBox = document.getElementById('toolBox');
const islandGrid = document.getElementById('islandGrid');
const controlsBox = document.getElementById('controlsBox');
const playerGrid = document.getElementById('playerGrid');
islandGrid.style.gridTemplateColumns = `repeat(${cameraColumns}, 1fr)`;
islandGrid.style.gridTemplateRows = `repeat(${cameraColumns}, 1fr)`;
playerGrid.style.gridTemplateColumns = `repeat(${cameraColumns}, 1fr)`;
playerGrid.style.gridTemplateRows = `repeat(${cameraColumns}, 1fr)`;

let controls = [
    "up",
    "down",
    "left",
    "right"
]

let tools = [
    new Tool("path", "/assets/tools/shovel.svg", true, paveTool),
    new Tool("tree", "/assets/tools/tree.svg", false, treeTool),
    new Tool("water", "/assets/tools/water.svg", false, waterTool),
    new Tool("remove", "/assets/tools/bulldoze.svg", false, removeTool)
];

function Roll(min, max) {
    let roll = Math.floor(Math.random() * (max - min + 1) + min);
    if (roll === max) {
        return true;
    } else {
        return false;
    }
}