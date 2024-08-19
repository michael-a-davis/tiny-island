startButton.addEventListener('click', function() {
    bgm.play();
    splashScreen.classList.add('fade-out');
})
GenerateIsland();
GenerateGrid();
UpdateGrid(gridCenter);
GenerateControls();