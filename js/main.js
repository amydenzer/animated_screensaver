//set up our canvas
//gives access to the drawing properties
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//innerWidth refers to the viewport
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

//function to generate a random RGB color
function randomRGB(){
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
}

class Ball {
  constructor(x,y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color; 
    this.size = size;
  }

  draw() {
    ctx.beginPath(); //start drawing shap
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fill();
  }

  update() {
    if((this.x + this.size) >= width) { 
      this.velX = -(this.velX)
    }
    if((this.x - this.size) <= 0) {
      this.velX = -(this.velX)
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY)
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY)
    }  

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for(const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x
        const dy = this.y - ball.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.size + ball.size) {
          ball.color = this.ball = randomRGB()
        }
      }
    }
  }

}

const balls = []

while (balls.length < 150) {
  const size = random(5, 15);
  const ball = new Ball (
    random(0 + size, width - size), //x-coordinate
    random(0 + size, height - size), //y-coordinate
    random(1, 4), //velX
    random(1, 4), //velY
    randomRGB(), //assign random color
    size
  )

  balls.push(ball)

}

function loop() {
  // ctx.fillStyle = 'rgba(0,0,0,0.01)'
  // ctx.fillRect(0,0, width, height)
  for (const ball of balls) {
    ball.draw()
    ball.update()
    ball.collisionDetect()
  }

    requestAnimationFrame(loop) //recursion
}

loop(); //initialize the loop function