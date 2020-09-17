function addNote() {
    let note = document.createElement('li');
    note.classList.add('note-single');
    note.innerHTML = 'My note';
    document.querySelector('.note-list').appendChild(note);
}