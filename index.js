const billInput = document.querySelector('.input-field')[0];
const peopleInput = document.querySelector('.input-field')[1];
const tipAmountDisplay = document.querySelectorAll('.tip-span')[0];
const totalAmountDisplay = document.querySelectorAll('.tip-span')[1];
const tipButtons = document.querySelectorAll('.percentage');
const customTipInput = document.querySelector('.percentaged');
const resetButton = document.querySelector('.reset');
const peopleError = document.querySelector('.people-error');

let tipPercent = 0;

// Central tip calculation logic
function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  // Validate Bill
  if (!bill || bill < 1) {
    tipAmountDisplay.textContent = "$ 0.00";
    totalAmountDisplay.textContent = "$ 0.00";
    return;
  }

  // Validate People
  if (!people || people < 1) {
    peopleError.textContent = "Can't be zero!";
    tipAmountDisplay.textContent = "$ 0.00";
    totalAmountDisplay.textContent = "$ 0.00";
    return;
  } else {
    peopleError.textContent = "";
  }
//maim logic
  const tipPerPerson = (bill * tipPercent) / people;
  const totalPerPerson = (bill / people) + tipPerPerson;

  tipAmountDisplay.textContent = `$ ${tipPerPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$ ${totalPerPerson.toFixed(2)}`;
}

// Bill input listener
billInput.addEventListener('input', () => {
  billInput.value = billInput.value.replace(/[^\d.]/g, '');

  // Prevent anything less than 1
  if (billInput.value !== "" && parseFloat(billInput.value) < 1) {
    billInput.value = ""; // Clear invalid value
  }

  calculateTip();
});

// People input listener
peopleInput.addEventListener('input', () => {
  peopleInput.value = peopleInput.value.replace(/[^\d]/g, '');

  // Show error instantly if the first character is 0
  if (peopleInput.value.startsWith('0') || parseInt(peopleInput.value) < 1) {
    peopleError.textContent = "Can't be zero!";
  } else {
    peopleError.textContent = "";
  }

  calculateTip();
});

// Tip buttons logic
tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    // tipButtons.forEach(btn => btn.classList.remove('percentage'));  // Remove active highlight
    button.classList.add('percentage');  // Highlight selected button

    tipPercent = parseInt(button.textContent) / 100;
    customTipInput.value = ''; // Clear custom input if a button is clicked
    calculateTip();
  });
});

// Custom tip input logic
customTipInput.addEventListener('input', () => {
  customTipInput.value = customTipInput.value.replace(/[^\d]/g, ''); // Allow only digits
  // tipButtons.forEach(btn => btn.classList.remove('percentaged'));  // Unselect buttons

  if (customTipInput.value) {
    tipPercent = parseInt(customTipInput.value) / 100;
  } else {
    tipPercent = 0;
  }
  calculateTip();
});

// Reset everything
resetButton.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  tipAmountDisplay.textContent = '$ 0.00';
  totalAmountDisplay.textContent = '$ 0.00';
  tipPercent = 0;
  peopleError.textContent = '';
  // tipButtons.forEach(btn => btn.classList.remove('percentage'));
});
