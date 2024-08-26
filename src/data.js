//Asset links
let assets = {
    icons: {
        arrowUp: "assets/icons/arrow-up.svg",
        arrowRight: "assets/icons/arrow-right.svg",
        arrowDown: "assets/icons/arrow-down.svg",
        arrowLeft: "assets/icons/arrow-left.svg",
        menu: "assets/icons/menu.svg",
        options: "assets/icons/cog.svg",
        logo: "assets/icons/logo.svg"
    },
    audio: {
        sortIsle: "assets/audio/sort-isle.mp3",
        clickNoise: "assets/audio/click.mp3"
    },
    player: {
        up: "assets/player/back.png",
        down: "assets/player/front.png",
        left: "assets/player/left.png",
        right: "assets/player/right.png"
    },
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
        decentWorkbench: "assets/tiles/workbench1.png",
        hole: "assets/tiles/hole.png",
        brickWet: "assets/tiles/brick-wet.png",
        brickDry: "assets/tiles/brick-dry.png",
        furnace: "assets/tiles/furnace.png"
    }
}

let gridLayers = [
    "baseLayer",
    "objectLayer", 
    "playerLayer", 
    "timeLayer"
]
let faceButtons = [
    "arrowLeft",
    "arrowRight",
    "arrowUp",
    "arrowDown",
    "A",
    "B",
    "X",
    "Y",
    "menu",
    "options",
    "hint"
]
let options = [
    "Music", "Buttons", "Theme"
]
let themes = [
    "Original", "BoyGame", "Cream", "Midnight"
]

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