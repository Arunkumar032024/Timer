// Make variable for buttons 

let hourSelect = document.querySelector('#hour');
minSelect = document.querySelector('#min');
secSelect = document.querySelector('#sec');

function setTimer(){

}







// function to add option in select element 
function addOption(type, count){
    let opt = document.createElement('option');
    opt.innerHTML = count < 10 ? `0${count}` : count;

// add hour options
for (let i = 0; i < 12; i++){
    addOption(hourSelect, i);
}
// add min and sec options
for (let i = 0; i < 60; i++){
    addOption(minSelect, i);
    addOption(secSelect, i);
}
