function ToggleCrafting() {
    if (isCrafting) {
        CloseCrafting();
    } else {
        OpenCrafting();
    }
}

function ToggleHint() {
    if (isHint) {
        CloseHint();
    } else {
        OpenHint();
    }
}

function ToggleInventory() {
    if (isInventory) {
        CloseInventory();
    } else {
        OpenInventory();
    }
}

function ToggleMenu() {
    if (isMenu) {
        CloseMenu();
    } else {
        OpenMenu();
    }
}

function OpenHint() {
    isHint = true;
    CloseMenu();
    CloseCrafting();
    CloseInventory();
    hintBox.classList.remove('hidden');
    hintBox.style.display = "flex";
}

function CloseHint() {
    isHint = false;
    hintBox.classList.add('hidden');
    hintBox.style.display = "none";
    if (!hasOpenedHint) {
        hintText.innerHTML = hints[1];
        hasOpenedHint = true;
    }
}

function OpenInventory() {
    isInventory = true;
    CloseHint();
    CloseMenu();
    CloseCrafting();
    inventoryBox.style.display = "grid";
    UpdateCraftingMenu();
}

function CloseInventory() {
    isInventory = false;
    inventoryBox.style.display = "none";
}

function OpenCrafting() {
    isCrafting = true;
    CloseHint();
    CloseMenu();
    CloseInventory();
    craftBox.style.display = "grid";
    UpdateCraftingMenu();
}

function UpdateCraftingMenu() {
    //Clears the HTML
    inventoryList.innerHTML = "";
    crafterList.innerHTML = "";
    craftableColumn.innerHTML = "";
    xColumn.innerHTML = "";
    yColumn.innerHTML = "";

    //Displays inventory
    let crafters = GetFromInventoryOfType("basic");
    for (i = 0; i < 2; i++) {
        for (const crafter of crafters) {
            const listItem = document.createElement('li');
            let newName = ConvertName(crafter);
            listItem.innerHTML = inventory[crafter.name].quantity + " " + newName;
            if (i === 0) {
                inventoryList.appendChild(listItem);
            }
            else {
                crafterList.appendChild(listItem);
            }
        }
    }
    
    //Displays craftable items
    let craftables = GetCraftableItems();
    for (const craftable of craftables) {
        const button = document.createElement('button');
        let craftableName = ConvertName(craftable);
        button.innerHTML = craftableName;
        button.classList.add('craft-button');
        button.addEventListener("click", function() {
            Craft(craftable);
        })
        craftableColumn.appendChild(button);
    }

    //Displays X Assignemnt Buttons
    let tools = GetFromInventoryOfType("tool");
    for (i = 0; i < tools.length; i++) {
        if (tools[i].quantity === 0) {
            continue;
        }
        const button = document.createElement('button');
        button.classList.add('assign-button');
        let toolName = tools[i].name;
        button.innerHTML = ConvertName(tools[i]);
        if (toolName === currentTool) {
            button.classList.add('assigned');
        }
        button.addEventListener('click', function() {
            currentTool = toolName;
            UpdateCraftingMenu();
        })
        button.innerHTML = ConvertName(tools[i]);
        xColumn.append(button);
    }

    //Displays Y Assignment Buttons
    let placeables = GetFromInventoryOfType("placeable");
    for (const placeable of placeables) {
        if (inventory[placeable.name].quantity === 0) {
            continue;
        }
        const button = document.createElement('button');
        button.classList.add('assign-button');
        let placeableName = placeable.name;
        if (placeableName === currentPlaceable) {
            button.classList.add('assigned');
        }
        button.addEventListener('click', function() {
            currentPlaceable = placeableName;
            UpdateCraftingMenu();
        })
        button.innerHTML = `${inventory[placeable.name].quantity} ` + ConvertName(placeable);
        yColumn.append(button);
    }
}

function CloseCrafting() {
    isCrafting = false;
    craftBox.style.display = "none";
}

function OpenMenu() {
    isMenu = true;
    CloseCrafting();
    CloseHint();
    CloseInventory();
    optionsMenu.style.display = "flex";
}

function CloseMenu() {
    isMenu = false;
    optionsMenu.style.display = "none";
}