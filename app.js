// Target Elements
const notetext = document.getElementById("add-text");
const addbtn = document.getElementById("add-btn");
const notes = document.getElementById("notes");
const filternotes = document.querySelector(".notestype");

//if localstorage already have any notes then show it.

// Event Listeners
addbtn.addEventListener("click", addnote);
notes.addEventListener("click", doneremove);
filternotes.addEventListener("click", filteroption);

// load on webpage load
function check() {
  const notearray = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
  if (notearray.length == 0) {
    notes.innerHTML = `<p>Nothing To Show ! Please Enter Your Notes Using "Add A Notes" Session </p>`;
    notes.classList.add("color");
  }
  onload();
}

// function for check localstorage on load.
function onload() {
  // check localstorage
  const notearray = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
  // show notes if localstorage have any.
  if (notearray !== null) {
    notearray.forEach((items) => {
      // notes frist parent element
      let not = document.createElement("div");
      not.classList.add("noteCard", "my-2", "mx-2", "card");

      // notes parent second element
      let notcard = document.createElement("div");
      notcard.classList.add("card-body", "note");
      not.appendChild(notcard);

      // notes title
      let nottitle = document.createElement("h5");
      nottitle.classList.add("card-title");
      nottitle.innerText = `Note ${notearray.indexOf(items)}`;
      notcard.appendChild(nottitle);

      // notes text
      let nottxt = document.createElement("p");
      nottxt.classList.add("card-text");
      nottxt.innerText = items;
      notcard.appendChild(nottxt);

      // done button
      let donebtn = document.createElement("button");
      donebtn.classList.add("done", "btn", "btn-primary", "mr-2");
      donebtn.innerText = "done";
      notcard.appendChild(donebtn);

      // remove button
      let removebtn = document.createElement("button");
      removebtn.classList.add("remove", "btn", "btn-danger");
      removebtn.innerText = "remove";
      notcard.appendChild(removebtn);

      // add second parent second element into first parent element
      notes.appendChild(not);
    });
  }
}

// function for show notes on add note button click.
function addnote(event) {
  event.preventDefault();

  let not = document.createElement("div");
  not.classList.add("noteCard", "my-2", "mx-2", "card");

  let notcard = document.createElement("div");
  notcard.classList.add("card-body", "note");
  not.appendChild(notcard);

  let nottitle = document.createElement("h5");
  nottitle.classList.add("card-title");
  nottitle.innerText = `Note`;
  notcard.appendChild(nottitle);

  let nottxt = document.createElement("p");
  nottxt.classList.add("card-text");
  nottxt.innerText = notetext.value;
  notcard.appendChild(nottxt);

  storge(notetext.value);

  let donebtn = document.createElement("button");
  donebtn.classList.add("done", "btn", "btn-primary", "mr-2");
  donebtn.innerText = "done";
  notcard.appendChild(donebtn);

  let removebtn = document.createElement("button");
  removebtn.classList.add("remove", "btn", "btn-danger");
  removebtn.innerText = "remove";
  notcard.appendChild(removebtn);

  notes.appendChild(not);

  notetext.value = "";
  // reload for update the notes session
  window.location.reload(1);
}

// function for mark note as done or remove note.
function doneremove(e) {
  const item = e.target;

  if (item.classList[0] === "remove") {
    const note = item.parentElement.parentElement;
    remove(note);
    note.remove();
    // reload for update the notes session
    window.location.reload(1);
  }
  if (item.classList[0] === "done") {
    const note = item;
    note.innerText = "completed";
    note.classList.remove("btn-primary");
    note.parentElement.parentElement.classList.add("bg-success", "completed");
  }
}

// function for store notes in localstorage.
function storge(items) {
  const notearray = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
  notearray.push(items);
  localStorage.setItem("items", JSON.stringify(notearray));
}

// function for remove notes from localstorage.
function remove(items) {
  const notearray = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
  const todoindex = items.childNodes[0].innerText;
  notearray.splice(notearray.indexOf(todoindex), 1);
  localStorage.setItem("items", JSON.stringify(notearray));
}

let search = document.getElementById("searchTxt");
let searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", function (e) {
  e.preventDefault();
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

function filteroption(e) {
  const type = notes.childNodes;
  type.forEach(function (notcard) {
    switch (e.target.value) {
      case "all":
        notcard.style.display = "flex";
        break;
      case "completed":
        if (notcard.classList.contains("completed")) {
          notcard.style.display = "flex";
        } else {
          notcard.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!notcard.classList.contains("completed")) {
          notcard.style.display = "flex";
        } else {
          notcard.style.display = "none";
        }
        break;
    }
  });
}
