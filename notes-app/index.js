// Initialise an empty array for storing flashcards
let flashcards = [];
//Initialise empty array for storing folders
let folders = [];

// Get form and form elements
const flashcardForm = document.getElementById("flashcard-form"); //gets flashcard form
const newFlashFormBox = document.getElementById("new-flash-box");
const titleInput = document.getElementById("titleInput"); //gets title input of flashcard form
const contentInput = document.getElementById("contentInput"); //gets description input of flashcard form
const flashcardGrid = document.getElementById("flashcard-grid"); //gets grid that flashcards sit in
const submitButton = document.getElementById("submit-button"); //gets button for submitting flashcard form
const folderContainer = document.getElementById("folder-container"); //gets container that all elements of folder sit in
const folderFormContainer = document.getElementById("folder-form-container"); //gets container that flashcard form sits in
const newFolderButton = document.getElementById("folder-button"); //gets button for creating new folder
const folderCancelButton = document.getElementById("folder-cancel-button"); //gets button for cancelling folder creation
const folderList = document.getElementById("folder-list"); //gets container that folders sit in
const folderTitle = document.getElementById("folder-input"); //gets input from dolder form
const folderDesc = document.getElementById("folder-desc"); //gets description from folder form
const folderForm = document.getElementById("folder-form"); //gets folder form
const folderGridTitle = document.getElementById("flashcard-folder-title");
const folderGridDescription = document.getElementById(
  "flashcard-folder-description"
);
const folderButtonContainer = document.getElementById(
  "folder-container-buttons"
);

// Event listener for new folder
newFolderButton.addEventListener("click", () => handleNewFolder());
folderCancelButton.addEventListener("click", () => handleFolderCancel());

folderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleAddFolder();
});

//Function that creates new folder
function handleNewFolder() {
  newFolderButton.style.display = "none";
  folderFormContainer.style.display = "flex";
}

//Function that handles when users no longer want to create a folder
function handleFolderCancel() {
  folderFormContainer.style.display = "none";
  newFolderButton.style.display = "flex";
}

function clearFolderForm() {
  folderTitle.value = "";
  folderDesc.value = "";
}

function handleAddFolder() {
  const newFolder = {
    id: folders.length + 1,
    title: folderTitle.value,
    description: folderDesc.value,
  };
  folders.unshift(newFolder);
  folderFormContainer.style.display = "none";
  newFolderButton.style.display = "flex";
  createFolder();
  clearFolderForm();
}

function handleNewFlashcard() {
  folderButtonContainer.removeChild(
    document.getElementById("newFlashcardButton")
  );
  folderButtonContainer.removeChild(newFolderButton);
  let thisForm = flashcardForm;
  thisForm.id = "thisFlashForm";
  newFlashFormBox.appendChild(thisForm);
  thisForm.style.display = "flex";
}

function handleOpenFolder(Id) {
  const folder = folders.find((folder) => folder.id === Id);
  folderGridTitle.textContent = folder.title;
  folderGridDescription.textContent = folder.description;

  const existingButton = document.getElementById("newFlashcardButton");
  if (!existingButton) {
    const newFlashcardButton = document.createElement("button");
    newFlashcardButton.textContent = "New Flashcard";
    newFlashcardButton.id = "newFlashcardButton";
    newFlashcardButton.addEventListener("click", () => handleNewFlashcard());
    folderButtonContainer.appendChild(newFlashcardButton);
  }
}

function handleDeleteFolder(folderId) {
  folders = folders.filter((folder) => folder.id !== folderId);
  createFolder();
  folderGridTitle.textContent = "";
  folderGridDescription.textContent = "";
}

// Event listener for form submission
flashcardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleAddFlashcard();
});

//function that handles cancel button on flashcard form
function handleCancelFlashcardForm() {
  titleInput.textContent = "";
  contentInput.textContent = "";
}

// Function to add a new flashcard
function handleAddFlashcard() {
  const newFlashcard = {
    id: flashcards.length + 1,
    title: titleInput.value,
    content: contentInput.value,
    isRevealed: false,
  };
  flashcards.unshift(newFlashcard);
  createFlashcard();
  clearForm();

  document.getElementById("thisFlashForm").style.display = "none";
  folderButtonContainer.appendChild(newFolderButton);
  folderButtonContainer.appendChild(
    document.getElementById("newFlashcardButton")
  );
}

// Function to delete a flashcard
function deleteFlashcard(flashcardId) {
  flashcards = flashcards.filter((flashcard) => flashcard.id !== flashcardId);
  createFlashcard();
}

// Function to handle cancel action
function handleCancel() {
  titleInput.value = "";
  contentInput.value = "";
  flashcardForm.removeChild(saveButton);
  flashcardForm.removeChild(cancelButton);
  flashcardForm.appendChild(submitButton);
}

// Function to handle save action
function handleSave(flashcard) {
  flashcard.title = titleInput.value;
  flashcard.content = contentInput.value;
  titleInput.value = "";
  contentInput.value = "";
  flashcardForm.removeChild(saveButton);
  flashcardForm.removeChild(cancelButton);
  flashcardForm.appendChild(submitButton);
  createFlashcard();
}

let flashcardEditID = null;

// Create save and cancel buttons
const saveButton = document.createElement("button");
saveButton.textContent = "save";
saveButton.addEventListener("click", () => {
  const flashcard = flashcards.find(
    (flashcard) => flashcard.id === flashcardEditID
  );
  if (flashcard) {
    handleSave(flashcard);
  }
});

const cancelButton = document.createElement("button");
cancelButton.textContent = "cancel";
cancelButton.addEventListener("click", () => handleCancel());

// Function to edit a flashcard
function editFlashcard(flashcardId) {
  const flashcard = flashcards.find(
    (flashcard) => flashcard.id === flashcardId
  );
  titleInput.value = flashcard.title;
  contentInput.value = flashcard.content;
  flashcardForm.removeChild(submitButton);
  flashcardForm.appendChild(saveButton);
  flashcardForm.appendChild(cancelButton);
  flashcardEditID = flashcardId;
}

// Function to reveal a flashcard
function revealFlashcard(flashcardId) {
  const flashcard = flashcards.find(
    (flashcard) => flashcard.id === flashcardId
  );
  flashcard.isRevealed = !flashcard.isRevealed;
  createFlashcard();
}

// Function to clear the form
function clearForm() {
  titleInput.value = "";
  contentInput.value = "";
}

// Function to create a flashcard
function createFlashcard() {
  flashcardGrid.innerHTML = "";
  flashcards.forEach((flashcard) => {
    // Create elements for displaying flashcards
    const flashcardItem = document.createElement("div");
    flashcardItem.classList.add("flashcard-item");
    flashcardItem.addEventListener("click", () => {
      revealFlashcard(flashcard.id);
    });

    const flashcardContent = document.createElement("div");
    flashcardContent.classList.add("flashcard-text-container");

    const flashcardText = document.createElement("div");
    flashcardText.classList.add("flashcard-text");

    if (!flashcard.isRevealed) {
      const flashcardTitle = document.createElement("h2");
      flashcardText.appendChild(flashcardTitle);
      flashcardTitle.textContent = flashcard.title;
    } else {
      flashcardText.textContent = flashcard.content;
    }

    const flashcardHeader = document.createElement("div");
    flashcardHeader.classList.add("flashcard-header");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", () => deleteFlashcard(flashcard.id));

    const editButton = document.createElement("button");
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      editFlashcard(flashcard.id);
    });
    editButton.textContent = "...";

    flashcardHeader.appendChild(editButton);
    flashcardHeader.appendChild(deleteButton);
    flashcardItem.appendChild(flashcardHeader);

    flashcardGrid.appendChild(flashcardItem);
    flashcardContent.appendChild(flashcardText);
    flashcardItem.appendChild(flashcardContent);
  });
}

function createFolder() {
  folderList.innerHTML = "";
  folders.forEach((folder) => {
    const folderItem = document.createElement("button");
    folderItem.classList.add("folder-item");
    const buttonText = document.createElement("p");
    buttonText.innerHTML = folder.title;
    folderItem.addEventListener("click", () => handleOpenFolder(folder.id));

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flashcard-header");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-between";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      handleDeleteFolder(folder.id);
    });

    buttonContainer.appendChild(buttonText);
    buttonContainer.appendChild(deleteButton);
    folderItem.appendChild(buttonContainer);
    folderList.appendChild(folderItem);
  });
}
