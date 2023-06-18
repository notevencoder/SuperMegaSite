import Rect from "./Rect.js";
import level from "./level.js";
import getRandomInt from "./supportFunction.js";
import wordContainer from "./wordContainer.js";
import Config from "./config.js";
const config = new Config;

var _questions    =    ["Каво","Деда","Дио","Отравленный","Полнареф"];


const _maxQuestions = 2;
const _maxLetters = 5;             


export default class level2 extends level{

    constructor(container, newTask){
        super(container);
            this.newTask = newTask;
            this.container = container;
            this.numOfQuiestions = 0;
            this.set;
            this.rects = null;
            this.questionRect = new wordContainer(this, this.container,this.checkWin.bind(this), "123", {x:0,y:100} );
            this.questionRect.active = false;
            this.wrongAnswers = [];
            this.rightAnswers = null;
            
           
            //console.log("_rightAnswer[i] = " , _rightAnswer[i]);
            this.update();

    }

    update(){
        if (_maxQuestions <= this.numOfQuiestions){
            console.log(" U WIN ");
            this.won = true;
            return;
        }

        if (_questions.length != 0){
            this.numOfQuiestions++;
            

            
            let i = getRandomInt(0,_questions.length);

            this.question = _questions[i];

            _questions.splice(i,1);

            this.questionRect.changeWord(this.question);
            
            
            

            if (this.rightAnswers != null)
            delete this.rightAnswers.size;
           delete this.wrongAnswers.size;
            this.set = new Set();
            let sentence = "аяАЯ";
            for (let j = 0 ;j < this.question.length;j++){
                if (this.question[j].charCodeAt(0) >= sentence.charCodeAt(0) &&
                    this.question[j].charCodeAt(0) <= sentence.charCodeAt(1) ||
                    this.question[j].charCodeAt(0) >= sentence.charCodeAt(2) &&
                    this.question[j].charCodeAt(0) <= sentence.charCodeAt(3))
                    this.set.add(this.question[j].toLowerCase());
            }

            
              
            this.rightAnswer = this.set;
            this.initRects();
            this.newLetters();
           // console.log(set);
            //console.log(this.wrongAnswers);
            
            
            

        }

    }

    initRects(){
        
        let x = getRandomInt(0,1000),y = getRandomInt(0,1000);
        if (this.rects == null){
            this.rects = [];
            for (let i = 0; i < _maxLetters; i++)
                this.rects.push(new wordContainer(this, this.container,this.checkWin.bind(this), "123", {x:x * 100,y:100+y*100 + 100}, {x:getRandomInt(5,20) * (getRandomInt(0,2) * 2 - 1),y:getRandomInt(5,20)* (getRandomInt(0,2) * 2 - 1)}));
          
        }
        
    }

    draw(){
        this.questionRect.draw(10,100);
        let i = 0;
        this.rects.forEach(element => {
            element.draw(i,i);
            i++;
        });
    }

    newLetters(x = getRandomInt(200, 1000),y = getRandomInt(400, 1000)){


        let sentence = "аяАЯ";
        let j =  sentence.charCodeAt(0);
        

        var it = this.rightAnswer.values();
        //get first entry:
        var first = it.next();
        //get value out of the iterator entry:
        var value = first.value;
        //console.log( value );
        this.rects[0].text = value;


        for (let i =  1; i < _maxLetters; i++){
            let bb = getRandomInt(sentence.charCodeAt(0),sentence.charCodeAt(1));
            this.wrongAnswers.push( String.fromCharCode(bb));
            j++;
        }
        let a = this.set;
        let b = new Set(this.wrongAnswers);
        this.wrongAnswers = ([...b].filter(i => !a.has(i)));
        console.log(...this.wrongAnswers);

        
     this.rects[0].rect.x = getRandomInt(0, x);
     this.rects[0].rect.y = getRandomInt(0, y);  
     this.rects[0].currentV = {x:getRandomInt(5,20) * (getRandomInt(0,2) * 2 - 1),y:getRandomInt(5,20)* (getRandomInt(0,2) * 2 - 1)};
         
        for (let i = 1; i < _maxLetters; i++){
            if (this.wrongAnswers[i - 1] === undefined){
                let buf = this.rects[0].text.charCodeAt(0) + getRandomInt(1, sentence.charCodeAt(1) - this.rects[0].text.charCodeAt(0));
                console.log( buf , ' я ', sentence.charCodeAt(1));
                if (buf > sentence.charCodeAt(1))
                    buf -= sentence.charCodeAt(1),console.log('chanfed to ', buf);
                this.wrongAnswers[i - 1] = String.fromCharCode(buf);
            }
            this.rects[i].changeWord(this.wrongAnswers[i - 1]);
            this.rects[i].rect.x = getRandomInt(0, x);
            this.rects[i].rect.y = getRandomInt(0, y);
            this.rects[i].currentV = {x:getRandomInt(5,20) * (getRandomInt(0,2) * 2 - 1),y:getRandomInt(5,20)* (getRandomInt(0,2) * 2 - 1)};
         }
                    


        

        for (let j = 0; j < this.rects.length; j++){
            this.rects[j].defaultColour = 'white';
            this.rects[j].colour = 'white';
            this.rects[j].active = true;

        }
    }

    checkWin(answer, target){
        if (this.rightAnswer.has(answer)){
            config.right.play();
             config.right.currentTime = 0;
            target.defaultColour = 'green';
            target.colour = target.defaultColour;
            target.active = false;
            this.rightAnswer.delete(answer);
            this.newLetters();
            
        }
        else{
            config.wrong.play();
            config.wrong.currentTime = 0;
            target.defaultColour = 'grey';
            target.colour = target.defaultColour;
            target.active = false;

            let nick = localStorage.getItem("current");
            let scoreTable = JSON.parse(localStorage.getItem("score-table"));
            let points =  Number(document.getElementById('score').innerHTML);
    
            points -= 100;
            document.getElementById('score').innerHTML = points;
        }
        //console.log("this.rightAnswer.length = " , this.rightAnswer.size);
        if (this.rightAnswer.size == 0){
            //console.log("U completed lelvel");
            this.newTask();
        }
    }

}