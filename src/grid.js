function GenerateIsland() {
    tiles = [];
    let treeCount = 0;
    let rockCount = 0;
    for (i = 0; i < gridSize; i++) {
        //Perimeter tiles
        if (i === 0 ||
            i === gridColumns - 1 ||
            i === gridSize - 1 ||
            i === gridSize - gridColumns ||
            i < gridColumns ||
            i % gridColumns === 0 ||
            i % gridColumns === gridColumns - 1 ||
            i > gridSize - 1 - gridColumns ||
            i === 1 + gridColumns ||
            i === gridSize - gridColumns - 2 ||
            i === gridSize - gridColumns - gridColumns + 1 ||
            i === gridColumns + gridColumns - 2 ||
            i < gridColumns * 2 ||
            i % gridColumns - 1 === 0 ||
            i % gridColumns === gridColumns - 2 ||
            i > gridSize - 1 - gridColumns - gridColumns
        ) {
            tiles.push(new Tile(i, "water", true, false, true));
            continue;
        }

        //Shore tiles
        if (i === gridColumns * 2 + 2) {
            tiles.push(new Tile(i, "water", false, "UL", false));
            continue;
        }
        if (i === gridSize - (gridColumns * 2) - 3) {
            tiles.push(new Tile(i, "water", false, "DR", false));
            continue;
        }
        if (i === gridSize - (gridColumns * 3) + 2) {
            tiles.push(new Tile(i, "water", false, "DL", false));
            continue;
        }
        if (i === (gridColumns * 3) - 3) {
            tiles.push(new Tile(i, "water", false, "UR", false));
            continue;
        }
        if (i < gridColumns * 3) {
            tiles.push(new Tile(i, "water", false, "U", false));
            continue;
        }
        if (i % gridColumns - 2 === 0) {
            tiles.push(new Tile(i, "water", false, "L", false));
            continue;
        }
        if (i % gridColumns === gridColumns - 3) {
            tiles.push(new Tile(i, "water", false, "R", false));
            continue;
        }
        if (i > gridSize - 1 - (gridColumns * 3)) {
            tiles.push(new Tile(i, "water", false, "D", false));
            continue;
        }

        //Internal tiles
        if (i === gridCenter) {
            tiles.push(new Tile(i, "remove", false, false, false));
            continue;
        }
        let makeTree = Roll(1, treeFrequency);
        let makeRocks = Roll(1, rockFrequency);
        if (makeTree && treeCount < treeMax) {
            tiles.push(new Tile(i, "tree", false, false, true));
            treeCount++;
            continue;
        }
        if (makeRocks && rockCount < rockMax) {
            tiles.push(new Tile(i, "rock", false, false, true));
            rockCount++;
            continue;
        }
        else {
            tiles.push(new Tile(i, "remove", false, false, false));
        }
    }
    let workBenchPlaced = false;
    while (!workBenchPlaced) {
        for (i = 0; i < tiles.length; i++) {
            let isWorkBench = Roll(1, 70);
            if (tiles[i].state === "remove" && !workBenchPlaced && isWorkBench) {
                tiles[i].state = "workbench0";
                tiles[i].collision = true;
                workBenchPlaced = true;
                break;
            }
        }
    }
}

function GenerateGrid() {
    for (i = 0; i < cameraScope; i++) {
        const tile = document.createElement('img');
        tile.classList.add('tile');
        tile.id = i;
        islandGrid.appendChild(tile);
    }
    for (i = 0; i < cameraScope; i++) {
        const tile = document.createElement('img');
        tile.classList.add('tile');
        if (i === cameraCenter) {
            tile.src = assets.player.down;
            tile.id = "playerTile";
        }
        playerGrid.appendChild(tile);
    }
}

function UpdateGrid(id) {
    let range = [
        id - gridColumns - gridColumns - 2,
        id - gridColumns - gridColumns - 1,
        id - gridColumns - gridColumns,
        id - gridColumns - gridColumns + 1,
        id - gridColumns - gridColumns + 2,
        id - gridColumns - 2,
        id - gridColumns - 1,
        id - gridColumns,
        id - gridColumns + 1,
        id - gridColumns + 2,
        id - 2,
        id - 1,
        id,
        id + 1,
        id + 2,
        id + gridColumns - 2,
        id + gridColumns - 1,
        id + gridColumns,
        id + gridColumns + 1,
        id + gridColumns + 2,
        id + gridColumns + gridColumns - 2,
        id + gridColumns + gridColumns - 1,
        id + gridColumns + gridColumns,
        id + gridColumns + gridColumns + 1,
        id + gridColumns + gridColumns + 2
    ]

    for (i = 0; i < range.length; i++) {
        const tile = document.getElementById(i);
        if (tiles[range[i]].perimeter) {
            tile.src = assets.tiles.water;
            continue;
        }
        switch(tiles[range[i]].shore) {
            case "UL":
                tile.src = assets.tiles.cornerUL;
                break;
            case "UR":
                tile.src = assets.tiles.cornerUR;
                break;
            case "DR":
                tile.src = assets.tiles.cornerDR;
                break;
            case "DL":
                tile.src = assets.tiles.cornerDL;
                break;
            case "U":
                tile.src = assets.tiles.perimeterU
                break;
            case "L":
                tile.src = assets.tiles.perimeterL;
                break;
            case "R":
                tile.src = assets.tiles.perimeterR;
                break;
            case "D":
                tile.src = assets.tiles.perimeterD;
                break;
            default:
                if (tiles[range[i]].state === "tree") {
                    tile.src = assets.tiles.tree;
                } 
                else if (tiles[range[i]].state === "rock") {
                    tile.src = assets.tiles.rocks;
                }
                else if (tiles[range[i]].state === "sapling") {
                    tile.src = assets.tiles.sapling;
                }
                else if (tiles[range[i]].state === "workbench0") {
                    tile.src = assets.tiles.crappyWorkbench;
                }
                else if (tiles[range[i]].state === "remove") {
                    tile.src = assets.tiles.grass;
                }
                break;
        }
    }
}

function FindNeighbor(direction, tile) {
    switch(direction) {
        case "up":
            return tile - gridColumns;
        case "down":
            return tile + gridColumns;
        case "left":
            return tile - 1;
        case "right":
            return tile + 1;
        default:
            return null;
    }
}