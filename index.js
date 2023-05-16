// Get the required elements from the DOM
var todoList = document.getElementById("todo-list");
var inputText = document.getElementById("inputText");
var addButton = document.getElementById("addBtn");
var clearButton = document.getElementById("clearBtn");
var list = document.getElementById("list");
var tasks = [];
var filterOption = "All";

// Add an item to the task list
function addItem() {
    var newItemText = inputText.value.trim();
    if (newItemText && tasks.length < 30) {
        tasks.push({text: newItemText, completed: false});
        inputText.value = "";
        render();
        renderFilterHeadline(filterOption); // Update the filter headline
    } else if (tasks.length === 30) {
        console.log("Too much to do... (free tier is up to 30 tasks)");
        inputText.value = "";
    }
}

// Toggle the completed status of a task
function toggleCompleted(index) {
    var filteredTasks = getFilteredTasks();
    if (filteredTasks.length > 0 && index >= 0 && index < filteredTasks.length) {
        var task = filteredTasks[index];
        var taskIndex = tasks.indexOf(task);
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        render();
        renderFilterHeadline(filterOption);
    }
}

// Delete a task from the list
function deleteItem(index) {
    tasks.splice(index, 1);
    render();
    renderFilterHeadline(filterOption); // Update the filter headline
}

// Move a task up in the list
function moveItemUp(index) {
    if (index > 0) {
        var temp = tasks[index];
        tasks[index] = tasks[index - 1];
        tasks[index - 1] = temp;
        render();
        renderFilterHeadline(filterOption); // Update the filter headline
    }
}

// Move a task down in the list
function moveItemDown(index) {
    if (index < tasks.length - 1) {
        var temp = tasks[index];
        tasks[index] = tasks[index + 1];
        tasks[index + 1] = temp;
        render();
        renderFilterHeadline(filterOption); // Update the filter headline
    }
}

// Apply the selected filter option
function applyFilter(option) {
    filterOption = option;
    render();
    renderFilterHeadline(filterOption); // Update the filter headline
}

// Render the filter headline based on the selected option
function renderFilterHeadline(option) {
    var filterHeadline = document.getElementById("filter-headline");
    var filteredTasks = tasks;
    if (option === "Active") {
        filteredTasks = tasks.filter(function (task) {
            return !task.completed;
        });
    } else if (option === "Completed") {
        filteredTasks = tasks.filter(function (task) {
            return task.completed;
        });
    }
    filterHeadline.textContent = option + " Tasks " + " (" + filteredTasks.length + ")";
}

// Get the filtered tasks based on the selected filter option
function getFilteredTasks() {
    if (filterOption === "Active") {
        return tasks.filter(function (task) {
            return !task.completed;
        });
    } else if (filterOption === "Completed") {
        return tasks.filter(function (task) {
            return task.completed;
        });
    } else {
        return tasks;
    }
}

// Render the task list
function render() {
    list.innerHTML = "";

    var filteredTasks = tasks;

    if (filterOption === "Active") {
        filteredTasks = tasks.filter(function (task) {
            return !task.completed;
        });
    } else if (filterOption === "Completed") {
        filteredTasks = tasks.filter(function (task) {
            return task.completed;
        });
    }
    for (var i = 0; i < filteredTasks.length; i++) {
        var newItem = document.createElement("li");
        var task = filteredTasks[i];
        newItem.innerHTML =
            '<p class="' + (task.completed ? "completed" : "") + '">' + (tasks.indexOf(task) + 1) + ". " + task.text + "</p>";

        var btnDiv = document.createElement("div");
        btnDiv.classList.add("button-div");

        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<span class="red-delete">&times;</span>';
        deleteBtn.addEventListener("click", function () {
            var index = Array.prototype.indexOf.call(list.children, this.parentNode.parentNode);
            deleteItem(index);
        });
        deleteBtn.setAttribute("class", "delete-button");

        var upBtn = document.createElement("button");
        upBtn.innerHTML = "&#9650;";
        upBtn.addEventListener("click", function () {
            var index = Array.prototype.indexOf.call(list.children, this.parentNode.parentNode);
            moveItemUp(index);
        });

        var downBtn = document.createElement("button");
        downBtn.innerHTML = "&#9660;";
        downBtn.addEventListener("click", function () {
            var index = Array.prototype.indexOf.call(list.children, this.parentNode.parentNode);
            moveItemDown(index);
        });
        var toggleBtn = document.createElement("button");
        toggleBtn.innerHTML = task.completed
            ? '<span class="green-check">&#10003;</span>'
            : '<span class="grey-check">&#10003;</span>';
        toggleBtn.addEventListener("click", function () {
            var index = Array.prototype.indexOf.call(list.children, this.parentNode.parentNode);
            if (filterOption === "Active" || filterOption === "Completed") {
                index = Array.prototype.indexOf.call(list.children, this.parentNode.parentNode);
            }
            toggleCompleted(index);
        });

        btnDiv.appendChild(upBtn);
        btnDiv.appendChild(downBtn);
        btnDiv.appendChild(toggleBtn);
        btnDiv.appendChild(deleteBtn);
        newItem.appendChild(btnDiv);
        list.appendChild(newItem);
    }
}

// Add event listeners to the necessary elements
addButton.addEventListener("click", addItem);

function clearList() {
    tasks = [];
    render();
    renderFilterHeadline(filterOption); // Update the filter headline
}

clearButton.addEventListener("click", clearList);
inputText.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addButton.click();
    }
});

// Add event listeners to the filter options
document.querySelectorAll(".filter-option").forEach(function (option) {
    option.addEventListener("click", function () {
        var filterValue = this.textContent.trim();
        applyFilter(filterValue);
    });
});

// Render the initial task list
render();