hintButton.addEventListener("click", function() {OpenHint()});
closeHint.addEventListener ("click", function() {CloseHint()});
craftButton.addEventListener("click", function() {OpenCrafting()});
closeCraft.addEventListener("click", function() {CloseCrafting()});

function OpenHint() {
    hintBox.classList.remove('hidden');
    craftBox.classList.add('hidden');
    craftBox.style.display = "none";
}

function CloseHint() {
    hintBox.classList.add('hidden');
}

function OpenCrafting() {
    craftBox.classList.remove('hidden');
    craftBox.style.display = "grid";
    hintBox.classList.add('hidden');
    inventoryList.innerHTML = "";
    craftList.innerHTML = "";

    for (const item in player.inventory) {
        if (player.inventory[item] === 0) {
            continue;
        }
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item}: ${player.inventory[item]}`;
        inventoryList.appendChild(listItem);
    }

    let craftables = GeneratePossibleCrafts();
    
    for (i = 0; i < craftables.length; i++) {
        const button = document.createElement('button');
        button.innerHTML = `${craftables[i]}`;
        let craftable = craftables[i];
        button.addEventListener("click", function() {Craft(craftable)});
        craftList.appendChild(button);
    }
      
}

function CloseCrafting() {
    craftBox.classList.add('hidden');
    craftBox.style.display = "none";
}