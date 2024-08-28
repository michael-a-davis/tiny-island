async function SaveGame() {
    confirmText.innerHTML = "Tiny Island utilizes local storage to save your game. Do you allow Tiny Island to write data to your browser?"
    yesButton.style.display = "block";
    yesButton.innerHTML = "Yes, Save My Game"
    noButton.style.display = "block";
    noButton.innerHTML = "I Do Not Consent"
    confirmBox.style.display = "flex";
    let confirmed = await Confirm();
    if (!confirmed) {
        yesButton.style.display = "none";
        noButton.style.display = "none";
        confirmText.innerHTML = "Your game was not saved.";
        setTimeout(function() {
            confirmBox.style.display = "none";
        }, 1500);
        return;
    }
    else {
        yesButton.style.display = "none";
        noButton.style.display = "none";
        confirmText.innerHTML = "Saving your game..."
        let saveState = {
            inventory: inventory,
            tiles: tiles,
            hasOpenedHint: hasOpenedHint,
            haveShakenTree: haveShakenTree,
            haveSearchedCoasts: haveSearchedCoasts,
            hasFishedBefore: hasFishedBefore,
            toolHasBroken: toolHasBroken,
            playerLocation: player.location,
            playerFacing: player.facing,
            currentTool: currentTool,
            currentPlaceable: currentPlaceable,
            toolCount: toolCount,
            placeableCount: placeableCount,
            workbenchTier: workbenchTier,
            haveGotSapling: haveGotSapling,
            theme: theme
        };
        let saveStateString = JSON.stringify(saveState);
        localStorage.setItem('saveState', saveStateString);
        confirmText.innerHTML = "Your game was saved.";
        setTimeout(function() {
            confirmBox.style.display = "none";
        }, 1500);
        console.log(saveState);
    }
}

async function Confirm() {
    return new Promise((resolve, reject) => (
        yesButton.addEventListener("click", function() {resolve (true)}),
        noButton.addEventListener("click", function() {resolve (false)})
    ))
}

async function EraseSave() {
    confirmText.innerHTML = "Are you sure you want to erase your save data? All your progress will be lost."
    yesButton.style.display = "block";
    yesButton.innerHTML = "No, Don't Delete!"
    noButton.style.display = "block";
    noButton.innerHTML = "I Want To Start Over"
    confirmBox.style.display = "flex";
    let didNotDelete = await Confirm();
    if (didNotDelete) {
        yesButton.style.display = "none";
        noButton.style.display = "none";
        confirmText.innerHTML = "Your save was not deleted.";
        setTimeout(function() {
            confirmBox.style.display = "none";
        }, 1500)
        return;
    } else {
        localStorage.removeItem('saveState');
        window.location.reload();
    }
}

function LoadSaveData() {
    if (!localStorage.getItem('saveState')) {
        return;
    }
    const saveStateString = localStorage.getItem('saveState');
    const saveState = JSON.parse(saveStateString);
    console.log(saveState);
    inventory = saveState.inventory;
    tiles = saveState.tiles;
    hasOpenedHint = saveState.hasOpenedHint;
    haveShakenTree = saveState.haveShakenTree;
    haveSearchedCoasts = saveState.haveSearchedCoasts;
    hasFishedBefore = saveState.hasFishedBefore;
    toolHasBroken = saveState.toolHasBroken;
    player.location = saveState.playerLocation;
    player.facing = saveState.playerFacing;
    currentTool = saveState.currentTool;
    currentPlaceable = saveState.currentPlaceable;
    toolCount = saveState.toolCount;
    placeableCount = saveState.placeableCount;
    workbenchTier = saveState.workbenchTier;
    haveGotSapling = saveState.haveGotSapling;
    theme = saveState.theme;
}