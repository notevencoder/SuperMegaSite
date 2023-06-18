

export default class Timer {
    constructor( container ) {
        this.htmlTimer = document.getElementById('timer');
        this.htmlTimer.innerHTML = 0; 
        
        this.timer = 0;
    }
    increment (n = 1){
        this.timer += n;
        this.htmlTimer.innerHTML =  this.timer ; 
    }
    decriment (n){
    this.timer -= n;
    this.htmlTimer.innerHTML =  this.timer ; 
    }
}