class Score {
    constructor( container ) {

       this.htmlScore = document.getElementById('score');
       this.htmlScore.innerHTML = 321; 
      
       
       this.score = 0;
    }

   increment (n){
        this.score += n;
        this.htmlScore.innerHTML =  this.score; 

   }

   decriment (n){
    this.score -= n;
    this.htmlScore.innerHTML =  this.score; 

}
}