LoadSaveData();
GenerateGUI();
const splashScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const bgm = document.getElementById('bgm');
const clickSound = document.getElementById('clickSound');
const islandGrid = document.getElementById('baseLayer');
const playerGrid = document.getElementById('playerLayer');
const timeFilter = document.getElementById('timeLayer');
const controlsBox = document.getElementById('buttonContainer');
const upButton = document.getElementById('arrowUpButton');
const downButton = document.getElementById('arrowDownButton');
const leftButton = document.getElementById('arrowLeftButton');
const rightButton = document.getElementById('arrowRightButton');
const aButton = document.getElementById('AButton');
const bButton = document.getElementById('BButton');
const xButton = document.getElementById('XButton');
const yButton = document.getElementById('YButton');
const hintButton = document.getElementById('hintButton');
const menuButton = document.getElementById('menuButton');
const optionsButton = document.getElementById('optionsButton');
const inventoryBox = document.getElementById('inventoryMenu');
const optionsMenu = document.getElementById('optionsMenu');
const craftBox = document.getElementById('craftingMenu');
const hintBox = document.getElementById('hintMenu');
const hintText = document.getElementById('hintText');
const logText = document.getElementById('logText');
const inventoryList = document.getElementById('inventoryList');
const crafterList = document.getElementById('crafterList');
const craftableColumn = document.getElementById('craftableColumn');
const musicCheck = document.getElementById('musicCheck');
const clickCheck = document.getElementById('buttonsCheck');
const themeSelect = document.getElementById('themeSelect');
const xColumn = document.getElementById('xColumn');
const yColumn = document.getElementById('yColumn');
const saveButton = document.getElementById('saveGame');
const eraseButton = document.getElementById('eraseSave');
const confirmBox = document.getElementById('confirmMenu');
const confirmText = document.getElementById('confirmText');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

if (!localStorage.getItem('saveState')) {
    GenerateIsland();
    GenerateGrid();
    UpdateGrid(player.location);
}
else {
    GenerateGrid();
    UpdateGrid(player.location);
}
startButton.addEventListener('click', function() {
    bgm.play();
    splashScreen.classList.add('fade-out');
    timeFilter.classList.add('pass-time');
});
GenerateControls();