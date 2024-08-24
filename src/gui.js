musicCheck.addEventListener("change", function() {
    if (musicCheck.checked) {
        bgm.muted = false;
    } else {
        bgm.muted = true;
    }
})

clickCheck.addEventListener("change", function() {
    if (clickCheck.checked) {
        clickSound.muted = false;
    } else {
        clickSound.muted = true;
    }
})

themeSelect.addEventListener("change", function() {
    const options = document.getElementsByClassName('theme-option');
    for (i = 0; i < options.length; i++) {
        if (!options[i].selected) {
            body.classList.remove(options[i].value);
            continue;
        }
        body.classList.add(options[i].value);
    }
})

brightnessSlider.addEventListener("input", function() {
    let value = 100 - brightnessSlider.value;
    brightness.style.opacity = `${value}%`;
})

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
}

function CloseHint() {
    isHint = false;
    hintBox.classList.add('hidden');
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
    inventoryBox.classList.remove('hidden');
    inventoryBox.style.display = "grid";
    UpdateCraftingMenu();
}

function CloseInventory() {
    isInventory = false;
    inventoryBox.classList.add('hidden');
    inventoryBox.style.display = "none";
}

function OpenCrafting() {
    isCrafting = true;
    CloseHint();
    CloseMenu();
    CloseInventory();
    craftBox.classList.remove('hidden');
    craftBox.style.display = "grid";
    UpdateCraftingMenu();
}

function UpdateCraftingMenu() {
    //Clears the HTML
    inventoryList0.innerHTML = "";
    inventoryList1.innerHTML = "";
    craftList.innerHTML = "";
    possibleXoptions.innerHTML = "";
    possibleYoptions.innerHTML = "";

    //Displays inventory
    let crafters = GetFromInventoryOfType(BasicItem);
    for (i = 0; i < 2; i++) {
        for (const crafter of crafters) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${crafter.name.charAt(0).toUpperCase() + crafter.name.slice(1)}: ${inventory[crafter.name].quantity}`;
            if (i === 0) {
                inventoryList0.appendChild(listItem);
            }
            else {
                inventoryList1.appendChild(listItem);
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
        craftList.appendChild(button);
    }

    //Displays X Assignemnt Buttons
    let tools = GetFromInventoryOfType(Tool);
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
        possibleXoptions.append(button);
    }

    //Displays Y Assignment Buttons
    let placeables = GetFromInventoryOfType(Placeable);
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
        possibleYoptions.append(button);
    }
}

function CloseCrafting() {
    isCrafting = false;
    craftBox.classList.add('hidden');
    craftBox.style.display = "none";
}

function OpenMenu() {
    isMenu = true;
    CloseCrafting();
    CloseHint();
    CloseInventory();
    optionsMenu.classList.remove('hidden');
}

function CloseMenu() {
    isMenu = false;
    optionsMenu.classList.add('hidden');
}