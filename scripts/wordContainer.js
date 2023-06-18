import getRandomInt from "./supportFunction.js";
import windowToCanvas from "./supportFunction.js";
import Rect from "./Rect.js";
import Canvas from "./canvas.js";
import Config from "./config.js";
const config = new  Config;
export default class wordContainer{
    constructor(level = null,canvas = null,checkWin,  word = "default", startPos= {x:getRandomInt(1,5),y:getRandomInt(1,5)}, V = {x:0,y:0}, isDragable = false){
        
        
        this.isDown = false;
        this.isDragable = isDragable;
        this.isDragged = false;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.pos = startPos ;
        this.text  = word;
        this.checkWin  = checkWin;
        this.currentV = V;
        this.defaultColour = 'white';
        this.colour = 'white';
        this.last = new Date().getTime();

      
        this.active = true;
        this.level = level;
        this.rect = new Rect(this.pos.x + 10, this.pos.y + 10, 100 , 50 );
        this.changeWord(word);
        this.canvas.addEventListener('mouseup'   , this.mouseUp.bind(this));
        this.canvas.addEventListener('mousemove' , this.mouseMove.bind(this));
        this.canvas.addEventListener('mousedown' , this.mouseDown.bind(this))
        
        
       // console.log(this.text, " ",  this.currentV, " ",  this.pos);;
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
        
        if (this.active && this.level.active){
        if (this.isInRect(x,y)){
                    console.log("U moused " + this.text);
                    console.log("Checkwin^^");
                    if (this.checkWin != null)
                        this.checkWin(this.text,this);
                }

                else {

                    this.colour = this.defaultColour;
                }
                this.isDragged = false;
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
        if (this.active && this.level.active){
            if (!this.isDown)
                if (this.isInRect(x,y))
                     this.colour = 'blue';
            else
                this.colour = this.defaultColour;

            if (this.isDragged && this.isDown)
                this.rect.x = x, this.rect.y = y;
        }

    }/**/

    mouseDown(e){
        const rect = this.canvas.getBoundingClientRect()
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.isDown = true;
        if (this.active && this.level.active){
            if (this.isInRect(x,y)){
                this.colour = 'red';
                if (this.isDragable)
                    this.isDragged = true;
            }
                    else
                this.colour = this.defaultColour;
            }   
       
    }
    

    updatePos(){
        const now = new Date().getTime();
        let dt = (now - this.last)*0.01;
        this.last = now;
        this.applyVector({x:this.currentV.x * dt, y:this.currentV.y * dt});

       // console.log(this.text,' ',this.pos);

    }


    draw(x = this.pos.x, y = this.pos.y){
        this.updatePos();

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

    changePos(x,y){
        this.rect.x = x;
        this.rect.y = y;
    }

    applyVector(pos){
        
        this.rect.x += pos.x;
        this.rect.y += pos.y;
        if (this.rect.y > config.canvasHeight)
            this.rect.y = 0;
        if (this.rect.y + this.rect.height < 0)
            this.rect.y = config.canvasHeight;
        
        if (this.rect.x > config.canvasWidth)
            this.rect.x = 0;
        if (this.rect.x + this.rect.width < 0)
            this.rect.x = config.canvasWidth;   

        this.pos = {x:this.rect.x,y:this.rect.y};
    }

}