//DOM elements
const body = document.getElementById('body');
const splashScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const bgm = document.getElementById('bgm');
const clickSound = document.getElementById('clickSound');
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
const inventoryButton = document.getElementById('inventoryButton');
const inventoryBox = document.getElementById('inventoryMenu');
const craftBox = document.getElementById('craftingMenu');
const hintBox = document.getElementById('hintBox');
const hintText = document.getElementById('hintText');
const logText = document.getElementById('logText');
const inventoryList0 = document.getElementById('inventoryList0');
const inventoryList1 = document.getElementById('inventoryList1');
const craftList = document.getElementById('possibleCrafts');
const possibleXoptions = document.getElementById('possibleXoptions');
const possibleYoptions = document.getElementById('possibleYoptions');
const menuButton = document.getElementById('menuButton');
const optionsMenu = document.getElementById('optionsMenu');
const musicCheck = document.getElementById('musicCheck');
const clickCheck = document.getElementById('clickCheck');
const saveButton = document.getElementById('saveButton');
const themeSelect = document.getElementById('themeSelect');
const timeFilter = document.getElementById('time');

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
        sapling: "assets/tiles/sapling.png",
        crappyWorkbench: "assets/tiles/crappy-workbench.png",
        hole: "assets/tiles/hole.png",
        brickWet: "assets/tiles/brick-wet.png",
        brickDry: "assets/tiles/brick-dry.png"
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
    constructor(id, coords, biome, state, perimeter, shore, collision) {
        this.id = id;
        this.coords = coords;
        this.biome = biome;
        this.state = state;
        this.perimeter = perimeter;
        this.shore = shore;
        this.collision = collision;
    }
}
class BasicItem {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}
class Tool {
    constructor(name, tier, durability, quantity, cost) {
        this.name = name;
        this.tier = tier;
        this.durability = durability;
        this.quantity = quantity;
        this.cost = cost;
    }
}
class Placeable {
    constructor(name, quantity, cost) {
        this.name = name;
        this.quantity = quantity;
        this.cost = cost;
    }
}

//Items list
let inventory = {
    sticks: new BasicItem("sticks", 0),
    string: new BasicItem("string", 0),
    saplings: new Placeable("saplings", 0, null),
    fire_Plough: new Tool("fire_Plough", 0, 15, 0, {sticks: 5, string: 5}),
    worms: new BasicItem("worms", 0),
    crappy_Fishing_Pole: new Tool("crappy_Fishing_Pole", 0, 15, 0, {sticks: 3, string: 3, worms: 1}),
    bass: new BasicItem("bass", 0),
    salmon: new BasicItem("salmon", 0),
    clownfish: new BasicItem("clownfish", 0),
    rubber_Tire: new BasicItem("rubber_Tire", 0),
    copper: new BasicItem("copper", 0),
    copper_Chisel: new Tool("copper_Chisel", 0, 15, 0, {sticks: 1, copper: 1}),
    copper_Spade: new Tool("copper_Spade", 0, 15, 0, {sticks: 2, copper: 2}),
    stones:  new BasicItem("stones", 0),
    wet_Clay: new BasicItem("wet_Clay", 0),
    wet_Clay_Bricks: new Placeable("wet_Clay_Bricks", 0, {wet_Clay: 2}),
    bricks: new BasicItem("bricks", 0),
    workbench: new Placeable("workbench", 0, null),
    workbench_Upgrade_Tier_1: new Tool("workbench_Upgrade_Tier_1", 0, null, 0, {sticks: 10, stones: 10, copper_Chisel: 1, string: 5}),
    stone_Spade: new Tool("stone_Spade", 1, 30, 0, {sticks: 2, stones: 2}),
    stone_Chisel: new Tool("stone_Chisel", 1, 30, 0, {sticks: 1, stones: 1}),
    stone_Axe: new Tool("stone_Axe", 1, 30, 0, {sticks: 3, stones: 5}),
    stone_Pick: new Tool("stone_Pick", 1, 30, 0, {sticks: 3, stones: 5}),
    logs: new BasicItem("logs", 0),
    iron: new BasicItem("iron", 0),
    gold: new BasicItem("gold", 0)
}
let workbenchTier = 0;

//Hints list & associated variables
let hints = [
    "It seems you've washed ashore a tiny island... (Press B to close)",
    "Nice work. Now try shaking trees with the A button.",
    "Try searching the coasts with the A button.",
    "There must be a crafting bench around here somewhere.",
    "Keep fishing... you might find something precious.",
    "You'll need to make better tools at some point."
]
let hasOpenedHint = false;
let haveShakenTree = false;
let haveSearchedCoasts = false;
let hasFishedBefore = false;
let toolHasBroken = false;

//Misc variable initialization
let cameraColumns = 5;
let cameraScope = cameraColumns ** 2;
let cameraCenter = (cameraScope / 2) - 0.5;
let tiles = [];
let gridRows = gridColumns;
let gridSize = gridColumns ** 2;
let gridCenter = (gridSize / 2) - 0.5;
let widthCenter = (gridColumns / 2) - 0.5;
let playerStart = gridSize - gridColumns - gridColumns - widthCenter - (Math.floor(widthCenter / 2));
let currentTool;
let currentPlaceable;
let toolCount = 0;
let placeableCount = 0;
let haveGotSapling = false;
let isCrafting = false;
let isHint = true;
let isMenu = false;
let isInventory = false;
let aAction;
let player = {
    location: playerStart,
    facing: "up"
}

//Universal functions
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

function ConvertName(obj) {
    let objName = obj.name.replace(/_/g, ' ');
    return `${objName.charAt(0).toUpperCase() + objName.slice(1)}`;
}