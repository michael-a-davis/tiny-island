class Tile {
    constructor(id, state, perimeter, shore, collision) {
        this.id = id;
        this.state = state;
        this.perimeter = perimeter;
        this.shore = shore;
        this.collision = collision;
    }
}
class Item {
    constructor(name, craftable, cost, type) {
        this.name = name;
        this.craftable = craftable;
        this.cost = cost;
        this.type = type;
    }
}

let assets = {
    tiles: {
        grass: "assets/tiles/grass.png",
        rocks: "assets/tiles/rocks.png",
        tree: "assets/tiles/tree.png",
        water: "assets/tiles/water.png",
        cornerDL: "assets/tiles/corner-DL.png",
        cornerDR: "assets/tiles/corner-DR.png",
        cornerUL: "assets/tiles/corner-UL.png",
        cornerUR: "assets/tiles/corner-UR.png",
        perimeterD: "assets/tiles/perimeter-D.png",
        perimeterL: "assets/tiles/perimeter-L.png",
        perimeterR: "assets/tiles/perimeter-R.png",
        perimeterU: "assets/tiles/perimeter-U.png"
    },
    icons: {
        arrowDown: "assets/icons/arrow-down.svg",
        arrowLeft: "assets/icons/arrow-left.svg",
        arrowUp: "assets/icons/arrow-up.svg",
        arrowRight: "assets/icons/arrow-right.svg",
        axe: "assets/icons/axe.svg",
        pick: "assets/icons/pick.svg",
        hammer: "assets/icons/hammer.svg"
    },
    player: {
        up: "assets/player/back.png",
        down: "assets/player/front.png",
        left: "assets/player/left.png",
        right: "assets/player/right.png"
    }
}
let cameraColumns = 5;
let cameraScope = cameraColumns ** 2;
let cameraCenter = (cameraScope / 2) - 0.5
let tiles = [];
let gridSize = gridColumns ** 2;
let gridCenter = (gridSize / 2) - 0.5;
let player = {
    location: gridCenter,
    facing: "down"
}
let inventory = {};
let items = [
    new Item(
        "Stick",
        false,
        null,
        "basic"
    ),
    new Item(
        "Leaf",
        false,
        null,
        "basic"
    ),
    new Item(
        "Crappy Fishing Pole",
        true,
        {
            sticks: 3,
            string: 3,
            worms: 1
        },
        "tool"
    ),
    new Item(
        "Leaf Tent",
        true,
        {
            sticks: 8,
            leaves: 8
        },
        "house"
    )
]
const islandGrid = document.getElementById('islandGrid');
const playerGrid = document.getElementById('playerGrid');
const controlsBox = document.getElementById('controlsBox');
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const aButton = document.getElementById('aButton');
const bButton = document.getElementById('bButton');
const xButton = document.getElementById('xButton');
const yButton = document.getElementById('yButton');
const hintButton = document.getElementById('hintButton');
const craftButton = document.getElementById('craftButton');
const craftBox = document.getElementById('craftingMenu');
const hintBox = document.getElementById('hintBox');
const closeHint = document.getElementById('closeHint');
const closeCraft = document.getElementById('closeCraft');
const hintText = document.getElementById('hintText');
const logText = document.getElementById('logText');
const inventoryList = document.getElementById('inventoryList');
const craftList = document.getElementById('possibleCrafts');

function Roll(min, max) {
    let roll = Math.floor(Math.random() * (max - min + 1) + min);
    if (roll === max) {
        return true;
    } else {
        return false;
    }
}