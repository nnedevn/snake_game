var SNAKE = {}

SNAKE.game = (function() {

  let score = document.getElementById('current-score');
  SNAKE.width = 800;
  SNAKE.height = 600;
  SNAKE.score = 0;

  let framerate = 4;
  let cellSize;

  let snake;
  let apple;

  let canvas;
  let canvasContext;
  let gameLoopTimer;

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

      if (newDirection) {
        snake.setDirection(newDirection);
      }
    });
  }

  function gameOver() {
    clearTimeout(gameLoopTimer);
    canvasContext.clearRect(0, 0, SNAKE.width, SNAKE.height);
  }

  //save high score to local storage and reset score 

/* gameLoop manages the game refresh
 */

  function gameLoop() {
    score.textContent = SNAKE.score;
    canvasContext.clearRect(0, 0, SNAKE.width, SNAKE.height); //clear the canvas

    if (snake.checkCollision()) {
      gameOver();
      return; //stop the rest of the code from executing;
    }
    drawBorder();

    apple.draw(canvasContext);
    snake.drawSnake(canvasContext);
    snake.advance(apple);
    // gameLoopTimer = window.requestAnimationFrame(gameLoop);
    gameLoopTimer = setTimeout(gameLoop, 1000 / framerate);
    // console.log('timer',gameLoopTimer);
  }

  function drawBorder() {
    canvasContext.save();
    canvasContext.strokeStyle = "lightgreen";
    // TO DO: make line width dynamic
    canvasContext.lineWidth = 20;
    canvasContext.strokeRect(0, 0, SNAKE.width, SNAKE.height);
    canvasContext.restore();

  }

  // Initializing function
  function init() {
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