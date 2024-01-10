//array to store folders
folders = [];
//array to store flashcards
flashcards = [];

//folder elements
folderList = document.getElementById("folder-list");

//flashcard elements
flashcardGrid = document.getElementById("quiz-grid");

let currentQuizFolderId = null;

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

function revealFlashcard(flashcardId) {
  const flashcard = flashcards.find(
    (flashcard) => flashcard.id === flashcardId
  );
  flashcard.isRevealed = !flashcard.isRevealed;
  nextFlashcard(flashcard.folderId);
}

let index = 0;
let correctCount = 0;
let incorrectCount = 0;

function correctAnswer(folderId) {
  correctCount += 1;
  index += 1;
  nextFlashcard(folderId);
}

function incorrectAnswer(folderId) {
  index += 1;
  nextFlashcard(folderId);
}

function createFlashcard(currentFlashcard) {
  const flashcardItem = document.createElement("div");
  flashcardItem.classList.add("flashcard-quiz-item");
  const flashcardContent = document.createElement("div");
  flashcardContent.classList.add("flashcard-text-container");

  const flashcardText = document.createElement("div");
  flashcardText.classList.add("flashcard-text");

  flashcardItem.addEventListener("click", () => {
    revealFlashcard(currentFlashcard.id);
  });

  if (!currentFlashcard.isRevealed) {
    const flashcardTitle = document.createElement("h2");
    flashcardText.appendChild(flashcardTitle);
    flashcardTitle.textContent = currentFlashcard.title;
  } else {
    flashcardText.textContent = currentFlashcard.content;
  }

  flashcardContent.appendChild(flashcardText);
  flashcardItem.appendChild(flashcardContent);

  const flashcardItemContainer = document.createElement("div");
  flashcardItemContainer.classList.add("flashcard-item-container");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("flashcard-button-container");

  const correctButton = document.createElement("button");
  correctButton.addEventListener("click", () => {
    correctAnswer(currentFlashcard.folderId);
  });

  correctButton.classList.add("correct-button");
  correctButton.textContent = ":)";
  buttonContainer.appendChild(correctButton);

  const incorrectButton = document.createElement("button");

  incorrectButton.textContent = ":(";
  incorrectButton.classList.add("incorrect-button");
  incorrectButton.addEventListener("click", () => {
    incorrectAnswer(currentFlashcard.folderId);
  });
  buttonContainer.appendChild(incorrectButton);

  flashcardItemContainer.appendChild(flashcardItem);
  flashcardItemContainer.appendChild(buttonContainer);
  flashcardGrid.appendChild(flashcardItemContainer);
}
let quizStarted = false;
function startQuiz(folderId) {
  quizStarted = true;
  if (currentQuizFolderId !== null) {
    return;
  }
  currentQuizFolderId = folderId;
  flashcardGrid.innerHTML = "";

  if (flashcards.length > 0) {
    const currentFolder = flashcards.filter(
      (flashcard) => flashcard.folderId === folderId
    );
    createFlashcard(currentFolder[index]);
  }
  createFolder();
}

function nextFlashcard(folderId) {
  flashcardGrid.innerHTML = "";
  if (flashcards.length > 0) {
    const currentFolder = flashcards.filter(
      (flashcard) => flashcard.folderId === folderId
    );
    if (index === currentFolder.length) {
      quizStarted = false;
      currentQuizFolderId = null;
      index = 0;
      createFolder();
      return;
    }
    createFlashcard(currentFolder[index]);
  }
}

function createFolder() {
  folderList.innerHTML = "";
  folders.forEach((folder) => {
    const folderItem = document.createElement("button");
    folderItem.classList.add("folder-item");
    folderItem.classList.remove("disabled-folder");
    folderItem.disabled = false;

    if (quizStarted) {
      const isDisabled = folder.id !== currentQuizFolderId;

      if (isDisabled) {
        folderItem.classList.add("disabled-folder");
        folderItem.disabled = true;
      }
    }

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
