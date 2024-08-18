//Generate GUI and apply event listeners to buttons
startButton.addEventListener('click', function() {
    splashScreen.style.display = "none";
    bgm.play();
})
GenerateIsland();
GenerateGrid();
UpdateGrid(gridCenter);
GenerateControls();

