// Initialise an empty array for storing flashcards
const flashcards = [];
//Initialise empty array for storing folders
const folders = [];

// Get form and form elements
const flashcardForm = document.getElementById("flashcard-form");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const flashcardGrid = document.getElementById("flashcard-grid");
const submitButton = document.getElementById("submit-button");
const folderContainer = document.getElementById("folder-container");
const folderFormContainer = document.getElementById("folder-form-container");
const newFolderButton = document.getElementById("folder-button");

// Event listener for new folder
newFolderButton.addEventListener("click", () => handleNewFolder());

//Function that creates new folder
function handleNewFolder() {
  folderContainer.removeChild(newFolderButton);
  folderFormContainer.style.display = "flex";
}

// Event listener for form submission
flashcardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleAddFlashcard();
});

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
