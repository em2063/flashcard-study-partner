//array to store folders
folders = [];

//get folder list
folderList = document.getElementById("folder-list");

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

fetchFolders();

function createFolder() {
  folderList.innerHTML = "";
  folders.forEach((folder) => {
    const folderItem = document.createElement("button");
    folderItem.classList.add("folder-item");
    const buttonText = document.createElement("p");
    buttonText.innerHTML = folder.title;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flashcard-header");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-between";

    buttonContainer.appendChild(buttonText);
    folderItem.appendChild(buttonContainer);
    folderList.appendChild(folderItem);
  });
}
