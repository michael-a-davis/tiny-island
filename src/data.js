//DOM elements
const splashScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const bgm = document.getElementById('bgm');
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
const possibleXoptions = document.getElementById('possibleXoptions');
const possibleYoptions = document.getElementById('possibleYoptions');
const menuButton = document.getElementById('menuButton');
const optionsMenu = document.getElementById('optionsMenu');
const musicCheck = document.getElementById('musicCheck');
const saveButton = document.getElementById('saveButton');

//Asset links
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
        perimeterU: "assets/tiles/perimeter-U.png",
        sapling: "assets/tiles/sapling.png"
    },
    icons: {
        arrowDown: "assets/icons/arrow-down.svg",
        arrowLeft: "assets/icons/arrow-left.svg",
        arrowUp: "assets/icons/arrow-up.svg",
        arrowRight: "assets/icons/arrow-right.svg",
        axe: "assets/icons/axe.svg",
        pick: "assets/icons/pick.svg",
        hammer: "assets/icons/hammer.svg",
        fishing: "assets/icons/fishing.svg"
    },
    player: {
        up: "assets/player/back.png",
        down: "assets/player/front.png",
        left: "assets/player/left.png",
        right: "assets/player/right.png"
    }
}

//Object class constructors
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
    constructor(name, type, craftable, quantity, cost) {
        this.name = name;
        this.type = type;
        this.craftable = craftable;
        this.quantity = quantity;
        this.cost = cost;
    }
}

//Items list
let items = [
    new Item("sticks", "basic", false, 1, null),
    new Item("string", "basic", false, 1, null),
    new Item("leaves", "basic", false, 1, null),
    new Item("worms", "basic", false, 1, null),
    new Item("Fishing Pole", "tool", true, 1, {
        sticks: 3,
        string: 3,
        worms: 1
    }),
    new Item("copper", "basic", false, 1, null),
    new Item("Copper Axe", "tool", true, 1, {
        sticks: 3,
        copper: 3
    }),
    new Item("Copper Pick", "tool", true, 1, {
        sticks: 3,
        copper: 3
    }),
    new Item("logs", "basic", false, 1, null),
    new Item("stones", "basic", false, 1, null),
    new Item("Saplings", "placeable", false, 1, null)
]

//Hints list
let hints = [
    "Did you know you can close menus with the B button?",
    "Nice work. Now try shaking trees with the A button.",
    "Try searching the coasts with the A button.",
    "Keep fishing... you might find something precious.",
    "You'll need to make tools at some point."
]

//Misc variable initialization
let cameraColumns = 5;
let cameraScope = cameraColumns ** 2;
let cameraCenter = (cameraScope / 2) - 0.5
let tiles = [];
let gridSize = gridColumns ** 2;
let gridCenter = (gridSize / 2) - 0.5;
let currentTool;
let currentPlaceable;
let haveShakenTree = false;
let hasFishedBefore = false;
let isCrafting = false;
let isHint = false;
let isMenu = false;
let aAction;
let bAction = "closeMenu";
let xAction;
let yAction;
let hasOpenedHint = false;
let inventory = {};
let player = {
    location: gridCenter,
    facing: "down"
}

//Roll functions
function Roll(min, max) {
    let roll = Math.floor(Math.random() * (max - min + 1) + min);
    if (roll === max) {
        return true;
    } else {
        return false;
    }
}

function RollBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}