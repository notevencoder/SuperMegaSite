import Canvas from "./canvas.js";
import GameLoop from "./gameLoop.js";
import Task from "./Task.js";
import getRandomInt from "./supportFunction.js";
import wordContainer from "./wordContainer.js";
import Timer from "./Timer.js";

/*let scoreTable = JSON.parse(localStorage.getItem("score-table"));

localStorage.setItem("score-table", JSON.stringify(scoreTable));

let str = "<strong>Лучшие игроки:</strong>";
if(scoreTable != null){
scoreTable.forEach(element => {
str += "<br>" + element.nick + ": " + element.score;
});
}


scores.innerHTML = str;
function handleFormSubmit(){
let textBox = document.querySelector("input");
localStorage.setItem("current", textBox.value);
}


document.getElementById("reg").addEventListener('submit', handleFormSubmit)


/**/

class Game {


       

    constructor( container ) {
        let nick = localStorage.getItem("current");
        let scoreTable = JSON.parse(localStorage.getItem("score-table"));
        let points =  Number(document.getElementById('score').innerHTML);

        points = 0;
        document.getElementById('score').innerHTML = points;

        this.canvas = new Canvas( container );
        this.container = container;

        new GameLoop( this.update.bind(this), this.draw.bind(this) );
        this.currentTask = new Task(this);
        this.currentTask.update();
        this.timer = new Timer();
        this.timerId = setInterval(() => this.timer.increment(1), 1000);
    }
   
    update() {
        this.currentTask.update();
       // this.currentTask.newTask();

       
 
    }

   

    draw() {

        this.canvas.context.clearRect( 0, 0, this.canvas.element.width, this.canvas.element.height );
        this.currentTask.draw();


    }

    endGame(){
        console.log("GAME OVER");
        clearInterval(this.timerId);
        let nick = localStorage.getItem("current");
        let scoreTable = JSON.parse(localStorage.getItem("score-table"));
        let points =  Number(document.getElementById('score').innerHTML);
        let time = Number(this.timer.timer);
        //console.log(nick, " ", points);
        
        let isNew = true;
        if(scoreTable == null){
            scoreTable = [{nick: nick, score: points, time: time}];
            }else{
                scoreTable.forEach(element => {
                  if (element.nick == nick) {
                    console.log("element.score", element.score, " points ", points, " time ", time);
                    if (Number(element.score) > points)
                        points = element.score;
                    if (Number(element.time) > time)
                        time = element.time;
                    
                    isNew = false;
                    
                }
                });
            
                if (isNew)
                 scoreTable.push({nick:nick, score: points, time: time});
           
                scoreTable.sort((a, b) => {
            if (a.score < b.score) {
            return 1;
            }
            if (a.score > b.score) {
            return -1;
            }
            return 0;
            });
            
            if(scoreTable.length > 10){
                scoreTable.splice(10, 1);
            }
            }
            localStorage.setItem("score-table", JSON.stringify(scoreTable));
            localStorage.setItem("current-score", points);
            localStorage.setItem("current-time", time);
       
        setTimeout(function(){
            window.location.href = 'scoreBoardbuff.html';
          }, 2 * 1000);
        
    }

}

new Game( document.querySelector(".canvas-wrapper") );