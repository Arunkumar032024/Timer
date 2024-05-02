// Make variable for buttons 
const setTimerBtn = document.querySelector("#setTimer"),
doneBtn = document.querySelector("#done"),
cancelBtn = document.querySelector("#cancel");


// Make variable for setTimer dialouge box 
const dialougeBox = document.querySelector('.dialouge-box'),
selectDialougeBox = dialougeBox.querySelectorAll('select');

// change color of select over onChange 
selectDialougeBox.forEach(select => {
    select.addEventListener('change', () => {
        select.classList.add('color');
    })
})

// Make variables for hour, min, sec of dialougeBox
const hourdia = dialougeBox.querySelector('#hour'),
mindia = dialougeBox.querySelector('#min'),
secdia = dialougeBox.querySelector('#sec');
// To click on setTimerBtn open set timer dialougeBox
setTimerBtn.addEventListener('click', () => {
    dialougeBox.classList.toggle('show');
})

// To click on doneBtn close set timer dialougeBox
doneBtn.addEventListener('click', () => {
    dialougeBox.classList.remove('show');
})

// To click on cancleBtn close set timer dialougeBox
cancelBtn.addEventListener('click', () => {
    dialougeBox.classList.remove('show');
})

function setTimer(){

}


// function to add option in select element 
function addOption(type, count){
    let opt = document.createElement('option');
    opt.innerHTML = count;
    opt.value = count;
    type.appendChild(opt);
}

// add hour options
for (let i = 0; i < 12; i++){
    addOption(hourdia, i);
}
// add min and sec options
for (let i = 0; i < 60; i++){
    addOption(mindia, i);
    addOption(secdia, i);
}

