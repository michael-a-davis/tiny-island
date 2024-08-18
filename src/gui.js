let hints = [
    "Did you know you can close menus with the B button?",
    "Nice work. Now try shaking trees with the A button.",
    "Try searching the coasts with the A button.",
    "Keep fishing... you might find something precious.",
    "You'll need to make some tools at some point."
]
let hasOpenedHint = false;

function UpdateHint() {
    for (i = 0; i < hints.length; i++) {
        if (hintText.innerHTML === hints[i]) {
            hintText.innerHTML = hints[i + 1];
            return;
        }
    }
}

musicCheck.addEventListener("change", function() {
    if (musicCheck.checked) {
        bgm.muted = false;
    } else {
        bgm.muted = true;
    }
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
    hintBox.classList.remove('hidden');
}

function CloseHint() {
    isHint = false;
    hintBox.classList.add('hidden');
    if (!hasOpenedHint) {
        UpdateHint();
        hasOpenedHint = true;
    }
}

function OpenCrafting() {
    isCrafting = true;
    CloseHint();
    CloseMenu();
    craftBox.classList.remove('hidden');
    craftBox.style.display = "grid";
    UpdateCraftingMenu();
}

function UpdateCraftingMenu() {
    inventoryList.innerHTML = "";
    craftList.innerHTML = "";

    let crafters = GetItemsUsedToCraft();
    for (const crafter of crafters) {
        if (inventory[crafter.name].quantity === 0) {
            continue;
        }
        const listItem = document.createElement('li');
        listItem.innerHTML = `${crafter.name.charAt(0).toUpperCase() + crafter.name.slice(1)}: ${inventory[crafter.name].quantity}`;
        inventoryList.appendChild(listItem);
    }
    
    let craftables = GetCraftableItems();
    for (const craftable of craftables) {
        const button = document.createElement('button');
        button.innerHTML = craftable.name;
        button.classList.add('craft-button');
        button.addEventListener("click", function() {
            Craft(craftable);
        })
        craftList.appendChild(button);
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
    optionsMenu.classList.remove('hidden');
}

function CloseMenu() {
    isMenu = false;
    optionsMenu.classList.add('hidden');
}