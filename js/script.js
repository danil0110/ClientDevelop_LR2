function addNote() {
    let note = document.createElement('li');
    note.classList.add('note-single');
    note.innerHTML = 'My note';
    document.querySelector('.note-list').appendChild(note);
}

function deleteNote() {
    let notes = document.querySelectorAll('.note-single');
    let list = document.querySelector('.note-list');
    list.removeChild(notes[notes.length - 1]);
}