 // game constants & variables//

let inputDir = {x: 0, y: 0};
const foodSound = new Audio('images/playmusic.wav');
const gameOverSound = new Audio('images/game over (1).wav');
const moveSound = new Audio('images/movesound.wav');
const musicSound = new Audio('images/musicsound.wav');
let speed = 5;
let score = 0;
let lastpaintTime = 0;
let snakeArr = [
    {x: 13, y: 15} //distance of box//
]
food = {x: 6, y: 7}; //food is not array its just partical//


// game funtion//

function main(ctime) { //current time//
    window.requestAnimationFrame(main);
    //console.log(ctime);
     //call main//
    if((ctime - lastpaintTime)/1000 < 1/speed){
        return;
    }
     lastpaintTime = ctime;
     gameEngine(); //game run karel//
}

function isCollide(snake) {
    // if you bump into yourself//
    
    for (let i = 1; i < snakeArr.length; i++){
              if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                 return true;
              }
            } // if you bump into the wall//
               if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){ // snake ka head kaha tak move ho sakta hai//
               return true;
               }
            
        }

function gameEngine(){  
// part 1 : update the snake variable(array) & food//
  if(isCollide(snakeArr)) {
   gameOverSound.play();
  musicSound.pause();
  inputDir = {x: 0, y: 0};
  alert("Game Over. press any key to play again!");
   snakeArr = [{x: 13, y: 15}];
  musicSound.play();
  score = 0;
 }  

      // if yoy have eaten the food,increment the score & regenerate the food//
    if(foodSound) {
    }
    //increment the score//
   score += 1;

   // update the high score if the current score is greater//
   if(score > hiscoreval){
   hiscoreval = score;
   localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
   var hiscore = document.getElementById("hiscore");
   var hiscoreval = parseInt(localStorage.getItem("hiscore")) || 0;
   hiscore.innerHTML = "Hiscore:" + hiscoreval;
}
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())};
}

  // moving the snake//   
 // we are use for 2 bcoz we using opposite loop here last 2nd box 1st count //
for (let i = snakeArr.length - 2; i >= 0; i--){
snakeArr[i + 1] = {...snakeArr[i]}; // D structure//
}
    
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;
    
          
// part 2 : display the snake and food
// display the snake
board.innerHTML = "";
snakeArr.forEach((e, index) => { // loop
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y; 
    // row & column play karel
    snakeElement.style.gridColumnStart = e.x;
     // class for add css
     if(index === 0){
        snakeElement.classList.add('head'); 
     }else{
        snakeElement.classList.add('snake');
     }
        board.appendChild(snakeElement);
});
}

//display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y; 
    // row & column play karel
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food') // class for add css
    board.appendChild(foodElement);



// main logic starts here//
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore); 
    hiscore.innerHTML = "Hiscore:" + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // start the game
    moveSound.play();
    switch (e.key){
        case "ArrowUp":
            console.log("Arrowup");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

            case "ArrowDown":
                console.log("ArrowDown");
                inputDir.x = 0;
                inputDir.y = 1;
                break;

                case "ArrowLeft":
                    console.log("ArrowLeft");
                    inputDir.x = -1;
                    inputDir.y = 0;
                    break;

            case "ArrowRight":
                console.log("ArrowRight");
                inputDir.x = 1;
                inputDir.y = 0;
                break;
                default:
                    break;

    }

});


window.requestAnimationFrame(main);