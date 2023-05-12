const archive = [
    {
        rus: ' "Отравленный!" ',
        lat: '"bene, quod non sicut coles gustum"',
    },
    {
        rus: '"Нас отследили, Джорно, отключай!"',
        lat: '"  bene, quod non sicut coles gustum"',
    },
    {
        rus: '"ДА НИКТО НЕ ЗНАЕТ!"',
        lat: '"  bene, quod non sicut coles gustum"',
    },
    {
        rus: '"Твоего деда больше нет, Джотаро!"',
        lat: '"  bene, quod non sicut coles gustum"',
    },
].sort(() => Math.random() - 0.5);

let Cnt = 0;
let bold = false

const createBtn = document.querySelector('.control__btn_new');
const newColorBtn = document.querySelector('.control__btn_change-color');
const info = document.querySelector('.info');
const rootNode = document.getElementById('rand');

createBtn.addEventListener('click', () => {
    if (archive.length === 0) {
        info.innerHTML = 'Фразы закончились'
        return
    }
    const picked = archive.pop()
    picked.lang = 'rus'
    render(rootNode, picked)
});

newColorBtn.addEventListener('click', () => {
    bold = !bold
    var rows = document.getElementsByClassName("class2"); 
    for (var i = 0; i < rows.length; i++){
        if (bold)
            rows[i].style.fontWeight = 'bold';
            else 
            rows[i].style.fontWeight = 'normal';

    }
})

function render(rootNode, elem) {
    
   const newItem = document.createElement('p')


   const num = document.createElement('span')
   
   num.style.textDecoration = "UnderLine";
   num.appendChild(document.createTextNode("n = " + Cnt + " "))
   
   
   const lat = document.createElement('span')
   lat.style.fontStyle = "italic";
   lat.appendChild(document.createTextNode(" " + elem.lat + " "))

   if (Cnt % 2 == 0)
     newItem.classList.add('class1')
   else 
     newItem.classList.add('class2')

   newItem.style.transform = `translate(${25}px, ${25*Cnt+1}px)`
   newItem.setAttribute('id', Cnt)
   

   newItem.appendChild(num)
   newItem.appendChild(lat)
   newItem.appendChild(document.createTextNode(" " + elem.rus + " "))

   newItem.setAttribute('data-el', JSON.stringify(elem))
   rootNode.appendChild(newItem)

   Cnt+=1
}



