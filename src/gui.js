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

    for (const item in player.inventory) {
        if (player.inventory[item] === 0) {
            continue;
        }
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item}: ${player.inventory[item]}`;
        inventoryList.appendChild(listItem);
      }
      
}

function CloseCrafting() {
    craftBox.classList.add('hidden');
    craftBox.style.display = "none";
}