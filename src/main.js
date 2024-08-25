startButton.addEventListener('click', function() {
    bgm.play();
    splashScreen.classList.add('fade-out');
    timeFilter.classList.add('pass-time');
})
GenerateIsland();
GenerateGrid();
UpdateGrid(player.location);
GenerateControls();