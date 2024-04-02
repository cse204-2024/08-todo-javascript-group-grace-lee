
let api_key = "8db5f7-f1f0ea-d9384d-293482-6d16bd";

// retrieve and display current to do items

let xhttp_retrieve = new XMLHttpRequest();
xhttp_retrieve.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      let todos = JSON.parse(this.responseText);
      console.log(todos);
      for (let i = 0; i < todos.length; i++) {
        display_todo(todos[i]);
      }
  } else if (this.readyState == 4) {
    console.log(this.responseText);
  }
};

xhttp_retrieve.open("GET", "https://cse204.work/todos", true);
xhttp_retrieve.setRequestHeader("x-api-key", api_key);
xhttp_retrieve.send();

function add_todo(event) {
  event.preventDefault();
  let data = {
    text: document.getElementById("new_todo").value
  }
  let xhttp_add = new XMLHttpRequest();
  xhttp_add.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let todo = JSON.parse(this.responseText);
        console.log(todo);
        display_todo(todo);
    } else if (this.readyState == 4) {
        console.log(this.responseText);
    }
  };
  xhttp_add.open("POST", "https://cse204.work/todos", true);
  document.getElementById("new_todo").value = "";

  xhttp_add.setRequestHeader("Content-type", "application/json");
  xhttp_add.setRequestHeader("x-api-key", api_key);
  xhttp_add.send(JSON.stringify(data));
}

document.getElementById("create_todo").addEventListener("submit", add_todo);

function display_todo(task) {
  let list_item = document.createElement("section");
  list_item.classList.add("task");
  list_item.setAttribute("id", task.id);
  if (task.completed) {
    list_item.classList.add("completed");
  }

  let complete_button = document.createElement("button");
  complete_button.classList.add("complete");
  complete_button.addEventListener("click", complete_task);
  list_item.appendChild(complete_button);

  let todo_text = document.createElement("p");
  todo_text.innerHTML = task.text;
  todo_text.classList.add("todo_text");
  list_item.appendChild(todo_text);

  let delete_button = document.createElement("button");
  delete_button.classList.add("delete");
  delete_button.addEventListener("click", delete_task);
  list_item.appendChild(delete_button);
  delete_button.innerText = "X";

  document.getElementById("todo_list").appendChild(list_item);
}

function delete_task(event) {
  event.preventDefault();
  let task_id = event.target.parentNode.id;
  let xhttp_delete = new XMLHttpRequest();
  xhttp_delete.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      event.target.parentNode.remove();
    } else if (this.readyState == 4) {
      console.log("here");
      console.log(this.responseText);
    }
  };
  let url = `https://cse204.work/todos/${task_id}`;
  xhttp_delete.open("DELETE", url, true);
  xhttp_delete.setRequestHeader("Content-type", "application/json");
  xhttp_delete.setRequestHeader("x-api-key", api_key);
  xhttp_delete.send();
}

function complete_task(event) {
  event.preventDefault();
  let task_id = event.target.parentNode.id;
  let xhttp_complete = new XMLHttpRequest();
  let data = {
    completed: true
  }
  xhttp_complete.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(event.target.parentNode);
      event.target.parentNode.classList.add("completed");
    } else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  };
  xhttp_complete.open("PUT", "https://cse204.work/todos/"+task_id, true);
  xhttp_complete.setRequestHeader("Content-type", "application/json");
  xhttp_complete.setRequestHeader("x-api-key", api_key);
  xhttp_complete.send(JSON.stringify(data));
}