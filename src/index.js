const body = document.getElementById('body');
function GenerateGUI() {
    //Generates the game grid
    const gridContainer = document.createElement('div');
    gridContainer.id = "gridContainer";
    gridContainer.classList.add('game-container');
    const grid = document.createElement('div');
    grid.id = "grid";
    for (const layer of gridLayers) {
        const layerDiv = document.createElement('div');
        layerDiv.id = layer;
        layerDiv.classList.add('grid-layer');
        grid.appendChild(layerDiv);
    }
    gridContainer.append(grid);

    //Generates the UI
    const uiContainer = document.createElement('div');
    uiContainer.id = "uiContainer";
    uiContainer.classList.add('game-container');
    const topBar = document.createElement('div');
    topBar.id = "topBar";
    const gameLog = document.createElement('div');
    gameLog.id = "gameLog";
    const logText = document.createElement('p');
    logText.id = "logText";
    gameLog.appendChild(logText);
    const buttonContainer = document.createElement('div');
    buttonContainer.id = "buttonContainer";
    for (const faceButton of faceButtons) {
        const button = document.createElement('button');
        button.id = faceButton + "Button";
        button.classList.add('face-button');
        if (faceButton === "A" ||
            faceButton === "B" ||
            faceButton === "X" ||
            faceButton === "Y") {
            button.innerHTML = faceButton;
        } 
        else if (faceButton === "hint") {
            button.innerHTML = "?";
        } 
        else {
            const icon = document.createElement('img');
            icon.classList.add('icon');
            icon.src = assets.icons[faceButton];
            button.appendChild(icon);
        }

        if (button.id === "hintButton" || button.id === "optionsButton") {
            topBar.appendChild(button);
        } else {
            buttonContainer.appendChild(button);
        }
    }

    //Generates the options menu
    const optionsMenu = CreateMenu("Options");
    for (const option of options) {
        const group = document.createElement('div');
        group.classList.add('options-group');
        const label = document.createElement('p');
        label.innerHTML = option + ":";
        group.appendChild(label);
        if (option != "Theme") {
            const swap = document.createElement('label');
            swap.classList.add('switch');
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.id = option.toLowerCase() + "Check";
            checkbox.checked = true;
            const slider = document.createElement('span');
            slider.classList.add('slider');
            swap.append(checkbox, slider);
            group.append(label, swap);
            optionsMenu.appendChild(group);
            continue;
        }
        const dropdown = document.createElement('select');
        dropdown.id = "themeSelect";
        dropdown.name = "select-theme";
        for (const theme of themes) {
            const option = document.createElement('option');
            option.innerHTML = theme;
            option.classList.add('theme-option');
            option.value = theme.toLowerCase();
            if (theme === "Original") {
                option.selected;
            }
            dropdown.appendChild(option);
        }
        group.append(label, dropdown);
        optionsMenu.appendChild(group);
    }

    //Generates the inventory menu
    const inventoryMenu = CreateMenu("Inventory");
    const inventoryColumn = document.createElement('div');
    inventoryColumn.id = "inventoryColumn";
    const inventoryList = document.createElement('ul');
    inventoryList.id = "inventoryList";
    inventoryColumn.appendChild(inventoryList);
    const xColumn = document.createElement('div');
    xColumn.id = "xColumn";
    const yColumn = document.createElement('div');
    yColumn.id = "yColumn";
    xColumn.classList.add('assign-row');
    yColumn.classList.add('assign-row');
    inventoryMenu.append(inventoryColumn, xColumn, yColumn);

    //Generates the crafting menu
    const craftingMenu = CreateMenu("Crafting");
    const crafterColumn = document.createElement('div');
    const crafterList = document.createElement('ul');
    crafterList.id = "crafterList";
    crafterColumn.classList.add('crafting-column');
    crafterColumn.appendChild(crafterList);
    const craftableColumn = document.createElement('div');
    craftableColumn.id = "craftableColumn";
    craftableColumn.classList.add('crafting-column');
    craftingMenu.append(crafterColumn, craftableColumn);

    //Generates the start screen
    const startScreen = document.createElement('div');
    startScreen.classList.add('hidden');
    startScreen.id = "startScreen";
    const logoContainer = document.createElement('div');
    logoContainer.id = "logoContainer";
    const logo = document.createElement('img');
    logo.src = assets.icons.logo;
    logo.alt = "Tiny Island";
    logo.decoding = "async";
    logo.width = "400";
    const versionText = document.createElement('h1');
    versionText.innerHTML = version;
    logoContainer.append(logo, versionText);
    const startButton = document.createElement('button');
    startButton.id = "startButton";
    startButton.innerHTML = "START GAME";
    const creditText = document.createElement('div');
    creditText.id = "creditText";
    for (const credit of credits) {
        const text = document.createElement('p');
        text.innerHTML = credit;
        creditText.appendChild(text);
    }
    startScreen.append(logoContainer, startButton, creditText);

    //Generates the audio elements
    const sortIsle = document.createElement('audio');
    sortIsle.id = "bgm";
    sortIsle.src = assets.audio.sortIsle;
    sortIsle.loop;
    const click = document.createElement('audio');
    click.id = "clickSound";
    click.src = assets.audio.clickNoise;

    //Generates the hint box
    const hintMenu = CreateMenu("Hint");
    const hintText = document.createElement('p');
    hintText.id = "hintText";
    hintText.innerHTML = hints[0];
    hintMenu.appendChild(hintText);

    //Appends everything to the DOM
    uiContainer.append(topBar, gameLog, buttonContainer);
    body.append(startScreen, gridContainer, uiContainer, optionsMenu, inventoryMenu, craftingMenu, hintMenu, sortIsle, click);
}

function CreateMenu(name) {
    const menu = document.createElement('div');
    menu.id = name.toLowerCase() + "Menu";
    menu.classList.add('hidden', 'menu');
    const header = document.createElement('h2');
    header.innerHTML = name;
    menu.appendChild(header);
    return menu;
}