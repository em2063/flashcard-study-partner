let notes = []; //Creates empty array for storing notes

const noteForm = document.getElementById("notes-form"); //gets form
const titleInput = document.getElementById("titleInput"); //gets title element of form
const contentInput = document.getElementById("contentInput"); //gets content element of form
const notesGrid = document.getElementById("notes-grid"); //gets container that holds notes

noteForm.addEventListener("submit", (event) => {
  event.preventDefault(); //prevents refresh of page
  handleAddNote(); //once button is pressed calls method to create new note
});

function handleAddNote() {
  //creates new note object with parameters
  const newNote = {
    id: notes.length + 1,
    title: titleInput.value, //gets title
    content: contentInput.value, //gets content
  };
  notes.unshift(newNote); //adds note to beginning of array
  createNotes(); //calls note template
  clearForm(); //resets form
}

function deleteNote(noteId) {
  notes = notes.filter((note) => note.id !== noteId);
  createNotes();
}

//clears form for use again
function clearForm() {
  titleInput.value = "";
  contentInput.value = "";
}

//template for creating new note - creates html elements and appends into the note grid
function createNotes() {
  notesGrid.innerHTML = "";
  notes.forEach((note) => {
    const noteItem = document.createElement("div");
    noteItem.classList.add("note-item"); //creates container for everything inside note

    const noteHeader = document.createElement("div"); //creates container for header elements
    noteHeader.classList.add("note-header");

    const deleteButton = document.createElement("button"); //creates buttomn to remove note
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", () => deleteNote(note.id));

    noteHeader.appendChild(deleteButton); //adds delete button onto header

    const noteTitle = document.createElement("h2"); //creates title section in note
    noteTitle.textContent = note.title;

    const noteContent = document.createElement("p"); //Creates content section in note
    noteContent.textContent = note.content;

    noteItem.appendChild(noteHeader);
    noteItem.appendChild(noteTitle);
    noteItem.appendChild(noteContent); //adds all elements into note

    notesGrid.appendChild(noteItem); //adds note into grid
  });
}
