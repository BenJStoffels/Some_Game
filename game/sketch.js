var lanes = [];
var obstacle;
var score = 0;
const player = {
	x : 300,
	y : 450,
	lane : 3,
	show : function(){
		fill(0,255,25);
		this.x = constrain(this.x, 0, 500);
		this.lane = constrain(this.lane, 0, 5);
		rect(this.x, this.y, 100, 100);
	},
	test : function(){
		for(i = 0; i < lanes[this.lane].obstacles.length; i++){
			let o = lanes[this.lane].obstacles[i];
			if(this.y < o.y + 100){
				if(this.y + 100 > o.y){
					noLoop();
				}
			}
		}
	}
}
function mousePressed(){
	loop();
	setInterval((() => score++), 1000);
}

function setup() {
  createCanvas(600,600);
  for (let i = 0; i < 6; i++) {
  	lanes[i] = new lane(i * 100);
  }
  obstacle = new Obstacle(3);
  obstacle.create();
	noLoop();
}

function keyPressed(){
	if(keyCode === LEFT_ARROW){
		player.x -= 100;
		player.lane -= 1;
	}else if(keyCode === RIGHT_ARROW){
		player.x += 100;
		player.lane += 1;
	}
}

function draw() {
  background(123);
  player.show();
  lanes.forEach(l => {
  	l.show();
  	l.update();
  });
  player.test();
  if(random(1) < 0.025){
  	new Obstacle(floor(random(6))).create();
  }
  textSize(50);
  fill(255);
  text(score, 300, 50);
}

function lane(x){
	this.obstacles = [];
	this.x = x;
	this.show = function(){
		stroke(0);
		strokeWeight(2);
		line(this.x + 100, 0, this.x + 100, height);
		this.obstacles.forEach(o => o.show());
		this.obstacles = this.obstacles.filter(o => o.y <= 650);
	}
	this.update = function(){
		this.obstacles.forEach(o => o.update());
	}
}

function Obstacle(l){
	this.x = lanes[l].x;
	this.y = -100;
	this.l = l;

	this.show = function(){
		fill(255,0,25);
		rect(this.x,this.y,100,100);
	}
	this.update = function() {
		this.y += 5;
	}
	this.create = function(){
		lanes[this.l].obstacles.push(this);
	}
}
