const e = require("cors");

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
  }
};

xhttp_retrieve.open("GET", "https://cse204.work/todos", true);
xhttp_retrieve.setRequestHeader("x-api-key", api_key);
xhttp_retrieve.send();


function display_todo(task) {
  let list_item = document.createElement("section");
  list_item.classList.add("todo");
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
}

function delete_task(event) {
  let task_id = event.target.parentNode.id;
  let xhttp_delete = new XMLHttpRequest();
  xhttp_delete.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      event.target.parentNode.remove();
    } else if (this.readyState == 4) {
      console.log(this.responseText);
    }
    xhttp_delete.open("DELETE", "https://cse204.work/todos/"+task_id, true);
    xhttp_delete.setRequestHeader("Content-type", "application/json");
    xhttp_delete.setRequestHeader("x-api-key", api_key);
    xhttp_delete.send();
  }
}

function complete_task(event) {
  let task_id = event.target.parentNode.id;
  let xhttp_complete = new XMLHttpRequest();
  let data = {
    completed: true
  }
  xhttp_complete.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      event.target.parentNode.classList.add("completed");
    } else if (this.readyState == 4) {
      console.log(this.responseText);
    }
    completeRequest.open("PUT", "https://cse204.work/todos/"+task_id, true);
    xhttp_delete.setRequestHeader("Content-type", "application/json");
    xhttp_delete.setRequestHeader("x-api-key", api_key);
    xhttp_delete.send(JSON.stringify(data));
  }
}