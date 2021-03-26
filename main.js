// Initiating the Variables
const createButton = document.getElementById("createNoteButton");
const addNoteDiv = document.getElementById("addNoteDiv");
const noteBox = document.getElementById("noteBox");
const input = document.getElementById("input");
const textarea = document.getElementById("textarea");
const submit = document.getElementById("submit");
const search = document.getElementById("search");

// Event listener for search input matches to title and body of note

search.addEventListener("input", () => {
  let val = search.value;
  let allNotes = Array.from(document.getElementsByClassName("title-div"));
  allNotes.forEach((element) => {
    let result = element.getElementsByTagName("p")[0].innerText;
    let result2 = element.getElementsByTagName("p")[1].innerText;
    if (result.includes(val) || result2.includes(val)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// function to show notes added to local storage

const gridNote = () => {
  let notesArray = localStorage.getItem("notes");
  if (notesArray == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notesArray);
  }
  let template = "";
  notesObj.forEach((note, index) => {
    //   template which will be populated in dom after adding new note
    template += `      <div class="border-2 bg-white title-div border-blue-400 text-center p-4 rounded-md">
    <p class="text-xl m-2 font-semibold break-words title ">${note.title}</p>
    <p class="text-md text-left break-words body">${note.body}
    </p>
    <div class="m-2 mt-4 mb-0">
      <button
      id= ${index}
      onClick="deleteNote(this.id)"
        title="Delete Note"
        class="p-2 focus:outline-none bg-red-600 hover:font-semibold text-sm border-2 border-red-600 text-white hover:bg-red-800 hover:border-2 font-bold hover:border-red-800 rounded-md m-2 ml-0"
      >
        <i class="bx bxs-trash-alt text-xl"></i>
      </button>
    </div>
  </div>`;
  });
  let grid = document.getElementById("grid");
  if (notesArray.length != 0) {
    grid.innerHTML = template;
  }
};
// calling function to show notes
gridNote();

// function to delete note available in localstorage

const deleteNote = (index) => {
  let notesArray = localStorage.getItem("notes");
  if (notesArray == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notesArray);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  gridNote();
};
let textareaError;
let inputError;
createButton.addEventListener("click", () => {
  noteBox.classList.remove("hidden");
  addNoteDiv.classList.add("hidden");
});
// Validation for Input and textarea
const inputBlankChecker = (input) => {
  if (input.value == "") {
    document.getElementById("inputCheck").classList.remove("hidden");
    inputError = true;
  } else return (inputError = false);
};

const textareaBlankChecker = (text) => {
  if (text.value == "") {
    document.getElementById("textCheck").classList.remove("hidden");
    textareaError = true;
  } else textareaError = false;
};

// Recheck submitted data and add notes to local storage
submit.addEventListener("click", () => {
  let notesArray = localStorage.getItem("notes");
  inputBlankChecker(input);
  textareaBlankChecker(textarea);
  if (!textareaError && !inputError) {
    let title = input.value;
    let body = textarea.value;
    let data = { title, body };
    if (notesArray == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notesArray);
    }
    notesObj.push(data);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    gridNote();
    input.value = "";
    textarea.value = "";
  }
});
