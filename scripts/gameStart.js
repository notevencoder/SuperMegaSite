
function handleFormSubmit(){
    let textBox = document.querySelector("input");
    localStorage.setItem("current", textBox.value);
    window.location.href='gamebuff.html';
    }
    
    
document.getElementById("reg_button").addEventListener('click', handleFormSubmit);

