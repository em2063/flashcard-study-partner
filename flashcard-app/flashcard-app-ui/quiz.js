//array to store folders
folders = [];
//array to store flashcards
flashcards = [];

//folder elements
folderList = document.getElementById("folder-list");

//flashcard elements
flashcardGrid = document.getElementById("quiz-grid");

//gets folders from server
const fetchFolders = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/folders");
    const folder = await response.json();
    folders = folder;
    createFolder();
  } catch (e) {
    console.log(e);
  }
};

const fetchFlashcards = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/flashcards");
    const flashcard = await response.json();
    flashcards = flashcard;
  } catch (e) {
    console.log(e);
  }
};

fetchFolders();
fetchFlashcards();

function startQuiz(folderId) {
  flashcardGrid.innerHTML = "";

  if (flashcards.length > 0) {
    const flashcardItem = document.createElement("div");
    flashcardItem.classList.add("flashcard-quiz-item");

    const flashcardContent = document.createElement("div");
    flashcardContent.classList.add("flashcard-text-container");

    const flashcardText = document.createElement("div");
    flashcardText.classList.add("flashcard-text");

    const currentFolder = flashcards.filter(
      (flashcard) => flashcard.folderId !== folderId
    );
    const firstFlashcard = currentFolder[0];

    if (!firstFlashcard.isRevealed) {
      const flashcardTitle = document.createElement("h2");
      flashcardText.appendChild(flashcardTitle);
      flashcardTitle.textContent = firstFlashcard.title;
    } else {
      flashcardText.textContent = firstFlashcard.content;
    }

    flashcardGrid.appendChild(flashcardItem);
    flashcardContent.appendChild(flashcardText);
    flashcardItem.appendChild(flashcardContent);
  }
}

function createFolder() {
  folderList.innerHTML = "";
  folders.forEach((folder) => {
    const folderItem = document.createElement("button");
    folderItem.classList.add("folder-item");
    const buttonText = document.createElement("p");
    buttonText.innerHTML = folder.title;
    folderItem.addEventListener("click", () => {
      startQuiz(folder.id);
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flashcard-header");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-between";

    buttonContainer.appendChild(buttonText);
    folderItem.appendChild(buttonContainer);
    folderList.appendChild(folderItem);
  });
}
