var guessNum; 
var interval = 50;
var result = null;
var wins = 0;
var losses = 0;
var over = false;


function setup() {
  createCanvas(800, 300);
}

function draw() {
  
  if(losses === 3 || (losses+wins) === 10){
    gameOver(wins,losses);
    over = true;
    return;
  }
  
  background(220);
  
  if(frameCount === 1 || frameCount % interval === 0) {
    result = null;
    guessNum = new GuessNum(width/2, height/2, 5)
  }
  
  if(guessNum){
    guessNum.render();
  }
  
  
  if(result === true) {
    background("green");
  }
  else if(result === false) {
    background("red");
  }
  
}

function keyPressed(){
  if(over){
    if(keyCode === ENTER){
      wins = 0;
      losses = 0;
      over = false;
      result = null;
    }
  }
  
  
  if(guessNum !== null){
    console.log("Number entered: ", key);
    result = guessNum.answered(key);
  
      if(result){
        wins = wins + 1;
      }
      else{
        losses = losses + 1;
      }
  
      guessNum = null;
    
  }
  else{
    console.log("No number");
  }
  console.log("wins: " + wins + ", losses: " + losses);

}

function gameOver(wins, losses){
  push();
  background(255);
  textAlign(CENTER, CENTER);
  translate(width/2, height/2);
  
  fill(230, 50,50);
  textSize(24);
  text("Game Over!",0,0);
  
  fill(0);
  translate(0,40);
  text("Your Score: " + wins + " correct, " + losses + " wrong.",0,0);
  
  var blinkingVal = map(sin(frameCount/10),-1,1,0,255);
  fill(230, 50,50, blinkingVal);
  translate(0,70);
  textSize(20);
  text("PRESS ENTER TO CONTINUE",0,0);
  
}

function GuessNum (x, y, scl) {
  this.x = x;
  this.y = y;
  this.scl = scl;
  this.alpha = 255;
  this.num = getNum();
  this.sclInc = 0.5;
  this.alphaDec = 2;
  this.ans;
  this.numMap = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine'
  };
  
  function getNum() {
    return String(parseInt(random(10),10));
  }
  
  this.answered = function(input) {
    if(input === this.num) {
      this.ans = true;
    }
    else {
      this.ans = false;
    }
    return this.ans;
  }
  
  this.render = function() {
    if(this.ans === false) {
      return;
    }
    push();
    fill(0,this.alpha);
    textAlign(CENTER,CENTER);
    translate(this.x,this.y);
    scale(this.scl);
    text(this.numMap[this.num], 0, 0);
    this.scl = this.scl + this.sclInc;
    this.alpha = this.alpha - this.alphaDec;
    pop();
  }
  
}