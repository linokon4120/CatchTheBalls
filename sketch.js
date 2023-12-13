/*
 * This program sketch is copied from 
 * Xiannong Meng's version at 
 * https://editor.p5js.org/xmeng/sketches/2d1U_D7rw, copied from 
 * Evan Peck's example at
 * https://editor.p5js.org/evanpeck/sketches/O7MjzPFxb
 * 
 * Edward Talmage
 * 2023-11-27
 *
 * Revisions
 * 1. 2022-06-28: added sound file loading and playing
 *    a. The Apollo launch audio file is downloaded from
 *    https://www.nasa.gov/62282main_countdown_launch.wav
 *    which is then converted into mp3 format to be used here.
 * 2. 2022-06-28: added a textbox; check if any ball is colliding with the textbox.
 *    If so, the ball reverses the move direction.
 * 3. 2023-11-27: randomize() changes a ball's color and size, as well as direction.
 * 4. 2023-11-27: Clicking randomizes one (randomly-chosen) ball, not all of them, using the mouseClicked() handler.
 */

const BOX_WIDTH  = 100;  // textbox dimensions
const BOX_HEIGHT = 20;

var balls = [];
var sound;
var testBall;
var score = 0;  // Added variable for scoring

function preload() {

  sound = loadSound("gamesound.mp3");  // preload the sound file
}



function setup() {

  createCanvas(550,450)

// Initializing the sliding bar's position
  boxX = width / 2 - BOX_WIDTH / 2;
  for (let i = 0; i < 7; i++) {
    balls.push(new Ball());
  }
    
  noStroke();
  
  sound.loop();  // play the sound file repeatedly
  

  let y = height;
  testBall = new Ball();
  testBall.size = 50;
  testBall.ballX = 220;  // if ballX == 225, the ball just slides over the right edge
  testBall.ballY = 300;
  testBall.red = 0;
  testBall.blue = 0;
  testBall.green = 0;
  testBall.speedX = 0;
  testBall.speedY = 1.2;
}

function createBox() {
  // prepare a box first
  strokeWeight(4);
  rect(0, 0, BOX_WIDTH, BOX_HEIGHT);
  textSize(15);           // size of the text (pixels)
    
  
  fill(0, 102, 153);      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('Hello There!', BOX_WIDTH/2, BOX_HEIGHT/2 + BOX_HEIGHT/20);   
   
}

function draw() {

  background(240);
  createBox();
  
  // testBallMove();  // a special ball to test corner collision
  if (keyIsDown(LEFT_ARROW) && boxX > 0) {
    boxX -= 4
  }
  if (keyIsDown(RIGHT_ARROW) && boxX < width - BOX_WIDTH) {
    boxX += 4
  }
  
//   Draw the Sliding bar:
  fill(255, 192, 203);
  rect(boxX, height - BOX_HEIGHT, BOX_WIDTH, BOX_HEIGHT)
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].checkForHitBottomWall();
    balls[ballNum].checkForHitBox();
    balls[ballNum].moveBall();
    balls[ballNum].displayScore();
    
  }
}

function testBallMove() {
  
  testBall.display();
  testBall.checkForHitWall();
  testBall.checkForHitBox();
  testBall.moveBall();
}

function increaseScore() {
    score += 10;
  }

class Ball { // Constructor
  
  constructor() {
    // initial position
    this.ballX = random(100, width - 100)
    this.ballY = random(100, height - 100)
    
    // Dictates velocity + direction
    this.speedY = random(-4, 4);
    this.speedX = random(-4, 4);
    
    this.size = random(25, 50);
    
    // How transparent the ball is
    this.alpha = 100
    
    // RGB values for color
    this.red   = random(255);
    this.green = random(255);
    this.blue  = random(255)
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY-radius) < 0) {
  	  this.speedY = -this.speedY;  
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.speedX = -this.speedX;  
    }
  }
  
  checkForHitBottomWall() {
    let radius = this.size / 2;
    if (this.ballY + radius > height) {
      // Reset the ball's position outside the canvas
      // this.ballY = height + radius *6;
      this.speedX = 0
      this.speedY = 0
    }
  }  
  
  checkForHitBox() {
    
    let radius = this.size / 2;
    if (
      	this.ballY + radius > height - BOX_HEIGHT &&
    	this.ballX > boxX && this.ballX < boxX + BOX_WIDTH &&
      	this.speedX != 0 && this.speedY != 0
    ) {

      // bump into the textbox, need to reverse direction
      this.reverseBall();
      increaseScore();
    }
  }
  

  displayScore() {
    fill(255);
    textSize(15)
    textAlign(CENTER, CENTER)
    text(score, boxX + BOX_WIDTH / 2, height - BOX_HEIGHT / 2);
  }
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {

    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
}