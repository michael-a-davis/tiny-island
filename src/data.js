// * --- IMMUTABLE DATA --- * //
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

//GUI data
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
    "Music", "Buttons", "Theme", "Save Game", "Erase Save"
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
class Item {
    constructor(name, type, quantity, tier, durability, cost) {
        this.name = name;
        this.type = type;
        this.quantity = quantity;
        this.tier = tier;
        this.durability = durability;
        this.cost = cost;
    }
}

//Hints list & associated variables
let hints = [
    "It seems you've washed ashore a tiny island... (Press B to close)",
    "Nice work. Now try shaking trees with the A button.",
    "Try searching the coasts with the A button.",
    "There must be a crafting bench around here somewhere.",
    "Keep fishing... you might find something precious.",
    "You'll need to make better tools at some point."
]

//Variables that apply config changes
let cameraColumns = 5;
let cameraScope = cameraColumns ** 2;
let cameraCenter = (cameraScope / 2) - 0.5;
let gridRows = gridColumns;
let gridSize = gridColumns ** 2;
let gridCenter = (gridSize / 2) - 0.5;
let widthCenter = (gridColumns / 2) - 0.5;

//Items list
let inventory = {
    sticks: new Item("sticks", "basic", 0, null, null, null),
    string: new Item("string", "basic", 0, null, null, null),
    saplings: new Item("saplings", "placeable", 0, null, null, null),
    fire_Plough: new Item("fire_Plough", "tool", 0, 0, 15, {sticks: 5, string: 5}),
    worms: new Item("worms", "basic", 0, null, null, null),
    crappy_Fishing_Pole: new Item("crappy_Fishing_Pole", "tool", 0, 0, 15, {sticks: 3, string: 3, worms: 1}),
    bass: new Item("bass", "basic", 0, null, null, null),
    salmon: new Item("salmon", "basic", 0, null, null, null),
    clownfish: new Item("clownfish", "basic", 0, null, null, null),
    copper: new Item("copper", "basic", 0, null, null, null),
    copper_Chisel: new Item("copper_Chisel", "tool", 0, 0, 15, {sticks: 1, copper: 1}),
    copper_Spade: new Item("copper_Spade", "tool", 0, 0, 15, {sticks: 2, copper: 2}),
    stones:  new Item("stones", "basic", 0, null, null, null),
    wet_Clay: new Item("wet_Clay", "basic", 0, null, null ,null),
    wet_Clay_Bricks: new Item("wet_Clay_Bricks", "placeable", 0, 0, null, {wet_Clay: 2}),
    bricks: new Item("bricks", "basic", 0, null, null, null),
    workbench: new Item("workbench", "placeable", 0, null, null, null),
    workbench_Upgrade_Tier_1: new Item("workbench_Upgrade_Tier_1", "tool", 0, 0, null, {sticks: 10, stones: 10, copper_Chisel: 1, string: 5}),
    stone_Spade: new Item("stone_Spade", "tool", 0, 1, 30, {sticks: 2, stones: 2}),
    stone_Chisel: new Item("stone_Chisel", "tool", 0, 1, 30, {sticks: 1, stones: 1}),
    stone_Axe: new Item("stone_Axe", "tool", 0, 1, 30, {sticks: 3, stones: 5}),
    stone_Pick: new Item("stone_Pick", "tool", 0, 1, 30, {sticks: 3, stones: 5}),
    logs: new Item("logs", "basic", 0, null, null, null),
    iron: new Item("iron", "basic", 0, null, null, null),
    gold: new Item("gold", "basic", 0, null, null, null)
}


//Hint data
let hasOpenedHint = false;
let haveShakenTree = false;
let haveSearchedCoasts = false;
let hasFishedBefore = false;
let toolHasBroken = false;

//Various data
let workbenchTier = 0;
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
let theme = themes[0];
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