import getRandomInt from "./supportFunction.js";
import windowToCanvas from "./supportFunction.js";
import Rect from "./Rect.js";
import Canvas from "./canvas.js";


export default class Button{
    constructor(level = null,canvas = null, onClick,  word = "default", startPos= [getRandomInt(1,5),getRandomInt(1,5)]){
        
        
        this.isDown = false;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.position = startPos ;
        this.text  = word;
        this.onClick  = onClick;
     
        this.deffaultColour = 'white';
        this.colour = 'white';
        
        this.active = true;
        this.level = level;
        this.rect = new Rect(this.position[0] + 10, this.position[1] + 10, 100 , 50 );
        this.changeWord(word);
        this.canvas.addEventListener('mouseup' , this.mouseUp.bind(this));
        this.canvas.addEventListener('mousemove' , this.mouseMove.bind(this));
        this.canvas.addEventListener('mousedown' , this.mouseDown.bind(this));
    }


    isInRect(x,y){
       // console.log("isinrect", x, " " , y);
        var loc = {x:x, y:y};
        if (loc.x >= this.rect.x && loc.y >= this.rect.y
            && loc.x <= this.rect.x + this.rect.width && loc.y <= this.rect.y + this.rect.height  ){
                return true;
            }
    }

    mouseUp(e){
        const rect = this.canvas.getBoundingClientRect()
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (this.active ){
        if (this.isInRect(x,y)){
                    console.log("U moused " + this.text);
                    this.onClick(this.text,this);
                }

                else {

                    this.colour = this.deffaultColour;
                }
        }
        
        this.isDown = false;
            /*console.log("Ur mouse: x:", loc.x , "y: ", loc.y );
            console.log("Rect x:" ,  this.rect.x ,"y: ", this.rect.y);
            console.log("width: ",this.rect.x + this.rect.width, "height: ", this.rect.y + this.rect.height);    /**/
    }

    mouseMove(e){
        const rect = this.canvas.getBoundingClientRect()
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (this.active){
        if (!this.isDown)
        if (this.isInRect(x,y))
            this.colour = 'blue';
        else
            this.colour = this.deffaultColour;
        }

    }/**/

    mouseDown(e){
        const rect = this.canvas.getBoundingClientRect()
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.isDown = true;
        if (this.active){
            if (this.isInRect(x,y))
                this.colour = 'red';
                    else
                this.colour = this.deffaultColour;
            }   
       
    }
    

    


    draw(x = this.pos[0], y = this.pos[1]){


        this.ctx.font = "30px serif";

        let metrics = this.ctx.measureText(this.text);

        let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
        let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        let newWidth = this.ctx.measureText( this.text).width + 50;
        let newHeight = fontHeight;
        
        if (newWidth > this.rect.width)
            this.rect.width =  newWidth;
        if (newHeight > this.rect.height)
            this.rect.height = newHeight;

        this.rect.draw(this.canvas, this.colour);
        this.ctx.fillText(this.text,  this.rect.x + 25 , this.rect.y + 35);



        
    }

    changeWord(word){
        this.text = word;
        this.rect.width = this.ctx.measureText( this.text).width + 50;
        this.ctx.fillText(this.text,  this.rect.x + 25,this.rect.y + 25);
        //console.log("changeWord: ", this.text)
    }

}