var cardsCreatedCounter = 0;
var cardsItemCreatedCounter = 0;
// var dropId ="";

var createListButton = document.getElementById("add_list");
createListButton.addEventListener("click", functionCreateList);

var deleteDropZone = document.getElementById("delete_box");
deleteDropZone.setAttribute("ondrop", "drop_handler(event)");
deleteDropZone.setAttribute("ondragover", "dragover_handler(event)");

//Removing cards
function functionEditCard(){
   var removeCard = this.parentNode.parentNode.parentNode;
   removeCard.remove();
}

//Begin adding new Cards
function functionCreateList(){
   var main = document.getElementById("main");
   //Card container
   var cards = document.createElement("div");
   cards.className = "cards";
   cards.id = "card_"+cardsCreatedCounter;
   main.appendChild(cards);
   //Card header
   var cardTopBar = document.createElement("div");
   cardTopBar.className = "card_top_bar";
   cards.appendChild(cardTopBar);
   //Card Title
   var cardToDoTitle = document.createElement("input");
   cardToDoTitle.className = "card_to_do_title text_input";
   cardToDoTitle.placeholder = "Title";
   cardTopBar.appendChild(cardToDoTitle);
   //Card Button container
   var cardButtons = document.createElement("div");
   cardButtons.className = "card_buttons";
   cardTopBar.appendChild(cardButtons);
   //Card Add Button
   var cardAdd = document.createElement("button");
   cardAdd.className = "card_add_to_do";
   cardAdd.id = "card_Add_button_"+cardsCreatedCounter;
   cardAdd.setAttribute("type", "button");
   cardAdd.innerHTML = "+";
   cardButtons.appendChild(cardAdd);
   cardAdd.addEventListener("click", functionAddItemToCard);
   //Card Edit Button
   var cardEdit = document.createElement("button");
   cardEdit.className = "card_edit_to_do";
   cardEdit.id = "card_edit_button_"+cardsCreatedCounter;
   cardEdit.setAttribute("type", "button");
   cardEdit.innerHTML = "-";//Placeholder until added functionality
   cardButtons.appendChild(cardEdit);
   cardEdit.addEventListener("click", functionEditCard);
   //Card Task List container
   var cardListContainer = document.createElement("div");
   cardListContainer.className = "card_list_container";
   cards.appendChild(cardListContainer);
   //Card Task List
   var cardToDoList = document.createElement("ol");
   cardToDoList.className = "card_to_do_list";
   //drag&drop to reorder
   //cardToDoList.setAttribute("ondrop", "drop_handler(event)");
   //cardToDoList.setAttribute("ondragover", "dragover_handler(event)"); 
   cardListContainer.appendChild(cardToDoList);
   cardToDoList.id = "card_to_do_list_"+cardsCreatedCounter;

   cardsCreatedCounter++; 
}
//End adding new cards
//Create new Task Item
function functionAddItemToCard(){
   var cardToDoItem = document.createElement("li");
   var buttonNumber = this.id.slice(-1);
   var addToList = document.getElementById("card_to_do_list_"+buttonNumber);
   cardToDoItem.className = "card_to_do_item";
   cardToDoItem.id = "card_to_do_task_"+cardsItemCreatedCounter;
   cardToDoItem.draggable = true;
   cardToDoItem.addEventListener("dragstart", dragstart_handler);
   addToList.appendChild(cardToDoItem);
   cardsItemCreatedCounter++;

   var taskItem = document.createElement("input");
   taskItem.className = "task_item text_input";
   taskItem.placeholder = "Task";
   taskItem.readOnly = true;
   taskItem.setAttribute("ondblclick", "this.readOnly='';");
   taskItem.setAttribute("onblur", "this.readOnly='true';");
   cardToDoItem.appendChild(taskItem);
}

function dragstart_handler(ev) {
   // Add the target element's id to the data transfer object
   ev.dataTransfer.setData("text/plain", ev.target.id);
   ev.dataTransfer.dropEffect = "move";
 }

 function dragover_handler(ev) {
   ev.preventDefault();
   ev.dataTransfer.dropEffect = "move";
   }

function drop_handler(ev) {
   ev.preventDefault();
   // Get the id of the target and add the moved element to the target's DOM
   const data = ev.dataTransfer.getData("text/plain");
   let node = document.getElementById(data);
   if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
   }