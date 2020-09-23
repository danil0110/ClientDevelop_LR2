var notesArray = new Array;

function addNote() {
    let newNote = {
        id: generateID(),
        name: '',
        body: '',
        date: updateDate(),
        selected: true,
    }
    unselectCurrentNote();
    notesArray.unshift(newNote);
    unlockInputs();
    let noteName = document.createElement('p');
    let noteText = document.createElement('p');
    let noteDate = document.createElement('p');
    noteName.id = 'note-name-preview';
    noteText.id = 'note-text-preview';
    noteDate.id = 'note-date';
    noteDate.innerText = newNote.date;
    let noteElement = document.createElement('li');
    noteElement.classList.add('note-chosen', 'note-single');
    noteElement.id = newNote.id;
    noteElement.appendChild(noteName);
    noteElement.appendChild(noteText);
    noteElement.appendChild(noteDate);
    document.querySelector('.note-list').insertBefore(noteElement, document.querySelector('.note-list').firstChild);
    document.getElementById('note-name').value = '';
    document.getElementById('note-text').value = '';
}

function deleteNote() {
    if (confirm('Are you sure?')) {
        let selectedNote = document.querySelector('.note-chosen');
        let objIndex;
        for (let i = 0; i < notesArray.length; i++) {
            if (selectedNote.id === notesArray[i].id) {
                notesArray.splice(i, 1);
                document.querySelector('.note-list').removeChild(document.querySelector('.note-list').children[i]);
                break;
            }
        }
        document.getElementById('note-name').value = '';
        document.getElementById('note-text').value = '';
        lockInputs();
    }
}

document.getElementById('note-name').oninput = () => {
    if (notesArray[0].selected === false) {
        sortNoteMenu();
    }
    document.querySelector('.note-chosen').children[0].innerText = document.getElementById('note-name').value;
    document.querySelector('.note-chosen').children[2].innerText = updateDate();
}

document.getElementById('note-text').oninput = () => {
    if (notesArray[0].selected === false) {
        sortNoteMenu();
    }
    document.querySelector('.note-chosen').children[1].innerText = document.getElementById('note-text').value;
    document.querySelector('.note-chosen').children[2].innerText = updateDate();
}

document.getElementById('note-name').onchange = () => {
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].selected === true) {
            notesArray[i].name = document.getElementById('note-name').value;
            notesArray[i].date = document.querySelector('.note-chosen').children[2].innerText;
            break;
        }
    }
    console.log(notesArray);
}

document.getElementById('note-text').onchange = () => {
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].selected === true) {
            notesArray[i].body = document.getElementById('note-text').value;
            notesArray[i].date = document.querySelector('.note-chosen').children[2].innerText;
            break;
        }
    }
    console.log(notesArray);
}

window.onbeforeunload = () => {
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].selected === true) {
            notesArray[i].name = document.getElementById('note-name').value;
            notesArray[i].body = document.getElementById('note-text').value;
            notesArray[i].date = document.querySelector('.note-chosen').children[2].innerText;
            break;
        }
    }
    localStorage.setItem('storedNotes', JSON.stringify(notesArray));
}

function updateDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return day + '.' + month + '.' + date.getFullYear() + ' ' + hours + ':' + minutes;
}

function unselectCurrentNote() {
    let chosenNote = document.querySelector('.note-chosen');
    if (chosenNote != null) {
        chosenNote.classList.remove('note-chosen');
    }
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].selected) {
            notesArray[i].selected = false;
            break;
        }
    }
}

document.querySelector('.note-list').onclick = function(event) {
    let target;
    if (event.target.tagName === 'UL') {
        return;
    }
    if (event.target.tagName != 'LI') {
        target = event.target.parentNode;
    } else {
        target = event.target;
    }
    unselectCurrentNote();

    let selectedNote;
    for (let i = 0; i < notesArray.length; i++) {
        if (target.id === notesArray[i].id) {
            selectedNote = notesArray[i];
            break;
        }
    }
    target.classList.remove('note-single');
    target.classList.add('note-chosen', 'note-single');
    document.getElementById('note-name').value = selectedNote.name;
    document.getElementById('note-text').value = selectedNote.body;
    selectedNote.selected = true;
    unlockInputs();
}

function generateID() {
    return `f${(~~(Math.random()*1e8)).toString(16)}`;
}

function lockInputs() {
    document.getElementById('note-name').disabled = true;
    document.getElementById('delete-note').disabled = true;
    document.getElementById('note-text').disabled = true;
}

function unlockInputs() {
    document.getElementById('note-name').disabled = false;
    document.getElementById('delete-note').disabled = false;
    document.getElementById('note-text').disabled = false;
}

function sortNoteMenu() {
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].selected === true) {
            let tempArrayEl = notesArray[i];
            notesArray.splice(i, 1);
            notesArray.unshift(tempArrayEl);
            let tempNoteEl = document.querySelector('.note-chosen');
            document.querySelector('.note-list').removeChild(document.querySelector('.note-list').children[i]);
            document.querySelector('.note-list').insertBefore(tempNoteEl, document.querySelector('.note-list').firstChild);
            break;
        }
    }
}

window.onload = () => {
    lockInputs();
    document.getElementById('note-name').value = '';
    document.getElementById('note-text').value = '';
    if (JSON.parse(localStorage.getItem('storedNotes')) === null) {
        return;
    }
    notesArray = JSON.parse(localStorage.getItem('storedNotes'));
    for (let i = 0; i < notesArray.length; i++) {
        let noteName = document.createElement('p');
        let noteText = document.createElement('p');
        let noteDate = document.createElement('p');
        noteName.id = 'note-name-preview';
        noteText.id = 'note-text-preview';
        noteDate.id = 'note-date';
        noteName.innerText = notesArray[i].name;
        noteText.innerText = notesArray[i].body;
        noteDate.innerText = notesArray[i].date;
        let noteElement = document.createElement('li');
        noteElement.classList.add('note-single');
        noteElement.id = notesArray[i].id;
        noteElement.appendChild(noteName);
        noteElement.appendChild(noteText);
        noteElement.appendChild(noteDate);
        document.querySelector('.note-list').appendChild(noteElement);
    }
}