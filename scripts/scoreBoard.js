
let scoreTable = JSON.parse(localStorage.getItem("score-table"));
localStorage.setItem("score-table", JSON.stringify(scoreTable));

let str = "<strong class='score-count'>Лучшие игроки:</strong>";
if(scoreTable != null){
    scoreTable.forEach(element => {
        let nick = element.nick;
        let secs = element.time;
        if(secs == undefined)
            secs = 999999;
        if (nick == "")
            nick = "Anonimus";
    str += "<span class='score-name'>"+"<br>" + nick + ": " + element.score+" points, "+ secs +" secs </span>";
    });
}

let scores = document.getElementById("menu");
scores.innerHTML = str;