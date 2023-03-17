// Wait for the DOM to finish loading before running the code
document.addEventListener('DOMContentLoaded', function() {
    console.log("Running js");
    // creating a class to hold something in this case a new piece of gear for some use.
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
      // this describes how many items of gear are in the list.
      describe() {
        return `${this.name} has ${this.gearList.length} items of gear.`;
      }
    }
  
    // create a menu function or program that is interactable and has one or two variables.
    // this is the menu function that holds the code that is interactable to create packing lists and add or remove gear
    //  from said list
    class Menu {
      constructor() {
        this.packingLists = [];
        this.selectedList = null;
      }
  
      // this is the start function that loops through a menu as long as the selection is not 0, 0 will exit the menu
      start() {
        const viewListBtn = document.getElementById('viewListBtn');
        const createListBtn = document.getElementById('createListBtn');
        const viewAllListsBtn = document.getElementById('viewAllListsBtn');
        const addGearForm = document.getElementById('addGearForm');
        const removeGearForm = document.getElementById('removeGearForm');
  
        viewListBtn.addEventListener('click', () => this.viewList());
        createListBtn.addEventListener('click', () => this.createList());
        console.log("running menu");
        viewAllListsBtn.addEventListener('click', () => this.viewAllLists());
  
        addGearForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const gearName = event.target.gearName.value;
          const gearPlacement = event.target.gearPlacement.value;
          const gearUse = event.target.gearUse.value;
  
          if (this.selectedList) {
            const newGear = new Gear(gearName, gearPlacement, gearUse);
            this.selectedList.addGear(newGear);
            this.viewList();
          } else {
            alert('Please select a packing list first!');
          }
        });
  
        removeGearForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const gearIndex = event.target.gearIndex.value;
  
          if (this.selectedList) {
            this.selectedList.gearList.splice(gearIndex, 1);
            this.viewList();
          } else {
            alert('Please select a packing list first!');
          }
        });
      }
    
    // create a function to create a new packing list
    createList() {
        const listName = prompt('Enter a name for your new packing list:');
        const newList = new PackingList(listName);
        this.packingLists.push(newList);
        this.selectedList = newList;
        this.viewList();
        console.log(newList);

    }

    // create a function to view the current packing list
    viewList() {
        const listDisplay = document.getElementById('listDisplay');
        const gearList = this.selectedList.gearList;
        listDisplay.innerHTML = '';
        console.log(gearList);
  
        for (let i = 0; i < gearList.length; i++) {
            const li = document.createElement('li');
            const gear = gearList[i];
            li.textContent = gear.describe();
            listDisplay.appendChild(li);
          }
        }
    }

}); // end of event listener function
