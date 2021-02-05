const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
var backgroundImage;
var engine, world;
var redPiece;
var redSpaces,redMoved;
var die;

function preload(){
  backgroundImage=loadImage("snakeand laddersd.jpg");
  
}
function redUpsAndDowns(){
  //ladders
  if (redSpaces === 2){
    Matter.Body.setVelocity(redPiece.body,{x:7,y:-13});
    redSpaces=23;
  }
  if (redSpaces === 4){
   Matter.Body.setVelocity(redPiece.body,{x:27,y:-37});
   redSpaces=68;
  }
  if (redSpaces === 6 ){
    Matter.Body.setVelocity(redPiece.body,{x:-7,y:-26});
    redSpaces=45;
  }
  if (redSpaces === 20 ){
    Matter.Body.setVelocity(redPiece.body,{x:7,y:-26});
    redSpaces=59;
  }
  if (redSpaces === 30 ){
    Matter.Body.setVelocity(redPiece.body,{x:-28,y:-26});
    redSpaces=96;
  }
  if (redSpaces === 52 ){
    Matter.Body.setVelocity(redPiece.body,{x:0,y:-26});
    redSpaces=72;
  }
  if (redSpaces === 57 ){
    Matter.Body.setVelocity(redPiece.body,{x:7,y:-26});
    redSpaces=96;
  }
  if (redSpaces === 71 ){
    Matter.Body.setVelocity(redPiece.body,{x:-7,y:-13});
    redSpaces=92;
  }
 // snakes
 if (redSpaces === 43 ){
  Matter.Body.setVelocity(redPiece.body,{x:-7,y:26});
  redSpaces=17;
}
if (redSpaces === 50 ){
  Matter.Body.setVelocity(redPiece.body,{x:35,y:26});
  redSpaces=5;
}
if (redSpaces === 56 ){
  Matter.Body.setVelocity(redPiece.body,{x:-21,y:26});
  redSpaces=8;
}
if (redSpaces === 73 ){
  Matter.Body.setVelocity(redPiece.body,{x:-14,y:26});
  redSpaces=15;
}
if (redSpaces === 84 ){
  Matter.Body.setVelocity(redPiece.body,{x:-7,y:26});
  redSpaces=58;
}
if (redSpaces === 87 ){
  Matter.Body.setVelocity(redPiece.body,{x:14,y:26});
  redSpaces=49;
}
if (redSpaces === 98 ){
  Matter.Body.setVelocity(redPiece.body,{x:-14,y:26});
  redSpaces=40;
}





}
function drawDie(x,y,side){
fill("white");
strokeWeight(8);
rectMode(CENTER);
rect(x,y,100,100,20);
fill("black");
strokeWeight(3);
if (side === 1){
  circle(x,y,20);
}else if (side === 2){
  circle(x-25,y-25,20);
  circle(x+25,y+25,20);
}else if(side === 3){
  circle(x-25,y-25,20);
  circle(x+25,y+25,20);
  circle(x,y,20);
}else if (side === 4){
  circle(x-25,y-25,20);
  circle(x+25,y+25,20);
  circle(x-25,y-25,20);
  circle(x+25,y+25,20);
}else if (side === 5){
  circle(x-25,y-25,20);
  circle(x+25,y+25,20);
  circle(x-25,y-25,20);
  circle(x+25,y+25,20);
  circle(x,y,20);
}else {
  circle(x-25,y-25,20);
  circle(x+25,y+25,20);
  circle(x-25,y-25,20);
  circle(x+25,y+25,20);
  circle(x-25,y-25,20);
  circle(x+25,y+25,20);
  
}


  
}

function setup() {
  createCanvas(600,795);
  engine = Engine.create();
  world = engine.world;
  redPiece = new RedPiece(30,510,40,50);
  engine.world.gravity.y=0;
  die=[false,1,0,false,0];
  redSpaces=1;
  redMoved=false;
}

function draw() {
  background("grey");  
  Engine.update(engine);
  image(backgroundImage,0,0,600,600);
  redPiece.display();
  stroke("black");
  strokeWeight(8);
  line(0,602.5,600,602.5)
  
  //draw die or make it blink or move it
  if(die[3] === false){
    drawDie(525, 665, die[1]);
  }else{
    if(die[4] % 2 === 0){
      drawDie(525, 665, die[1]);

      if(redMoved === false && redSpaces !== 100){
        if(redSpaces % 10 === 0){
          redPiece.moveUp();
        }else{
          var num = Math.floor(redSpaces / 10);
          if(num === 0 || num === 2 || num === 4 || num === 6 || num === 8){
            redPiece.moveRight();
          }else{
            redPiece.moveLeft();
          }
        }
       redMoved = true;
       redSpaces++;
       console.log(redSpaces);
      }
    }

    if(frameCount % 15 === 0){
      die[4]--;
      redMoved = false;

      if(die[4] === 0){
        die[3] = false;
        die[0] = false;
        redUpsAndDowns();
      }
    }
  }

  //make the die roll
  if(die[0] === true && die[2] > 0 && frameCount % 5 === 0){
    die[2]--;

    die[1]++;
    if(die[1] > 6){
      die[1] = 1;
    }

    if(die[2] === 0){
      die[3] = true;
      die[4] = die[1] * 2;
    }
  }
}

function keyPressed(){
  if (keyCode === 32 && die[0] === false) {
    die[0] = true;
    die[2] = round(random(12, 18));
  }
}
