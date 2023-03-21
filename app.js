
// creating a class to hold a new product for some use.
class Product {
  constructor(name, placement, qty) {
    this.name = name;
    this.placement = placement;
    this.qty = qty;
  }
  // this describes the piece of product created in an instance
  describe() {
    return `${this.name} is ${this.placement} for ${this.qty}.`;
  }
}

// create a second class that relates to the first class in this case a new order.
class Order {
  constructor(name) {
    this.name = name;
    this.gearList = [];
  }
  // this is adding and instance of gear to the new order list from the product class
  addGear(gear) {
    if (gear instanceof Product) {
      this.gearList.push(gear);
    } else {
      throw new Error(`You can only add and instance of a Product. Argument is not Product: ${gear}`);
    }
  }
  removeGear(index) {
    if (index < 0 || index >= this.gearList.length) {
      throw new Error(`Index ${index} is out of range for List.`);
    }
    this.gearList.splice(index, 1);
  }

  // this describes how many items of gear are in the list.
  describe() {
    return `${this.name} has ${this.gearList.length} items of Product.`;
  }
}

// get references to HTML elements
const packingListForm = document.getElementById("packingListForm");
const packingListNameInput = document.getElementById("packingListName");
const createListBtn = document.getElementById("createListBtn");
const listSelect = document.getElementById("listSelect");
const viewListBtn = document.getElementById("viewListBtn");
const viewAllListsBtn = document.getElementById("viewAllListsBtn");
const listDisplay = document.getElementById("listDisplay");
// get references to HTML gear elements
const addGearForm = document.getElementById("addGearForm");
const gearName = document.getElementById("gearName");
const gearPlacement = document.getElementById("gearPlacement");
const gearQty = document.getElementById("gearQty");
const addGearBtn = document.getElementById("addGear");
const removeGearBtn = document.getElementById("removeGear");
const gearIndex = document.getElementById("gearIndex");

const packingLists = []; // array to store all packing lists

// add event listener to create packing list form
packingListForm.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent form submission
  let listName = packingListNameInput.value;
  createPackingList(listName);
});

// function to create a new packing list
function createPackingList(name) {
  // create new option element for the select dropdown
  let option = document.createElement("option");
  option.text = name;
  option.value = name;
  listSelect.add(option); // add option to select element
  packingListNameInput.value = ""; // clear input field
  packingLists.push(new Order(name)); // create new object 'PackingList' in the array
}

// add event listener to view packing list button
viewListBtn.addEventListener("click", function(event) {
  let selectedList = listSelect.value;
  alert(`Viewing order "${selectedList}".`);
});

// add event listener to view all lists button
viewAllListsBtn.addEventListener("click", function(event) {
  listDisplay.innerHTML = ""; // clear listDisplay
  packingLists.forEach(function(list) {
    let li = document.createElement("li");
    li.textContent = `${list.name}: ${list.describe()} Product List: ${list.gearList.map(gear => gear.name).join(", ")}`;
    listDisplay.appendChild(li);
  });
});

// add event listener to add gear button
addGearBtn.addEventListener("click", function(event) {
  event.preventDefault(); // prevent form submission
  let gear = new Product(gearName.value, gearPlacement.value, gearQty.value);
  let selectedListIndex = listSelect.selectedIndex;
  packingLists[selectedListIndex].addGear(gear);
  gearName.value = ""; // clear input field
  gearPlacement.value = ""; // clear input field
  gearQty.value = ""; // clear input field
});

// remove event listener to add gear button
removeGearBtn.addEventListener("click", function(event) {
  event.preventDefault(); // prevent form submission
  let selectedListIndex = listSelect.selectedIndex;
  packingLists[selectedListIndex].removeGear(gearIndex);
  gearIndex.value = ""; // clear input field
});