import Config from "./config.js";

export default class Canvas {

    constructor( container ) {
        this.config = new Config();
        this.element = document.createElement( "canvas" );
        this.context = this.element.getContext( "2d" );

        this.element.width = this.config.canvasWidth;
        this.element.height = this.config.canvasHeight;

        container.appendChild( this.element );

    }

}