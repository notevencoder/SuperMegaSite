let area = document.getElementById("puzzle-area");
let bounds = area.getBoundingClientRect();
let wintext = document.getElementById("win_text");

let win_song = new Audio(); // Создаём новый элемент Audio
win_song.src = 'win.mp3'; // Указываем путь к звуку "клика"

let cock_parts = ["cock_body", "tail","cock_legs","cock_head", "abdul"];
let cock_parts_size = [[391 , 277], [272 , 439],[368 , 103],[381 , 504],[1363 , 1937]];

let body_bones = [[376,125],[211,264],[160,105]];
let parts_bones = [[39,329],[184,5],[235,421]];

let debug = false;


let x = area.getBoundingClientRect().x;
let y = area.getBoundingClientRect().y;

let offsetX = 0;
let offsetY = 0;

window.addEventListener("mousemove", mousemove);
document.getElementById("shuffle_btn").addEventListener("click", randomize);

wintext.style.display = "none";
let i = 0

while (i < cock_parts.length){
    let t = document.createElement("div");
    t.classList.add("piece");

    let name = cock_parts[i];

    if (debug)
        name += '_debug'
    t.style.backgroundImage = `url("img/${name + '.png'}")` ;

    t.draggable = true;
    t.style.transform = "rotate(0deg)";
    t.style.width = cock_parts_size[i][0]+ "px";
    t.style.height = cock_parts_size[i][1]+ "px";
    area.appendChild(t);


    if (i == 0)
        t.classList.add("cock_body");
        else
        if(i + 1 == cock_parts.length){
        t.classList.add("win");
    }
    else
        t.classList.add("cock_part");


    

    i += 1;
}




let cockParts = document.querySelectorAll(".cock_part");
let cockBody = document.querySelectorAll(".cock_body");
let win = document.querySelectorAll(".win")[0];


cockParts.forEach(element => {
    element.addEventListener("dragstart", dragstart);
    element.addEventListener("dragend", dragend);
    element.addEventListener("click", elementClick);
});

cockBody.forEach(element => {
    element.addEventListener("dragstart", dragstart);
    element.addEventListener("dragend", dragend);
    element.addEventListener("click", elementClick);
});

randomize();

function setElementPosition(posX, posY, element){
    let elBounds = element.getBoundingClientRect();

    let newX = posX - offsetX - bounds.x;
    let newY = posY - offsetY - bounds.y;

    if(newX < 0)
        newX = 0;
    if(newY < 0)
        newY = 0;
    if(newX > bounds.width - elBounds.width)
        newX = bounds.width - elBounds.width;
    if(newY > bounds.height - elBounds.height)
        newY = bounds.height - elBounds.height;
        

    element.style.left = newX + "px";
    element.style.top = newY + "px";
}


function dragstart(e){
    setTimeout(() => e.target.classList.add("piece--hidden"), 0);
    offsetX = x - e.target.getBoundingClientRect().x;
    offsetY = y - e.target.getBoundingClientRect().y;
}

function dragend(e){
    setTimeout(() => {
        e.target.classList.remove("piece--hidden");
        setElementPosition(x, y, e.target);
        tryComplete();
    }, 100);
}

function mousemove(event){
    x = event.pageX;
    y = event.pageY;
}

function elementClick(e){
    let curRot = e.target.style.transform.replaceAll(/\D/g, "") / 45;
    curRot = (curRot + 7) % 8 * -45;
    e.target.style.transform = `rotate(${curRot}deg)`;
    tryComplete();
}

function randomize(){
    showParts();
    if (!win_song.paused){
        win_song.pause();
        win_song.currentTime = 0;

    }
    win.style.display = "none";

    cockParts.forEach(element => {
        let rot = Math.floor(Math.random() * 8) * 45;
        element.style.transform = `rotate(${rot}deg)`;
        setElementPosition(
            Math.floor(Math.random() * bounds.width) + bounds.x,
            Math.floor(Math.random() * bounds.height) + bounds.y,
            element
        )
    });
    if(tryComplete())
        randomize();
}

function tryComplete(){

    if (!win_song.paused){
        win_song.pause();
        win_song.currentTime = 0;
    }

    let won = check();
    
    if (won)
      victory();

    return won;    
}

function check(){

    let rotFailed = false;

    minX = cockParts[0].getBoundingClientRect().x;
    minY = cockParts[0].getBoundingClientRect().y;
    maxX = cockParts[0].getBoundingClientRect().x;
    maxY = cockParts[0].getBoundingClientRect().y;

    let i = 0;
    
    
    while (i < cockParts.length){

            let element = cockParts[i];   
            
            let bodyX = cockBody[0].getBoundingClientRect().x + body_bones[i][0] ; 
            let bodyY = cockBody[0].getBoundingClientRect().y + body_bones[i][1] ; 
            

            let curX = element.getBoundingClientRect().x + parts_bones[i][0] ;    
            let curY = element.getBoundingClientRect().y  + parts_bones[i][1] ;  
            let diffX = curX - bodyX;
            let diffY =  curY - bodyY;

            
            console.log('body '," X: ",bodyX);
            console.log('body '," Y: ",bodyY);
            console.log('element ',i," X: ",curX);
            console.log('element ',i," Y: ",curY);
            console.log('diff '," Y: ",diffX);
            console.log('diff '," Y: ",diffY);
            console.log('sqrt '," : ",Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)));


            if (Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) > 50){
                rotFailed = true;
                i = cockParts.length + 1;
                return false;
            }
               
            

            if(!checkRotation(element)){
                rotFailed = true;
                return false;
            }
  
            i += 1;
    }


    if(rotFailed)
        return false;

    
    return true;
}

function checkRotation(element){
    let angle = element.style.transform.replaceAll(/\D/g, "");
    return angle == 0;
}

function showParts(){
    wintext.style.display = "none";
    cockParts.forEach(element => {
        element.style.display = "block";
    });
    cockBody.forEach(element => {
        element.style.display = "block";
    });

}

function hideParts(){

    wintext.style.display = "block";

    cockParts.forEach(element => {
        element.style.display = "none";
    });
    cockBody.forEach(element => {
        element.style.display = "none";
    });

}
function victory() {
    
    win_song.play();
    setTimeout(()=>{hideParts();win.style.display = "block";},3400);

  }