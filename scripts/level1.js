import level from "./level.js";
import getRandomInt from "./supportFunction.js";
import wordContainer from "./wordContainer.js";
import Config from "./config.js";

var _questions    =    ["Висит груша, нельзя скушать.","Каво?", "В честь чего назвали JavaScript?",  "Речка спятила с ума — По домам пошла сама.","2 + 2 * 2",];

var _rightAnswer  =    ["Лампочка","Деда", "Языка Java", "Водопровод", "6"];
var _wrongAnswers =    [["Груша","Вишня","Сережа","Никтарин","Виноград","Гречка"]
                         ,["Кофе","Ариаки","Никто не знает!","Принцессы","Меня","Джотаро Куджо"]
                         ,["Кофе","Праздник","Никто не знает!","Принцессы","Меня","Джотаро Куджо"],
                         ["Вода","Электросеть","Змея","Киросин","Звезда","Котлета"],
                         ["999","7","2","3","4","11"]];

const _maxQuestions = 1;
const config = new Config;
export default class level1 extends level{

    constructor(container, newTask){
        super(container);
            this.newTask = newTask;
            this.container = container;
            this.numOfQuiestions = 0;

            this.won = false;
            this.tip = "Перенеси праильный ответ в зону!";
            
            this.i = 0;
            console.log("Level1: _rightAnswer[i] = " , _rightAnswer[this.i]);

            this.questionRects = new wordContainer(this,this.container,this.checkWin.bind(this), "123", {x:0,y:0});
            this.rects = [];
          
            this.zone = new wordContainer(this,this.container,null, "", {x:0,y:0}, {x:0,y:0}, false);
            this.zone.defaultColour = 'orange';
            this.zone.colour = 'orange';
            this.zone.rect.width = 0;
            this.zone.rect.height = 0;
            this.zone.active = false;
           
            this.rects.push(new wordContainer(this,this.container,null, "123", {x:100,y:500}, {x:0,y:0}, true));
            this.rects.push(new wordContainer(this,this.container,null, "123", {x:300,y:500}, {x:0,y:0}, true));
            this.rects.push(new wordContainer(this,this.container,null, "123", {x:500,y:500}, {x:0,y:0}, true));
            this.rects.push(new wordContainer(this,this.container,null, "123", {x:700,y:500}, {x:0,y:0}, true));
            this.rects.push(new wordContainer(this,this.container,null, "123", {x:900,y:500}, {x:0,y:0}, true));
            
            this.finishButton = new wordContainer(this,this.container,this.checkWin.bind(this), "123", {x:config.canvasWidth / 2,y:config.canvasHeight / 5 * 4}, {x:0,y:0}, false);
            this.finishButton.changeWord("check");

            this.questionRects.active = false;
            this.update();
            this.sentence = "az";
            //console.log(`The character code ${this.sentence.charCodeAt(0)} is equal to ${this.sentence.charAt(0)}`);
           // console.log(`The character code ${this.sentence.charCodeAt(1)} is equal to ${this.sentence.charAt(1)}`);

    }

    update(){
        if (_maxQuestions <= this.numOfQuiestions){
            console.log(" U WIN ");
            for (let i = 0; i < this.rects.length;i++)
                delete this.rects[i]; 
            delete this.rightAnswer;
            delete this.question;
            delete this.wrongAnswers;
            this.won = true;
            return;
        }
        if (_rightAnswer.length != 0){

            for (let i = 0; i < this.rects.length;i++){
                this.rects[i].changePos(200*(i) + 100,500);
                this.rects[i].active = true;
                this.rects[i].defaultColour = 'white';
                this.rects[i].colour = 'white';
               }

            let i = getRandomInt(0,_questions.length)
            this.rightAnswer = _rightAnswer[i];
            this.question = _questions[i];
            this.wrongAnswers = _wrongAnswers[i];

            _questions.splice(i,1);
            _rightAnswer.splice(i,1);
            _wrongAnswers.splice(i,1);
            
            this.questionRects.changeWord(this.question);
            
            this.questionRects.pos.x = 0;
            this.questionRects.pos.y = 0;

            this.zone.changePos(this.questionRects.rect.x, this.questionRects.rect.y  + this.questionRects.rect.height);
            this.zone.rect.width  = this.questionRects.rect.width ;
            this.zone.rect.height = Math.max(this.questionRects.rect.width / 2 , this.questionRects.rect.height);
            
            let rightAnswerIndex = getRandomInt(0,this.rects.length );
            console.log(" rightAnswerIndex " , rightAnswerIndex);
            this.rects[rightAnswerIndex].changeWord(this.rightAnswer);

            let buff = this.wrongAnswers;
            buff.sort(() => Math.random() - 0.5);
            for (let i = 0; i < this.rects.length; i++){
                console.log("pos:", this.rects[i].pos);
                if (i != rightAnswerIndex)
                    this.rects[i].changeWord(buff[i]);

            }
            this.rects[0].changePos(100,500);
            for (let i = 1; i < this.rects.length; i++){
                this.rects[i].changePos(Math.round(this.rects[i-1].rect.width) + this.rects[i-1].pos.x, 500 + 60 * (i % 2) );
                console.log(this.rects[i]);
                console.log(this.rects[i].rect);
                console.log(Math.round(this.rects[i-1].rect.width)," - width, ", this.rects[i-1].pos.x, " - x");

            }

        }
     
    }

    draw(){
        let i = 0;
        
        this.zone.draw(0, 'red');
        this.rects.forEach(element => {
            element.draw(i,i);
            i++;
        });

        this.questionRects.draw(0,0);
        this.finishButton.draw(0,0);
    }




    checkDist(a, b){
        
        let diffX = a.rect.x - b.rect.x;
        let diffY =  a.rect.y - b.rect.y;
    
        let ans = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2) );
        console.log("ans ",ans);
        console.log("this text ",a.text);
        return this.zone.isInRect(a.rect.x, a.rect.y);
    }

    win(){
        config.right.play();
        config.right.currentTime = 0;
        console.log("WIN");
        this.newTask();
        this.numOfQuiestions++;

    }
    lose(){
   // target.defaultColour = 'grey';
                //target.colour = target.defaultColour;
               // target.active = false;
               
               config.wrong.play();
               config.wrong.currentTime = 0;
               let nick = localStorage.getItem("current");
               let scoreTable = JSON.parse(localStorage.getItem("score-table"));
               let points =  Number(document.getElementById('score').innerHTML);
       
               points -= 400;
               document.getElementById('score').innerHTML = points;
              

    }

    checkWin(answer,target){
        console.log(this.rightAnswer);
        let closeRects = 0;
        let isRight = false;
        this.rects.forEach(element => {
            if (this.checkDist(element, this.questionRects)){
                closeRects++;
                if(element.text == this.rightAnswer ) 
                    isRight = true;
            }
            
            
        });
        if (closeRects < 2 && isRight)
            this.win();
            else
            this.lose();
     
    }

}