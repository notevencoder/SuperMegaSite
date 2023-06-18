import level from "./level.js";
import getRandomInt from "./supportFunction.js";
import wordContainer from "./wordContainer.js";
import Button from "./button.js";
import Config from "./config.js";
const config = new Config;

var _questions    =    ["Петух","Адепт","Алмаз","Апорт","Астма","Аборт"];

const _maxQuestions = 2;

                         


export default class level3 extends level{

    constructor(container, newTask){
        super(container);
            this.newTask = newTask;
            this.container = container;
            
            this.numOfQuiestions = 0;
            this.currentRow = 0;
            this.currentChar = 0;
            this.button = new Button(null, this.container, this.deleteChar.bind(this),"<--", [0,0]);
            this.rects = null;
            this.questionRects = [];
            for (let k = 0; k < 5; k++){
                let buff = [];
                for (let j = 0 ; j < 5; j++){
                    let lol = new wordContainer(this, this.container,this.checkWin.bind(this), " ", {x:(400+ j * 90),y:(80*k)});
                    lol.active = false;
                    buff.push(lol);
                    
                }
                this.questionRects.push(buff);
                    
            }
            this.wrongAnswers = [];
            this.rightAnswers = null;
            
            
            //console.log("_rightAnswer[i] = " , _rightAnswer[i]);
            this.initRects();
            this.update();

    }

    update(){
        if (_maxQuestions > this.numOfQuiestions){
           
           this.currentChar = 0;
           this.currentRow = 0;
            for (let j = 0; j < this.rects.length; j++){
                this.rects[j].defaultColour = 'white';
                this.rects[j].colour = 'white';
                this.rects[j].active = true;
            }
             for (let j = 0; j < this.questionRects.length; j++)
                for (let k = 0; k < this.questionRects[j].length; k++){
                this.questionRects[j][k].deffaultColour = 'white';
                
                this.questionRects[j][k].colour = 'white';
                this.questionRects[j][k].text = " ";
                    
            }
            

             let i = getRandomInt(0,_questions.length);

            this.question = _questions[i].toLowerCase();

            _questions.splice(i,1);

            console.log("this.question",this.question);

            
            
            


            
            
            

        }
        else {

            console.log("3 U WIN ");
            this.won = true;
        }
    }

    initRects(){
        

        if (this.rects == null){
            this.rects = [];

            let x = 0,y = 0;
            let sentence = "аяАЯ";
            for (let j =  sentence.charCodeAt(0); j <=  sentence.charCodeAt(1); j++)
                this.wrongAnswers.push( String.fromCharCode(j));

            for (const item of this.wrongAnswers){
                    //console.log(item);
                    let buff = new wordContainer(this, this.container,this.checkWin.bind(this), "123", {x:(x * 100),y:(500+y*100)});
                    buff.changeWord(item);
                    this.rects.push(buff);
                    x++; 
                    if (x >=12){x = 0;y++;}
                        
            }
        }
        
    }

    draw(){
        this.questionRects.forEach(element => {
            element.forEach(element2 => {
                element2.draw(0,0);
                
            });
            
        });
        let i = 0;
        this.rects.forEach(element => {
            element.draw(i,i);
            i++;
        });
        this.button.draw(0,0);
    }

    deleteChar(){
        
        if (this.currentChar > 0){
            this.currentChar--;

            let index = this.questionRects[this.currentRow][this.currentChar].text.charCodeAt(0)- 1072;
            console.log('index ',index);
            this.rects[index].defaultColour = 'white';
            this.rects[index].colour = 'white';
            this.rects[index].active = true;
            
            this.questionRects[this.currentRow][this.currentChar].changeWord( " ");  
        }

        console.log(this.currentChar);
        
    }

    checkWin(answer, target){

      
        
        this.questionRects[this.currentRow][this.currentChar].text = target.text;
        
        target.defaultColour = 'gray';
        target.colour = target.defaultColour;
        //target.active = false;
        this.currentChar++;

        if (this.currentChar >= 5){

            let num = 0;

            this.rects.forEach(element => {
                //element.active = true;
                //element.deffaultColour = 'white';
                //element.colour = element.deffaultColour;
            });

            for (let j = 0 ; j < this.questionRects[this.currentRow].length; j++){

                if (!this.question.includes( this.questionRects[this.currentRow][j].text)){
                    this.questionRects[this.currentRow][j].defaultColour = 'grey';
                    this.questionRects[this.currentRow][j].colour = 'grey';

                    let index = this.questionRects[this.currentRow][j].text.charCodeAt(0)- 1072;
                    console.log('gray ',this.questionRects[this.currentRow][j].text," ",index );

                    this.rects[index].defaultColour = 'grey';
                    this.rects[index].colour = 'grey';
                    this.rects[index].active = false;

                    continue;
                }

                if (this.question[j] != this.questionRects[this.currentRow][j].text){

                    this.questionRects[this.currentRow][j].defaultColour = 'yellow';
                    this.questionRects[this.currentRow][j].colour = 'yellow';

                    let index = this.questionRects[this.currentRow][j].text.charCodeAt(0)- 1072;
                    console.log('yellow ',this.questionRects[this.currentRow][j].text," ",index );

                    this.rects[index].defaultColour = 'yellow';
                    this.rects[index].colour = 'yellow';
                     continue;
                }

                this.questionRects[this.currentRow][j].defaultColour = 'green';
                this.questionRects[this.currentRow][j].colour = 'green';
                let index = this.questionRects[this.currentRow][j].text.charCodeAt(0)- 1072;
                console.log('green ',this.questionRects[this.currentRow][j].text," ",index );

                this.rects[index].defaultColour = 'green';
                this.rects[index].colour = 'green';
                num++;
            }

            

            this.currentRow++;
            this.currentChar = 0;

            if (num >= this.question.length){
                this.numOfQuiestions++;
                config.right.play();
                config.right.currentTime = 0;
                this.newTask();
            }
            else{

                let nick = localStorage.getItem("current");
            let scoreTable = JSON.parse(localStorage.getItem("score-table"));
            let points =  Number(document.getElementById('score').innerHTML);
            config.wrong.play();
            config.wrong.currentTime = 0;
            points -= 200;
            document.getElementById('score').innerHTML = points;
            }
                

               // console.log("num " , num)

        }

      

 
    }

}