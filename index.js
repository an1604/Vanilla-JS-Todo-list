var todoList = document.getElementById("todo-list");
var inputText = document.getElementById("inputText");
var addButton = document.getElementById("addBtn");
var list = document.getElementById("list");
var tasks = [];

function addItem() {
  var newItemText = inputText.value.trim();
  if (newItemText && tasks.length < 30) {
    tasks.push(newItemText);
    inputText.value = "";
    render();
  }
  else if (tasks.length === 30){
    console.log("too much to do... (free teir is up to 30 tasks)");
     inputText.value = "";
  }
}

function render() {
    list.innerHTML = "";
  for (var i = 0; i < tasks.length; i++) {
    var newItem = document.createElement("li");
    newItem.textContent = tasks[i];

    // Add delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function() {
      var index = Array.prototype.indexOf.call(list.children, this.parentNode);
      tasks.splice(index, 1);
      render();
    });
    newItem.appendChild(deleteBtn);

    // Add up button
    var upBtn = document.createElement("button");
    upBtn.textContent = "Up";
    upBtn.addEventListener("click", function() {
      var index = Array.prototype.indexOf.call(list.children, this.parentNode);
      if (index > 0) {
        var temp = tasks[index];
        tasks[index] = tasks[index - 1];
        tasks[index - 1] = temp;
        render();
      }
    });
    newItem.appendChild(upBtn);

    // Add down button
    var downBtn = document.createElement("button");
    downBtn.textContent = "Down";
    downBtn.addEventListener("click", function() {
      var index = Array.prototype.indexOf.call(list.children, this.parentNode);
      if (index < tasks.length - 1) {
        var temp = tasks[index];
        tasks[index] = tasks[index + 1];
        tasks[index + 1] = temp;
        render();
      }
    });
    newItem.appendChild(downBtn);

    list.appendChild(newItem);
  }
}

addButton.addEventListener("click", addItem);


// var todolist= document.getElementById("todo-list")
// var todo = document.getElementById("todo")
// var inputText = document.getElementById("inputText")
// var addButton = document.getElementById("addBtn");
// var list= document.getElementById("list");
// var  tasks = []
// function addItem(){
// var newItemText= inputText.value.trim();
// if(newItemText){
//     tasks.push(newItemText);
//     render();
//     inputText.value="";
// }
// }
// function render(){
//     todolist.innerHTML="";
//     for(var i=0;i<tasks.length;i++){
//         var newItemText = tasks[i].value.trim();
//         var listItem= document.createElement("li");
//         listItem.textContent=newItemText;
//         todolist.appendChild(listItem);

//     }
// }
// function deleteItem(){
// }
// function update(){
// }

// addButton.addEventListener("click",addItem);