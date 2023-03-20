
// creating a class to hold a new piece of gear for some use.
class Gear {
  constructor(name, placement, use) {
    this.name = name;
    this.placement = placement;
    this.use = use;
  }
  // this describes the piece of gear created in an instance
  describe() {
    return `${this.name} is ${this.placement} for ${this.use}.`;
  }
}

// create a second class that relates to the first class in this case a new packing list.
class PackingList {
  constructor(name) {
    this.name = name;
    this.gearList = [];
  }
  // this is adding and instance of gear to the new packing list from the Gear class
  addGear(gear) {
    if (gear instanceof Gear) {
      this.gearList.push(gear);
    } else {
      throw new Error(`You can only add and instance of Gear. Argument is not gear: ${gear}`);
    }
  }
  removeGear(index) {
    if (index < 0 || index >= this.gearList.length) {
      throw new Error(`Index ${index} is out of range for gearList.`);
    }
    this.gearList.splice(index, 1);
  }

  // this describes how many items of gear are in the list.
  describe() {
    return `${this.name} has ${this.gearList.length} items of gear.`;
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
const gearUse = document.getElementById("gearUse");
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
  packingLists.push(new PackingList(name)); // create new object 'PackingList' in the array
}

// add event listener to view packing list button
viewListBtn.addEventListener("click", function(event) {
  let selectedList = listSelect.value;
  alert(`Viewing packing list "${selectedList}".`);
});

// add event listener to view all lists button
viewAllListsBtn.addEventListener("click", function(event) {
  listDisplay.innerHTML = ""; // clear listDisplay
  packingLists.forEach(function(list) {
    let li = document.createElement("li");
    li.textContent = `${list.name}: ${list.describe()} Gear List: ${list.gearList.map(gear => gear.name).join(", ")}`;
    listDisplay.appendChild(li);
  });
});

// add event listener to add gear button
addGearBtn.addEventListener("click", function(event) {
  event.preventDefault(); // prevent form submission
  let gear = new Gear(gearName.value, gearPlacement.value, gearUse.value);
  let selectedListIndex = listSelect.selectedIndex;
  packingLists[selectedListIndex].addGear(gear);
  gearName.value = ""; // clear input field
  gearPlacement.value = ""; // clear input field
  gearUse.value = ""; // clear input field
});

// remove event listener to add gear button
removeGearBtn.addEventListener("click", function(event) {
  event.preventDefault(); // prevent form submission
  let selectedListIndex = listSelect.selectedIndex;
  packingLists[selectedListIndex].removeGear(gearIndex);
  gearIndex.value = ""; // clear input field
});