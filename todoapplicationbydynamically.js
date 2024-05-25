let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");


function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
let todoList = getTodoListFromLocalStorage();
// let todoList = [{
//         text: "Learn HTML",
//         uniqueNo: 1
//     },
//     {
//         text: "Learn CSS",
//         uniqueNo: 2
//     },
//     {
//         text: "Learn Javascript",
//         uniqueNo: 3
//     },
//     {
//         text: "Learn React",
//         uniqueNo: 4
//     }
// ];

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

addTodoButton.onclick = function() {
    onAddTodo();
}

function onTodoStatusChange(checkBoxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkBoxId);
    //console.log(checkboxElement.checked);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
    // if (checkboxElement.checked === true) {
    //     labelElement.classList.add("checked");
    // } else {
    //     labelElement.classList.remove("checked");
    // }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    //console.log(todoList)
    //console.log(todoId)
    let deleteIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }

    });
    todoList.splice(deleteIndex, 1);
    //console.log(todoList);
}

function createAndAppendTodo(todo) {
    let checkBoxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);
    //console.log(todoItemsContainer.outerHTML);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkBoxId;
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function() {
        onTodoStatusChange(checkBoxId, labelId);
    }
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement)
    //console.log(inputElement.outerHTML);

    let divElement = document.createElement("div");
    divElement.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(divElement);
    //console.log(divElement.outerHTML);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkBoxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    //labelElement.textContent = "Learn HTML";
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    divElement.appendChild(labelElement);
    //console.log(labelElement.outerHTML);

    let divElement1 = document.createElement("div");
    divElement1.classList.add("delete-icon-container");
    divElement.appendChild(divElement1);
    // console.log(divElement1.outerHTML);

    let iconElement1 = document.createElement("i");
    iconElement1.classList.add("far", "fa-trash-alt", "delete-icon");
    iconElement1.onclick = function() {
        onDeleteTodo(todoId);
    }
    divElement1.appendChild(iconElement1);
    //console.log(iconElement1.outerHTML);
}

function onAddTodo() {
    let todosCount = todoList.length;
    todosCount = todosCount + 1;
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

for (let eachTodo of todoList) {
    createAndAppendTodo(eachTodo);
}