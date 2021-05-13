//vars
let curX = 0, curY = 0, lastX = -2, lastY = -2, xSize = 825, ySize = 825, xPts = [], yPts = [], selected = false, curPlayer, again = false;
let player1 = {
  score: 0,
  turn: true,
  color: 'rgba(255,0,0,255)'
},
player2 = {
  score: 0,
  turn: false,
  color: 'rgba(0, 0, 255, 255)'
};

function setup() {
  //set up the canvas
  createCanvas(xSize, ySize);
  background(169,169,169);
  fill('black');
  stroke('black');
  //display text
  textFont('Helvetica');
  text("press r to reset at any point", 25, 25);
  text("score", 450, 25);
  text("turn:", 290, 25);
  //setup up the game
  drawBoard();
  drawScore();
  curPlayer = player1;
  currentTurn();
  document.addEventListener('keypress', resetGame);
}

function draw() {
  //unused: all updates will be based on Users' input
}


function drawBoard(){
    //10x10 grid
    fill('black');
    stroke('black');
    for(let bX = 75; bX < xSize;bX += 75){
      for(let bY = 75; bY < ySize; bY += 75){
        circle(bX, bY, 5);
        yPts.push(bY)
      }
      //saves point values
      xPts.push(bX);
    }
}

function drawSelected(sX, sY){
  //erase selected point
  erase();
  circle(sX, sY, 5);
  noErase();
  
  //there is on old point redraw
  if(lastX !== -1  && lastY !== -1){
    fill('black');
    circle(lastX, lastY, 5);
  }
  
  //if point is the same as last reset, else set last point
  if(lastX === sX && lastY === sY){
    lastX = -1;
    lastY = -1;
    selected = false;
  } else {
    lastX = sX;
    lastY = sY;
  }
}

function drawLine(lX, lY, color){
  //check if line in with the point clicked
  if(abs(lX - lastX) <= 75 && abs(lY - lastY) <= 75){
    if(abs(lX - lastX) === 75 && abs(lY - lastY) === 75){
      //catch
    } else {
      //check if there is already a line there
      let point;
      if(lastX === lX){
        if(lY > lastY){
           point = get(lX, lastY+10)
        } else if(lY < lastY){
           point = get(lX, lY+10)
        }
      } else if(lastY === lY) {
        if(lX > lastX){
           point = get(lastX+10, lY)
        } else if(lX < lastX){
           point = get(lX+10, lY)
        }
      }
      if(point[0] === 169){
        stroke(color);
        line(lastX, lastY, lX, lY);
        checkForScore(lastX, lastY, lX, lY);
        stroke('black');
        fill('black');
        drawSelected(lastX, lastY);
      } else {
        again = true
      }
    }
  }
}

function checkForScore(x1, y1, x2, y2){
  //if verticle
  if(x1 === x2){
    //check right side
    tempX = x1 -75;
    if(tempX !== 0){
      //get color values of opints where there should be lines
       let p1 = get(tempX +10, y1);
       let p2 = get(tempX +10, y2);
       let p3;
       //we use the smaller y to check the parellel
       if(y1 > y2) {
         p3 = get(tempX, y2+10);
       } else if(y1 < y2){
         p3 = get(tempX, y1+10);
       }
       // if there are lines present there fill the sqaure
       if(p1[0] !== 169 && p2[0] !== 169 && p3[0] !== 169 ){
         scored();
         fill(curPlayer.color);
         stroke('black');
         quad(x1, y1, x2, y2, tempX, y2, tempX, y1);
         drawBoard();
       }
    }
    //check left side
    tempX = x1 + 75;
    if(tempX !== xSize){
      //get color values of opints where there should be lines
       let p1 = get(tempX -10, y1);
       let p2 = get(tempX -10, y2);
       let p3;
       //we use the smaller y to check the parellel
       if(y1 > y2) {
         p3 = get(tempX, y2+10);
       } else if(y1 < y2){
         p3 = get(tempX, y1+10);
       }
       // if there are lines present there fill the sqaure
       if(p1[0] !== 169 && p2[0] !== 169 && p3[0] !== 169 ){
         scored();
         fill(curPlayer.color);
         stroke('black');
         quad(x1, y1, x2, y2, tempX, y2, tempX, y1);
         drawBoard();
       }
    }
  } else if(y1 === y2){
     //check top side
    tempY = y1 -75;
    if(tempY !== 0){
      //get color values of opints where there should be lines
       let p1 = get(x1, tempY+10);
       let p2 = get(x2, tempY+10);
       let p3;
       //we use the smaller y to check the parellel
       if(x1 > x2) {
         p3 = get(x2+10, tempY);
       } else if(x1 < x2){
         p3 = get(x1+10, tempY);
       }
       // if there are lines present there fill the sqaure
       if(p1[0] !== 169 && p2[0] !== 169 && p3[0] !== 169 ){
          scored();
         fill(curPlayer.color);
         stroke('black');
         quad(x1, y1, x2, y2, x2, tempY, x1, tempY);
         drawBoard();
       }
    }
    //check bottom side
    tempY = y1 + 75;
    if(tempY !== ySize){
      //get color values of opints where there should be lines
       let p1 = get(x1, tempY -10);
       let p2 = get(x2, tempY-10);
       let p3;
       //we use the smaller y to check the parellel
       if(x1 > x2) {
         p3 = get(x2+10, tempY);
       } else if(x1 < x2){
         p3 = get(x1+10, tempY);
       }
       // if there are lines present there fill the sqaure
       if(p1[0] !== 169 && p2[0] !== 169 && p3[0] !== 169 ){
         scored();
         fill(curPlayer.color);
         stroke('black');
         quad(x1, y1, x2, y2, x2, tempY, x1, tempY);
         drawBoard();
       }
    }
  }
}
function scored(){
  curPlayer.score++;
  again = true;
  drawScore();
}
function resetGame(e){
  console.log(e);
  if (keyIsDown(82)){
    clear();
    player1.score = 0;
    player2.score = 0;
    player1.turn = true;
    player2.turn = false;
    setup();
  }
}
function currentTurn(){
  stroke('black');
  fill(curPlayer.color);
  circle(325, 21, 10);
}
function drawScore(){
  erase();
  rect(485, 16, 12);
  rect(510, 16, 12);
  noErase();
  stroke(player1.color);
  fill(player1.color);
  text(player1.score, 487, 25);
  stroke(player2.color);
  fill(player2.color);
  text(player2.score, 512, 25);
}
function mouseClicked() {
  //closest in array refernce
  //https://www.gavsblog.com/blog/find-closest-number-in-array-javascript
  //match mouse click with closest point to the mouse cursor, and select it
  let closestX = xPts.reduce((a, b) => {
      return abs(b - mouseX) < abs(a - mouseX) ? b : a;
  });
  let closestY = yPts.reduce((a, b) => {
      return abs(b - mouseY) < abs(a - mouseY) ? b : a;
  });
  //check whats werre gunna do with the point
  if(selected === false || (closestX === lastX && closestY === lastY)){ 
     selected = true;
     drawSelected(closestX, closestY);
  } else if(player1.turn === true){
    drawLine(closestX, closestY, player1.color);
    if(again === false){
      player1.turn = false;
      player2.turn = true;
      curPlayer = player2;
      currentTurn();
    }else{
       again = false;
    }
  } else if (player2.turn === true){
    drawLine(closestX, closestY, player2.color);
    if(again === false){  
      player1.turn = true;
      player2.turn = false;
      curPlayer = player1;
      currentTurn();
    } else {
      again = false;
    }
  }
}