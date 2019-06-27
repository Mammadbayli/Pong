let canvasWidth = 800;
let canvasHeight = 400;

let palletWidth = 100;
let palletHeight = 20;
let ballRadius = 20;
var score = 0

var pallet;
var ball;

class Ball {
  constructor(radius) {
    this.radius = radius;
    this.position = new createVector(random(0, canvasWidth), random(0, canvasHeight));
    this.velocity = new createVector(5,5);
  }
  
  draw() {
    this.move();
    circle(this.position.x, this.position.y, this.radius);
  }
  
  detectCollisionWithEdge(startPoint, endPoint) {
    
  }
  
  move() {
    
    if(pallet.topEdge.x < this.position.x && this.position.x < pallet.topEdge.y && abs(this.position.y - pallet.position.y + this.radius) < 2) {
      
        score++;
        this.velocity.y*= -1;
    }
    
    
    if (this.position.y > canvasHeight - this.radius) {
      score--;
    }

    
    if (this.position.x < this.radius || this.position.x > canvasWidth - this.radius) {
      this.velocity.x*= -1;
    }
    
    if (this.position.y < this.radius || this.position.y > canvasHeight - this.radius) {
      this.velocity.y*= -1;
    }
    
    this.position.add(this.velocity);
  }
}

class Pallet {
  
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.position = createVector(10, canvasHeight - 50);
  }

  draw() {
    rect(this.position.x, this.position.y, this.width, this.height);
  }
  
  get topEdge() {
    return createVector(this.position.x, this.position.x + this.width);
  }

  move(direction) {
  
      if (direction == 1 && this.position.x < canvasWidth - this.width - 15) {
        this.position.x += 15;
      } else if (this.position.x > 15 && direction == 0) {
        this.position.x -= 15;
      }

    }
}

function setupPallet() {
  pallet = new Pallet(palletWidth, palletHeight);
}

function setupBall() {
  ball = new Ball(ballRadius);
}

function movePallet() {
  if (keyIsDown(LEFT_ARROW)) {
    pallet.move(0);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    pallet.move(1);
  }
}


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  setupPallet();
  setupBall();
}

function draw() {
  background(200);
   textSize(32);
   text(`Score: ${score}`, 10, 30);
  line(ball.position.x, ball.position.y, pallet.position.x, pallet.position.y);
  line(ball.position.x, ball.position.y, pallet.position.x + pallet.width,pallet.position.y);
  
  //console.clear();
  //console.log(score);
  pallet.draw();
  ball.draw();

  movePallet();
}
