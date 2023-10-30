const notes = []; //Creates empty array for storing notes

const noteForm = document.getElementById("notes-form");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const notesGrid = document.getElementById("notes-grid");

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleAddNote();
});

function handleAddNote() {
  const newNote = {
    id: notes.length + 1,
    title: titleInput.value,
    content: contentInput.value,
  };
  notes.unshift(newNote);
  createNotes();
  clearForm();
}

function clearForm() {
  titleInput.value = "";
  contentInput.value = "";
}

function createNotes() {
  notesGrid.innerHTML = "";
  notes.forEach((note) => {
    const noteItem = document.createElement("div");
    noteItem.classList.add("note-item");

    const noteHeader = document.createElement("div");
    noteHeader.classList.add("note-header");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";

    noteHeader.appendChild(deleteButton);

    const noteTitle = document.createElement("h2");
    noteTitle.textContent = note.title;

    const noteContent = document.createElement("p");
    noteContent.textContent = note.content;

    noteItem.appendChild(noteHeader);
    noteItem.appendChild(noteTitle);
    noteItem.appendChild(noteContent);

    notesGrid.appendChild(noteItem);
  });
}
