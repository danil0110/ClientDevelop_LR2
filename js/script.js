function addNote() {
    let note = document.createElement('li');
    note.classList.add('note-single');
    let noteName = document.createElement('p');
    let noteText = document.createElement('p');
    let noteDate = document.createElement('p');
    noteName.id = 'note-name-preview';
    noteText.id = 'note-text-preview';
    noteDate.id = 'note-date';
    noteDate.innerHTML = '18.09.2020';
    note.appendChild(noteName);
    note.appendChild(noteText);
    note.appendChild(noteDate);
    document.querySelector('.note-list').appendChild(note);
}

function deleteNote() {
    let notes = document.querySelectorAll('.note-single');
    let list = document.querySelector('.note-list');
    list.removeChild(notes[notes.length - 1]);
}