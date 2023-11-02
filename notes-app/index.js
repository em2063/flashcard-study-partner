let flashcards = []; //Creates empty array for storing notes

const flashcardForm = document.getElementById("flashcard-form"); //gets form
const titleInput = document.getElementById("titleInput"); //gets title element of form
const contentInput = document.getElementById("contentInput"); //gets content element of form
const flashcardGrid = document.getElementById("flashcard-grid"); //gets container that holds notes
const submitButton = document.getElementById("submit-button");

flashcardForm.addEventListener("submit", (event) => {
  event.preventDefault(); //prevents refresh of page
  handleAddFlashcard(); //once button is pressed calls method to create new note
});

function handleAddFlashcard() {
  //creates new note object with parameters
  const newFlashcard = {
    id: flashcards.length + 1,
    title: titleInput.value, //gets title
    content: contentInput.value, //gets content
    isRevealed: false,
  };
  flashcards.unshift(newFlashcard); //adds note to beginning of array
  createFlashcard(); //calls note template
  clearForm(); //resets form
}

function deleteFlashcard(flashcardId) {
  flashcards = flashcards.filter((flashcard) => flashcard.id !== flashcardId); //filters out all notes except the deleted one
  createFlashcard();
}

function handleCancel() {
  titleInput.value = "";
  contentInput.value = "";
  flashcardForm.removeChild(saveButton);
  flashcardForm.removeChild(cancelButton);
  flashcardForm.appendChild(submitButton);
}

function handleSave(flashcard) {
  flashcard.title = titleInput.value;
  flashcard.content = contentInput.value;
  titleInput.value = "";
  contentInput.value = "";
  flashcardForm.removeChild(saveButton);
  flashcardForm.removeChild(cancelButton);
  flashcardForm.appendChild(submitButton);
}

let flashcardEditID = null;

const saveButton = document.createElement("button");
saveButton.textContent = "save";
saveButton.addEventListener("click", () => {
  const flashcard = flashcards.find(
    (flashcard) => flashcard.id === flashcardEditID
  );
  if (flashcard) {
    handleSave(flashcard);
    createFlashcard();
  }
});
const cancelButton = document.createElement("button");
cancelButton.textContent = "cancel";
cancelButton.addEventListener("click", () => handleCancel());

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

function revealFlashcard(flashcardId) {
  const flashcard = flashcards.find(
    (flashcard) => flashcard.id === flashcardId //finds the flashcard that has been clicked
  );
  flashcard.isRevealed = !flashcard.isRevealed; //updates its revealed status
  createFlashcard(); //updates flashcard accordingly
}

//clears form for use again
function clearForm() {
  titleInput.value = "";
  contentInput.value = "";
}

//template for creating new note - creates html elements and appends into the note grid
function createFlashcard() {
  flashcardGrid.innerHTML = "";
  flashcards.forEach((flashcard) => {
    const flashcardItem = document.createElement("div");
    flashcardItem.classList.add("flashcard-item"); //creates container for everything inside note
    flashcardItem.addEventListener("click", () => {
      revealFlashcard(flashcard.id);
    });

    const flashcardContent = document.createElement("div"); //creates div element to hold flashcard content
    flashcardContent.classList.add("flashcard-text-container");

    const flashcardText = document.createElement("div"); //holds text of flashcard
    flashcardText.classList.add("flashcard-text");

    if (!flashcard.isRevealed) {
      // if the flashcard is NOT revealed it will display the title of the content
      const flashcardTitle = document.createElement("h2");
      flashcardText.appendChild(flashcardTitle);
      flashcardTitle.textContent = flashcard.title;
    } else {
      flashcardText.textContent = flashcard.content; //if flashcard has been clicked, it will reveal the content
    }

    const flashcardHeader = document.createElement("div"); //creates container for header elements
    flashcardHeader.classList.add("flashcard-header");

    const deleteButton = document.createElement("button"); //creates buttomn to remove note
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", () => deleteFlashcard(flashcard.id));
    const editButton = document.createElement("button"); //creates button to edit flashcard
    editButton.addEventListener("click", () => editFlashcard(flashcard.id));
    editButton.textContent = "...";

    flashcardHeader.appendChild(editButton);
    flashcardHeader.appendChild(deleteButton); //adds delete button onto header
    flashcardItem.appendChild(flashcardHeader);

    flashcardGrid.appendChild(flashcardItem); //adds note into grid
    flashcardContent.appendChild(flashcardText);
    flashcardItem.appendChild(flashcardContent);

    if (flashcard.id === currentEditingId) {
      flashcard.title = titleInput.value;
      flashcard.content = contentInput.value;
    }
  });
}
