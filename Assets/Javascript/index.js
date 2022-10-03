//
// variables Declaration
//
let timeBlockEL = document.querySelector(".timeBlock");
let btnEL = document.querySelector(".btn");
const saveButtons = document.querySelectorAll(".saveBtn");
const schedule = document.querySelector(".schedule");
const timeBlocks = document.querySelectorAll(".timeBlock");

// get the saved data
const savedData = JSON.parse(window.localStorage.getItem("taskData")); // How do I get this to show my stuff

// colors
const pastColor = "#6F6868";
const presentColor = "#EE0D0D";
const futureColor = "#0DEE0F";

//
// Functions
//

// Using Moment.js to update the time in the title.
function updateDate() {
  let date = moment().format("MMMM Do YYYY, h:mm:ss a");
  $("#currentDay").text(date);
}

// do something with the save data
function renderSavedData() {
  // if saved data exists (is not null) then run the function
  if (savedData) {
    savedData.forEach(function (item, index) {
      if (item !== "") {
        // get the timeblock which corresponds to the current saved data element.
        const blockToUpdate = timeBlocks[index];

        blockToUpdate.value = item;
      }
    });
  }
}

//Render Background Colors according to the time
function renderBackgroundColor() {
  let currentTime = parseInt(moment().format("H"));
  let id = document.querySelector("textarea");
  // let timeEL = parseInt(id.getAttribute("id"));
  // console.log(timeEL);

  // create array of time blocks to loop through
  console.log("Current time: ", parseInt(moment().format("H"))); // log the current time for reference

  timeBlocks.forEach(function (block) {
    const blockTime = parseInt(block.id);

    if (blockTime < currentTime) {
      block.style.backgroundColor = pastColor; //Green
    } else if (blockTime === currentTime) {
      block.style.backgroundColor = presentColor; //Yellow
    } else {
      block.style.backgroundColor = futureColor; //Red
    }
  });
}

//
//Event Listener
//
schedule.addEventListener("click", function (event) {
  // check if the click target is inside a button.
  const saveBtn = event.target.closest(".saveBtn");
  if (saveBtn) {
    const newData = [];

    // get all the text from all the textAreas and push to an array
    timeBlocks.forEach(function (block) {
      newData.push(block.value);
    });

    window.localStorage.setItem("taskData", JSON.stringify(newData));
  }
});

// Invoke Functions
updateDate();
renderBackgroundColor();
renderSavedData();
