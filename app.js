// Make variable different kinds of variables
const playBtn = document.querySelector('#play-btn'),
    pauseBtn = document.querySelector('#pause-btn'),
    resetBtn = document.querySelector('#reset-btn'),
    clearBtn = document.querySelector('#clear-btn'),
    stopBtn = document.querySelector('#stop-btn'),
    tone = document.querySelector("audio"),
    countBoxContainer = document.querySelector('.count-box');
let hourSelect = document.querySelector('#hour'),
minSelect = document.querySelector('#min'),
secSelect = document.querySelector('#sec'),
timer = null,
toneduration = null,
[seconds, minutes, hours] = [0, 0, 0],
[sh, sm, ss] = [0, 0, 0],
[hd, md, sd] = [0, 0, 0],
[he, me, se] = [0, 0, 0];


// code for save data to localStorage
function saveData(){
    localStorage.setItem('data', countBoxContainer.innerHTML);
}
function showData(){
    countBoxContainer.innerHTML = localStorage.getItem('data');
    if(countBoxContainer.innerHTML == ''){
        clearBtn.classList.add('pointer-none');
        clearBtn.classList.remove('active')
    }else{
        clearBtn.classList.add('active')
    }
}
showData();

// code for onchange the select Option
document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', () => {
        playBtn.classList.add('active');
    })
    
})


// code for timer history
function startTime(){
    let date = new Date();
    sh = date.getHours() < 10 ? `0${date.getHours()}`: date.getHours();
    sm = date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes();
    ss = date.getSeconds() < 10 ? `0${date.getSeconds()}`: date.getSeconds();
    sh = sh > 12 ? sh - 12 : sh;
    console.log(sh, sm, ss);
    console.log(date)
}
function endTime(){
    let date = new Date();
    he = date.getHours() < 10 ? `0${date.getHours()}`: date.getHours();

    me = date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes();

    se = date.getSeconds() < 10 ? `0${date.getSeconds()}`: date.getSeconds();
    
    he = he > 12 ? he - 12 : he;
}

function timeDuration(){
    hd = hourSelect.value < 10 ? `0${hourSelect.value}` : hourSelect.value;
    md = minSelect.value < 10 ? `0${minSelect.value}` : minSelect.value;
    sd = secSelect.value < 10 ? `0${secSelect.value}` : secSelect.value;
}

function setHistory(){
    endTime();
    let div = document.createElement('div');
    div.className = 'count';
    div.innerHTML = `<p><span id="start">${sh}:${sm}:${ss}</span><span id="stop">${he}:${me}:${se}</span></p>
    <p id="stop-time">${hd}:${md}:${sd}</p>`;
    countBoxContainer.appendChild(div);
    clearBtn.classList.remove('pointer-none');
    clearBtn.classList.add('active')
    saveData();
}



// code for stop tone 
function stopTone(result){
    if(result){
        timer = null;
        document.querySelectorAll('select').forEach(select => {
            select.classList.add('pointer-none');
        });
        clearBtn.classList.add('pointer-none');
        resetBtn.classList.add('pointer-none');
        resetBtn.classList.remove('active');
        toneduration = setInterval(()=> {
            tone.play();
        }, 0);
        
    }else{
        clearInterval(toneduration);
        tone.pause();
        clearInterval(timer);
    }
}

// to click on stop btn ringtone has been pause and timer will be restart 
stopBtn.addEventListener('click', () => {
    stopTone(false);
    playBtn.classList.remove('hide');
        stopBtn.classList.add('hide');
        document.querySelectorAll('select').forEach(select => {
            select.classList.remove('pointer-none');
        });
        clearBtn.classList.remove('pointer-none');
        stopBtn.classList.remove('active');
})

// to click on clear button, clear the history of timer container 
clearBtn.addEventListener('click', ()=>{
    countBoxContainer.innerHTML = '';
    saveData();
    clearBtn.classList.add('pointer-none');
    clearBtn.classList.remove('active')
})

// to click on play btn, start the timer 
playBtn.addEventListener('click', () => {
    if (secSelect.value != 0 || minSelect.value != 0 || hourSelect.value != 0) {
        [seconds, minutes, hours] = [secSelect.value, minSelect.value, hourSelect.value];
        timer = setInterval(startTimer, 1000);
        startTime();        
        timeDuration();
        playBtn.classList.add('hide');
        pauseBtn.classList.remove('hide');
        pauseBtn.classList.add('active');
        resetBtn.classList.add('active');
        resetBtn.classList.remove('pointer-none');
    } else {
        alert('Please! set a timer');
    }
})


// to click on reset btn, timer goes to reset and ready for restart
resetBtn.addEventListener('click', ()=>{
    if(hourSelect != 0 || minSelect != 0 || secSelect != 0){
        resetTimer();
        pauseBtn.classList.add('hide');
        playBtn.classList.remove('hide');
        playBtn.classList.remove('active');
        // playBtn.classList.add('pointer-none');
        resetBtn.classList.remove('active');
        resetBtn.classList.add('pointer-none');
    }
})

// to click on pauseBtn timer has been pauseBtn, and ready to play
pauseBtn.addEventListener('click', () => {
    if(timer != null){
        stopTimer();
        pauseBtn.classList.add('hide');
        playBtn.classList.remove('hide');
    }
})

// function for start timer 
function startTimer() {
    if (timer != null) {
        if (hours == 0 && minutes == 0 && seconds == 0) {
            [hourSelect.value, minSelect.value, secSelect.value] = [hours, minutes, seconds];
            setHistory();
            pauseBtn.classList.add('hide');
            playBtn.classList.add('hide');
            stopBtn.classList.remove('hide');
            playBtn.classList.remove('active');
            resetBtn.classList.remove('active');
            stopBtn.classList.add('active');
            
            stopTone(true);
        } else if (hours != 0 || minutes != 0 || seconds != 0) {
            
            seconds--;
            if (seconds < 0) {
                minutes--;
                seconds = 59
            }
            if (minutes < 0) {
                hours--;
                minutes = 59;
            }
            if (hours < 0) {
                hours = 0;
            }
        }
        [hourSelect.value, minSelect.value, secSelect.value] = [hours, minutes, seconds];   
    }
}

// function for stop timer 
function stopTimer(){
    clearInterval(timer);
}

// function for reset timer 
function resetTimer(){
    [hourSelect.value, minSelect.value, secSelect.value] = [0, 0, 0];
    clearInterval(timer);
    // timer = null;
}

// function to add option in select element 
function addOption(type, count) {
    let opt = document.createElement('option');
    opt.innerHTML = count < 10 ? `0${count}` : count;
    opt.value = count;
    type.appendChild(opt);
}
// add hour options
for (let i = 0; i < 12; i++) {
    addOption(hourSelect, i);
}
// add min and sec options
for (let i = 0; i < 60; i++) {
    addOption(minSelect, i);
    addOption(secSelect, i);
}
