// Create a class to set the frame of which parameters is expected.
function toDoListClass(activity, status) {
    this.Activity = activity;
    this.Status = status;
}

function reset() {
    let item1 = new toDoListClass("Go to the gym", false);
        let item2 = new toDoListClass("Study Javascript", false);
        let item3 = new toDoListClass("Watch netflix", false);
        let item4 = new toDoListClass("Grocery shopping", false);
    
        let list = [item1, item2, item3, item4];
    
        localStorage.setItem("toDoList", JSON.stringify(list));
        printList();
}

function checkList() {

    if(localStorage.getItem("toDoList") === null) {
        let item1 = new toDoListClass("Go to the gym", false);
        let item2 = new toDoListClass("Study Javascript", false);
        let item3 = new toDoListClass("Watch netflix", false);
        let item4 = new toDoListClass("Grocery shopping", false);
    
        let list = [item1, item2, item3, item4];
    
        localStorage.setItem("toDoList", JSON.stringify(list));
        printList();

    } else {
        printList();
    }
}

// Function to loop list, either to done list, or not done list. Reset lists before looping to avoid duplication. 
function printList() {
    var listFromStorage = JSON.parse(localStorage.getItem("toDoList"));
    
    document.getElementById("toDoList").innerHTML = "";
    document.getElementById("doneList").innerHTML = "";

    for (let i = 0; i < listFromStorage.length; i++) {
        // Check if status is false, select appropriet list to loop.
        if (listFromStorage[i].Status == false) {
            document.getElementById("toDoList").innerHTML += "<li id='" + [i] + "'><div class='listInfo' onclick='doneTask(" + [i] + ")' ><input type='checkbox' id='checkbox" + [i] + "'unchecked></input><label for='checkbox" + i + "'>" + listFromStorage[i].Activity + "</label></div><div class='listRemove'><button id='" + [i] + "' onclick='removeTask(" + [i] + ")' class='remove-btn'><i class='fas fa-trash'></i></button></div></li>";
        } else {
            document.getElementById("doneList").innerHTML += "<li id='" + [i] + "'><div class='listInfo' onclick='undoTask(" + [i] + ")' ><input type='checkbox' id='checkbox" + [i] + "'checked></input><label for='checkbox" + i + "'>" + listFromStorage[i].Activity + "</label></div><div class='listRemove'><button id='" + [i] + "' onclick='removeTask(" + [i] + ")' class='remove-btn'><i class='fas fa-trash'></i></button></div></li>";
        }
    }
}

function sortASC() {
    let listFromStorage = JSON.parse(localStorage.getItem("toDoList"));

    // Add styling to active class.
    document.getElementById("sortASC").classList.add("activeSorting");
    document.getElementById("sortDESC").classList.remove("activeSorting");

    // Sort list on based on Acivity.
    listFromStorage.sort(function(a, b) {
        return a.Activity.localeCompare(b.Activity);
     });

    localStorage.setItem("toDoList", JSON.stringify(listFromStorage));
    printList();
}

function sortDESC() {
    let listFromStorage = JSON.parse(localStorage.getItem("toDoList"));

    // Add styling to active class.
    document.getElementById("sortDESC").classList.add("activeSorting");
    document.getElementById("sortASC").classList.remove("activeSorting");

    listFromStorage.sort(function(a, b) {
        return b.Activity.localeCompare(a.Activity);
     });
    localStorage.setItem("toDoList", JSON.stringify(listFromStorage));
    printList();
}  

function addTask() {
    let newTaskText = document.getElementById("newTaskText").value;
    let listFromStorage = JSON.parse(localStorage.getItem("toDoList"));

    // Validate if field is empty. 
    if (newTaskText.length > 0) {
        // Initialize new object from input value.
        let newTask = new toDoListClass();
        // Set properties to new object
        newTask.Activity = newTaskText;
        newTask.Status = false;

        // Push new object to localStorage.
        listFromStorage.push(newTask);
        localStorage.setItem("toDoList", JSON.stringify(listFromStorage));
        // Reset form after adding task
        document.getElementById("newTaskForm").reset();
        printList();
        
    } else {
        alert("You need to write something!");
        printList();
    }
}

function removeTask(i) {
    // Remove ONLY from screen, not from localStorage.
    document.getElementById([i]).remove([i]);
}

function doneTask(i) {
    // Set task status on object to TRUE and set localstorage.
    let listFromStorage = JSON.parse(localStorage.getItem("toDoList"));
    listFromStorage[i].Status = true;
    localStorage.setItem("toDoList", JSON.stringify(listFromStorage));
    printList();
}

function undoTask(i) {
    // Set task status on
    let listFromStorage = JSON.parse(localStorage.getItem("toDoList"));
    listFromStorage[i].Status = false;
    localStorage.setItem("toDoList", JSON.stringify(listFromStorage));
    printList();
}