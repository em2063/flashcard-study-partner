let flashcards = []; //Creates empty array for storing notes

const flashcardForm = document.getElementById("flashcard-form"); //gets form
const titleInput = document.getElementById("titleInput"); //gets title element of form
const contentInput = document.getElementById("contentInput"); //gets content element of form
const flashcardGrid = document.getElementById("flashcard-grid"); //gets container that holds notes

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

function revealFlashcard(flashcardId) {
  const flashcard = flashcards.find(
    (flashcard) => flashcard.id === flashcardId
  );
  flashcard.isRevealed = !flashcard.isRevealed;
  createFlashcard();
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

    const flashcardHeader = document.createElement("div"); //creates container for header elements
    flashcardHeader.classList.add("flashcard-header");

    const deleteButton = document.createElement("button"); //creates buttomn to remove note
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", () => deleteFlashcard(flashcard.id));

    flashcardHeader.appendChild(deleteButton); //adds delete button onto header
    flashcardItem.appendChild(flashcardHeader);

    flashcardGrid.appendChild(flashcardItem); //adds note into grid
    flashcardContent.appendChild(flashcardText);
    flashcardItem.appendChild(flashcardContent);
  });
}
