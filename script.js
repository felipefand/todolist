const dev = false;

const addButton = document.getElementById('add-button');
const itemInput = document.getElementById('to-do-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const colorInput = document.getElementsByName('color');
const imageInput = document.getElementsByClassName('img');
const taskMain = document.getElementById('task-main');
const clearButton = document.getElementById('clear-all-button');

function init(){
    addButton.addEventListener('click', () => {

        const form = {
            name: itemInput.value.trim(),
            date: dateInput.value,
            time: timeInput.value,
            color: getRadioButtonValue()
        }

        if (validateForm(form)){
            clearInputs();
            createForm(form);
        }
    })

    clearButton.addEventListener('click', () => {
        while (taskMain.firstChild) {
            taskMain.removeChild(taskMain.firstChild);
        }
    })


    if (dev){
        createForm({name: 'título', date: '2022-11-16', time: '18:30', color:'green'});
        createForm({name: 'título2', date: '2022-11-17', time: '19:30', color:'yellow'});
        createForm({name: 'título3', date: '2022-11-18', time: '20:30', color:'red'});
        createForm({name: 'título3', date: '2022-11-18', time: '20:30', color:'red'});
        createForm({name: 'título3', date: '2022-11-18', time: '20:30', color:'red'});
        createForm({name: 'título3', date: '2022-11-18', time: '20:30', color:'red'});
        createForm({name: 'título3', date: '2022-11-18', time: '20:30', color:'red'});
        createForm({name: 'título3', date: '2022-11-18', time: '20:30', color:'red'});
        createForm({name: 'título3', date: '2022-11-18', time: '20:30', color:'red'});
    }
}

function createForm(form){
    const entry = document.createElement('div');

    const title = document.createElement('p');
    title.innerHTML = form.name;
    title.classList.add('task-title');

    const dateAndTime = document.createElement('div');
    const date = document.createElement('p');
    date.innerHTML = form.date.substring(5);
    date.classList.add('task-date');

    const time = document.createElement('p');
    time.innerHTML = form.time;
    time.classList.add('task-time');

    entry.classList.add(`${form.color}-background`);

    dateAndTime.appendChild(date);
    dateAndTime.appendChild(time);
    dateAndTime.classList.add('task-date-and-time');

    entry.appendChild(title);
    entry.appendChild(dateAndTime);
    entry.classList.add('task-entry');

    taskMain.appendChild(entry);
}

function getRadioButtonValue() {
    for (let i = 0; i < colorInput.length; i++){
        if (colorInput[i].checked) {
            return colorInput[i].value;
        }
    }
}

function isRadioButtonsChecked(){
    for (let i = 0; i < colorInput.length; i++){
        if (colorInput[i].checked) {
            return true;
        }
    }

    return false;
}

function validateForm(form){
    clearAlerts();

    if (isNullOrWhiteSpace(form.name)){
        alertInput(itemInput);
        return false;
    }

    if (!isDateValid(form.date)){
        alertInput(dateInput);
        return false;
    }

    if (!isTimeValid(form.time)){
        alertInput(timeInput);
        return false;
    }

    if (!isRadioButtonsChecked()){
        alertInput(colorInput);
        return false;
    }

    return true;
}

function isDateValid(date){
    if (isNullOrWhiteSpace(date)) return false;

    const d = new Date().toISOString().substring(0,10);

    if (Date.parse(d) > Date.parse(date)) return false;

    return true;
}

function isTimeValid(time){
    if (isNullOrWhiteSpace(time)) return false;

    const t = new Date().toISOString();
    const tZone = `${t.substring(11,13) - 3}${t.substring(13,16)}`;

    if (tZone > time) return false;

    return true;
}

function isNullOrWhiteSpace(input){
    return (typeof input === 'undefined' || input == null) || input.replace(/\s/g, '').length < 1;
}

function clearAlerts(){
    itemInput.classList.remove('red-border');
    dateInput.classList.remove('red-border');
    timeInput.classList.remove('red-border');

    for (let i = 0; i < imageInput.length; i++){
        imageInput[i].classList.remove('red-outline');
    }
}

function clearInputs(){
    itemInput.value = '';
    dateInput.value = '';
    timeInput.value = '';

    for (let i = 0; i < colorInput.length; i++){
        colorInput[i].checked = false;
    }
}

function alertInput(element){
    if (element.length > 1){
        for (let i = 0; i < imageInput.length; i++){
            imageInput[i].classList.add('red-outline');
        }
    } else {
        element.classList.add('red-border');
    }
}

init();