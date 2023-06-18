
export default class Rect{

    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.active = true;
        this.colour = null;
    }

    draw( canvas , colour){
        let currentColour = 'green';
        
        if (this.colour == null)
            currentColour = colour;
        else 
            currentColour = this.colour;
        
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = currentColour;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'black'
            ctx.strokeRect(this.x,this.y, this.width, this.height);
    }
}
