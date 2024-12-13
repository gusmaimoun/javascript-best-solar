/*jslint browser:true */
'use strict';

function addMonths(elem) {
  var annualUseKw = 0,
    dailyUseKw = 0,
    i = 0,
    x = 0;
  var months = document.getElementById(elem).getElementsByTagName('input');
  for (i = 0; i < months.length; i++) {
    x = Number(months[i].value);
    annualUseKw += x;
  } // end loop
  dailyUseKw = annualUseKw / 365;
  return dailyUseKw;
} // end of function

function sunHours() {
  var hrs;
  var theZone = document.forms.solarForm.zone.selectedIndex;
  theZone += 1; //array offset
  switch (theZone) {
    case 1:
      hrs = 6;
      break;
    case 2:
      hrs = 5.5;
      break;
    case 3:
      hrs = 5;
      break;
    case 4:
      hrs = 4.5;
      break;
    case 5:
      hrs = 4.2;
      break;
    case 6:
      hrs = 3.5;
      break;
    default:
      hrs = 0;
  } //end switch
  return hrs;
} //  end function

function calculatePanel() {
  var userChoice = document.forms.solarForm.panel.selectedIndex;
  var panelOptions = document.forms.solarForm.panel.options;
  var power = panelOptions[userChoice].value;
  var name = panelOptions[userChoice].text;
  var x = [power, name];
  return x;
} //  end function

function calculateSolar() {
  var dailyUseKw = addMonths('mpc');
  console.log(dailyUseKw);

  var sunHoursPerDay = sunHours();
  console.log(sunHoursPerDay);

  var minKwNeeds = dailyUseKw / sunHoursPerDay;
  console.log(minKwNeeds);

  var realKwNeeds = minKwNeeds * 1.25;
  console.log(realKwNeeds);

  var realWattNeeds = realKwNeeds * 1000;
  console.log(realWattNeeds);

  var panelInfo = calculatePanel();
  var panelOutput = panelInfo[0];
  var panelName = panelInfo[1];
  console.log(panelOutput);
  console.log(panelName);

  var panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
  console.log(panelsNeeded);

  var feedback = '';
  feedback +=
    '<p>Based on your avereage daily use of ' +
    Math.round(dailyUseKw) +
    ' Kwh, you will need to purchase  ' +
    panelsNeeded +
    ' ' +
    panelName +
    ' solar panels to offset 100% of your electricity bill.</p>';
  feedback += '<h2>Additional Details</h2>';
  feedback +=
    '<p>Your average daily electricity consumption: ' +
    Math.round(dailyUseKw) +
    ' Kwh per day.</p>';
  feedback +=
    '<p>Average sunshine hours per day: ' + sunHoursPerDay + ' hours</p>';
  feedback +=
    '<p>Realistic watts needed per hour: ' +
    Math.round(realWattNeeds) +
    ' watts/hour.</p>';
  feedback +=
    '<p>The ' +
    panelName +
    ' panel you selected generates about ' +
    panelOutput +
    ' watts per hour.</p>';

  document.getElementById('feedback').innerHTML = feedback;
} // end of function

// Get all the number input fields in the form
const monthlyInputs = document.querySelectorAll("#mpc input[type='number']");

// Get the element where the total usage will be displayed
const totalUsageDisplay = document.getElementById('totalUsage');

// Add an event listener to each input to recalculate the total when a value changes
monthlyInputs.forEach((input) => {
  input.addEventListener('input', calculateTotalUsage);
});

// Function to calculate and display the total annual usage
function calculateTotalUsage() {
  let total = 0;

  // Sum up the values from all input fields, treating empty fields as 0
  monthlyInputs.forEach((input) => {
    total += Number(input.value) || 0;
  });

  // Update the total usage display
  totalUsageDisplay.textContent = `Total Annual Usage: ${total} kWh`;
}

monthlyInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (!input.value) {
      input.style.Color = 'red'; // Highlight empty field
    } else {
      input.style.Color = ''; // Remove highlight if not empty
    }
  });
});
