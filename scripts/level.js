


export default class level{

    constructor(containrer){
        this.question = "null";
        this.rightAnswer = "null";
        this.wrongAnswers = "null";

        this.active = false;
        this.containrer = containrer;

    }
    activate(){
        this.active = true;

    }
    getQuestion(){
        return this.question;
    }
    getRightAnswer(){
        return this.rightAnswer;
    }
    getWrongAnswers(){
        return this.wrongAnswers;
    }


}