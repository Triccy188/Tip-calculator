const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipAmountDisplay = document.querySelectorAll(".tip-span")[0];
const totalAmountDisplay = document.querySelectorAll(".tip-span")[1];
const tipButtons = document.querySelectorAll(".percentage");
const customTipInput = document.querySelector(".percentaged");
const resetButton = document.querySelector(".reset");
const peopleError = document.querySelector(".people-error");
const billError = document.querySelector(".bill-error");

console.log(billInput);

let tipPercent = 0;

// Helper function to reset UI
function resetUI() {
  tipAmountDisplay.textContent = "$ 0.00";
  totalAmountDisplay.textContent = "$ 0.00";
  peopleError.textContent = "";
  billError.textContent = "";
}

// Central tip calculation logic
function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  // Validate Bill
  if (!bill || bill < 1) {
    billError.textContent = "Bill must be greater than 0";
    resetUI();
    return;
  } else {
    billError.textContent = "";
  }

  // Validate People
  if (!people || people < 1) {
    peopleError.textContent = "Number of people must be at least 1";
    resetUI();
    return;
  } else {
    peopleError.textContent = "";
  }

  // Main logic
  const tipPerPerson = (bill * tipPercent) / people;
  const totalPerPerson = bill / people + tipPerPerson;

  // Update the UI with calculated values
  tipAmountDisplay.textContent = `$ ${tipPerPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$ ${totalPerPerson.toFixed(2)}`;
}

// Bill input listener
billInput.addEventListener("input", () => {
  billInput.value = billInput.value.replace(/[^\d.]/g, ""); // Allow only numbers and decimal points

  if (billInput.value !== "" && parseFloat(billInput.value) < 1) {
    billError.textContent = "Bill must be greater than 0";
    return;
  } else {
    billError.textContent = "";
  }

  calculateTip();
});

console.log(peopleError);
// People input listener
peopleInput.addEventListener("input", () => {
  peopleInput.value = peopleInput.value.replace(/[^\d]/g, ""); // Allow only digits

  if (peopleInput.value.startsWith("0") || parseInt(peopleInput.value) < 1) {
    peopleError.textContent = "Number of people must be at least 1";
    return;
  } else {
    peopleError.textContent = "";
  }

  calculateTip();
});

// Tip buttons logic
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach((btn) => btn.classList.remove("percentage")); // Remove active highlight
    button.classList.add("percentage"); // Highlight selected button

    tipPercent = parseInt(button.textContent) / 100;
    customTipInput.value = ""; // Clear custom input if a button is clicked
    calculateTip();
  });
});

// Custom tip input logic
customTipInput.addEventListener("input", () => {
  customTipInput.value = customTipInput.value.replace(/[^\d]/g, ""); // Allow only digits

  if (customTipInput.value) {
    tipPercent = parseInt(customTipInput.value) / 100;
  } else {
    tipPercent = 0;
  }

  tipButtons.forEach((btn) => btn.classList.remove("percentage")); // Unselect buttons
  calculateTip();
});

// Reset everything
resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  tipPercent = 0;
  resetUI();
  tipButtons.forEach((btn) => btn.classList.remove("percentage")); // Unselect buttons
});
