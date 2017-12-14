var SNAKE = {}

SNAKE.game = (function() {

  SNAKE.width = 200;
  SNAKE.height = 200;

  let framerate = 2;
  let cellSize;

  let snake;
  let apple;

  let canvas;
  let canvasContext;
  let gameLoopTimer;

  //Snake Array
  let snakeArray;

  function addEventListeners() {
    document.addEventListener('keydown', (evt) => {
      evt.preventDefault();
      let directionKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      }

      let key = evt.which;
      let newDirection = directionKeys[key];

      //check if direction has been given
      if (newDirection) {
        //console.log('sending new direction to snake', newDirection);
        snake.setDirection(newDirection);
      }
    });
  }

  function gameOver() {

    clearTimeout(gameLoopTimer);

    
    canvasContext.clearRect(0, 0, SNAKE.width, SNAKE.height);

  }


  function gameLoop() {

    canvasContext.clearRect(0, 0, SNAKE.width, SNAKE.height); //clear the canvas

    if (snake.checkCollision()) {
      gameOver();
      return; //stop the rest of the code from executing;
    }

    apple.draw(canvasContext);
    snake.advance();
    snake.drawSnake(canvasContext);
    // timeOut = window.requestAnimationFrame(gameLoop);
    gameLoopTimer = setTimeout(gameLoop, 1000 / framerate);
    console.log('timer',gameLoopTimer);

  }

  function drawBorder() {
    // canvasContext.save();
    // canvasContext.strokeStyle = "lightgrey";
    // canvasContext.lineWidth = SNAKE.cell;
    // TO DO: finish border
  }

  // Initializing function
  function init() {
    //console.log('Initializing..')
    canvas = document.getElementById('canvas');
    canvasContext = canvas.getContext('2d');
    canvas.setAttribute('width', SNAKE.width);
    canvas.setAttribute('height', SNAKE.height);

    apple = SNAKE.apple();
    snake = SNAKE.snake();

    addEventListeners();
    gameLoop();
  }

  return {
    init: init
  }

}());