let items = [];
let filterWord;

const addInput = document.querySelector("#add-input");
const addButton = document.querySelector("#add-button");
const message = document.querySelector("#message");
const taskList = document.querySelector("#task-list");
const filterInput = document.querySelector("#filter-input");

function getAddInput() {
  let input = addInput.value;
  if (!input) return null;
  return input;
}

function addItem() {
  let input = getAddInput();
  if (!input) return;

  if (items.includes(input)) {
    message.innerText = "Task already added.";
  } else {
    items.push(input);
    refreshDisplayList();
    message.innerText = "Task added.";
  }
}

function constructLi() {
  let li = document.createElement("li");
  li.classList.add("list-group-item");
  return li;
}

function constructDiv() {
  let div = document.createElement("div");
  div.classList.add("d-flex");
  div.classList.add("justify-content-between");
  div.classList.add("align-self-center");
  return div;
}

function constructP(text) {
  let p = document.createElement("p");
  p.innerText = text;
  return p;
}

function constructButton(text) {
  // let button = document.createElement("button");
  // button.onclick = console.log(text);
  // button.classList.add("btn");
  // button.classList.add("btn-secondary");
  // button.innerText = "Complete";
  // button.type = "button";
  // return button;

  let span = document.createElement("span");
  span.innerHTML = `<button type="button" onClick="removeItem('${text}')" class="btn btn-secondary">Complete</button>`;
  return span;
}

function destoryDisplayList() {
  document.querySelectorAll(".list-group-item").forEach((e) => e.remove());
}

function removeItem(item) {
  if (!items.includes(item)) return;
  items.splice(items.indexOf(item), 1);
  refreshDisplayList();
}

function setFilterWord() {
  let input = filterInput.value;
  filterWord = input;
  refreshDisplayList();
}

function refreshDisplayList() {
  destoryDisplayList();
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    li = constructLi();
    div = constructDiv();
    p = constructP(item);
    button = constructButton(item);

    div.appendChild(p);
    div.appendChild(button);
    li.appendChild(div);

    if (filterWord) {
      if (
        levenshteinDistance(filterWord, item, filterWord.length, item.length) <=
        3
      ) {
        taskList.appendChild(li);
      }
    } else {
      taskList.appendChild(li);
    }
  }
}

function levenshteinDistance(str1, str2, m, n) {
  if (m === 0) {
    return n;
  }

  if (n === 0) {
    return m;
  }

  if (str1[m - 1] === str2[n - 1]) {
    return levenshteinDistance(str1, str2, m - 1, n - 1);
  }

  return (
    1 +
    Math.min(
      levenshteinDistance(str1, str2, m, n - 1),
      levenshteinDistance(str1, str2, m - 1, n),
      levenshteinDistance(str1, str2, m - 1, n - 1)
    )
  );
}
