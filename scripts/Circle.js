
export default class Circle{

    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        
        this.active = true;
        this.colour = null;
        this.backgroundColour = null;
    }

    draw( canvas , colour){
        let currentColour = 'green';
        
        if (this.colour == null)
            this.colour = colour;
        currentColour = this.colour;
        
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = currentColour;
            ctx.arc(75,75,50,0,Math.PI*2,true);
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'black'
            ctx.strokeRect(this.x,this.y, this.width, this.height);
    }
}
