import Config from "./config.js";
import level1 from "./level1.js";
import level2 from "./level2.js";
import level3 from "./level3.js";
import Button from "./button.js";
import Rect from "./Rect.js";
import wordContainer from "./wordContainer.js";

let conifg = new Config();
export default class Task{

    constructor (container, level = null){
        
        this.container = container.canvas.element;
        this.game = container;
        this.newQuestion.bind(this);

        this.levels = [ new level1(this.container, this.newQuestion.bind(this)), new level2(this.container, this.newQuestion.bind(this)), new level3(this.container, this.newQuestion.bind(this))];
        this.levels[0].activate();
        
        this.menuHide = false;
        this.menu = [];
        this.background = new Rect(conifg.canvasWidth / 5,conifg.canvasHeight/ 5, 750,500);
        this.background.colour = 'pink';
        this.label = new wordContainer(this, this.container,null, 'lol', {x:this.background.x + 120,y:this.background.y + 150});
        this.label.active = false;

        this.button = new Button(this, this.container,this.hideMenu.bind(this), "Start level", [this.background.x + 250,this.background.y + 250]);
        this.menu.push(this.background);
        this.menu.push(this.label);
        this.menu.push(this.button);
        
        this.currentLevel = 0;
        this.label.changeWord(this.levels[this.currentLevel].tip);
        
        if (this.currentLevel >= this.levels.length - 1){

            console.log("this.levels.size",this.levels.length);
            this.label.text = "Поздравляем, вы прошли игру!";
            this.button.text =  "Таблица игроков";
            this.button.onClick = this.game.endGame.bind(this.game);

        }
        //this.hideMenu();
    }

    newQuestion(){
        
        this.levels[this.currentLevel].update();
        let nick = localStorage.getItem("current");
        let scoreTable = JSON.parse(localStorage.getItem("score-table"));
        let points =  Number(document.getElementById('score').innerHTML);

        points += 1000;
        document.getElementById('score').innerHTML = points;
        if (this.levels[this.currentLevel].won) {
            if (this.currentLevel >= this.levels.length - 1){
            
                console.log("this.levels.size",this.levels.length);
                this.label.text = "Поздравляем, вы прошли игру!";
                this.button.text =  "Таблица игроков";
                this.button.onClick = this.game.endGame.bind(this.game);
            }else{    
                this.button.onClick = this.nextLevel.bind(this);
                this.label.changeWord("Поздравдяем, вы прошли уровень!");
                this.button.changeWord("Next level");
            
            }this.showMenu();   
        }
        
    }

    
    nextLevel(){
        this.levels[this.currentLevel].active = false;
        this.currentLevel+=1; 
        
            this.label.changeWord(this.levels[this.currentLevel].tip    ) ;
            this.button.text =  "Start level";
            this.button.onClick = this.hideMenu.bind(this);
            this.showMenu();
            

        this.levels[this.currentLevel].activate();
    }


    hideMenu(){
        this.menuHide = true;
        this.menu.forEach(element => {
            element.active = false;
        });
    }
    showMenu(){
        this.menuHide = false;
        this.menu.forEach(element => {
            element.active = true;
        });

    }

    update(){
        if (this.currentLevel  == null){
            this.currentLevel = 0;
        }

    }
    draw(){
       // console.log("Draw task");   
       
       console.log(this.currentLevel);
        this.levels[this.currentLevel].draw();
        if (!this.menuHide)
        this.menu.forEach(element => {
            element.draw(this.container, 'white')
        });
       
    }

}