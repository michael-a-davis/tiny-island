GenerateIsland();
GenerateGrid();
UpdateGrid(gridCenter);
console.log(GenerateNeighborStateString(gridCenter));

function Roll(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function GenerateIsland() {
    let treeCount = 0;
    for (i = 0; i < gridSize; i++) {
        //Perimeter tiles
        if (i === 0 ||
            i === gridColumns - 1 ||
            i === gridSize - 1 ||
            i === gridSize - gridColumns ||
            i < gridColumns ||
            i % gridColumns === 0 ||
            i % gridColumns === gridColumns - 1 ||
            i > gridSize - 1 - gridColumns
        ) {
            tiles.push(new Tile(i, "water", true, false));
            continue;
        }

        //Shore tiles
        if (i === 1 + gridColumns) {
            tiles.push(new Tile(i, "water", false, "UL"));
            continue;
        }
        if (i === gridSize - gridColumns - 2) {
            tiles.push(new Tile(i, "water", false, "DR"));
            continue;
        }
        if (i === gridSize - gridColumns - gridColumns + 1) {
            tiles.push(new Tile(i, "water", false, "DL"));
            continue;
        }
        if (i === gridColumns + gridColumns - 2) {
            tiles.push(new Tile(i, "water", false, "UR"));
            continue;
        }
        if (i < gridColumns * 2) {
            tiles.push(new Tile(i, "water", false, "U"));
            continue;
        }
        if (i % gridColumns - 1 === 0) {
            tiles.push(new Tile(i, "water", false, "L"));
            continue;
        }
        if (i % gridColumns === gridColumns - 2) {
            tiles.push(new Tile(i, "water", false, "R"));
            continue;
        }
        if (i > gridSize - 1 - gridColumns - gridColumns) {
            tiles.push(new Tile(i, "water", false, "D"));
            continue;
        }

        //Internal tiles
        if (i === gridCenter) {
            tiles.push(new Tile(i, "remove", false, false));
            continue;
        }
        let type = Roll(1, 4);
        if (type === 1 && treeCount < treeMax) {
            tiles.push(new Tile(i, "tree", false, false));
            treeCount++;
        } 
        else {
            tiles.push(new Tile(i, "remove", false, false));
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
        if (tiles[range[i]].id === player.location) {
            tile.src = "tiles/player.png";
            continue;
        }
        if (tiles[range[i]].perimeter) {
            tile.src = "tiles/water.png";
            continue;
        }
        switch(tiles[range[i]].shore) {
            case "UL":
                tile.src = "tiles/corner-UL.png";
                break;
            case "UR":
                tile.src = "tiles/corner-UR.png";
                break;
            case "DR":
                tile.src = "tiles/corner-DR.png";
                break;
            case "DL":
                tile.src = "tiles/corner-DL.png";
                break;
            case "U":
                tile.src = "tiles/perimeter-U.png";
                break;
            case "L":
                tile.src = "tiles/perimeter-L.png";
                break;
            case "R":
                tile.src = "tiles/perimeter-R.png";
                break;
            case "D":
                tile.src = "tiles/perimeter-D.png";
                break;
            default:
                if (tiles[range[i]].state === "tree") {
                    tile.src = "tiles/tree.png";
                } else {
                    tile.src = "tiles/grass.png";
                }
                break;
        }
    }
}

function GenerateNeighborStateString(i) {
    //Generates neighbor state array
    let neighbors = [
        i - gridColumns, //Up
        i - gridColumns + 1, //UpRight
        i + 1, //Right
        i + gridColumns + 1, //DownRight
        i + gridColumns, //Down
        i + gridColumns - 1, //DownLeft
        i - 1, //Left
        i - gridColumns - 1 //UpLeft
    ]
    let neighborStateArray = [];
    for (j = 0; j < neighbors.length; j++) {
        switch(tiles[neighbors[j]].state) {
            case "remove":
                neighborStateArray.push("O");
                break;
            case "tree":
                neighborStateArray.push("T");
                break;
            case "water":
                neighborStateArray.push("W");
        }
    }
    let neighborStatesString = neighborStateArray.toString();
    let neighborStates = neighborStatesString.replace(/,/g, "");
    return neighborStates;
}