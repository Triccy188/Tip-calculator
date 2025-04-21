const billInput = document.querySelector('.bill-input');
const peopleInput = document.querySelector('.People-input');
const tipAmountDisplay = document.querySelectorAll('.tip-span')[0];
const totalAmountDisplay = document.querySelectorAll('.tip-span')[1];
const tipButtons = document.querySelectorAll('.percentage');
const customTipInput = document.querySelector('.percentaged');
const resetButton = document.querySelector('.reset');
const peopleError = document.querySelector('.people-error');

let tipPercent = 0;

function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (!bill || bill < 1) {
    tipAmountDisplay.textContent = "$ 0.00";
    totalAmountDisplay.textContent = "$ 0.00";
    return;
  }

  if (!people || people < 1) {
    peopleError.textContent = "Can't be zero!";
    tipAmountDisplay.textContent = "$ 0.00";
    totalAmountDisplay.textContent = "$ 0.00";
    return;
  } else {
    peopleError.textContent = "";
  }

  const tipPerPerson = (bill * tipPercent) / people;
  const totalPerPerson = (bill / people) + tipPerPerson;

  tipAmountDisplay.textContent = `$ ${tipPerPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$ ${totalPerPerson.toFixed(2)}`;
}

billInput.addEventListener('input', () => {
  billInput.value = billInput.value.replace(/[^\d.]/g, '');
  if (billInput.value !== "" && parseFloat(billInput.value) < 1) {
    billInput.value = "";
  }
  calculateTip();
});

peopleInput.addEventListener('input', () => {
  peopleInput.value = peopleInput.value.replace(/[^\d]/g, '');
  if (peopleInput.value.startsWith('0') || parseInt(peopleInput.value) < 1) {
    peopleError.textContent = "Can't be zero!";
  } else {
    peopleError.textContent = "";
  }
  calculateTip();
});

tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    tipButtons.forEach(btn => btn.classList.remove('active'));  // clear highlight
    button.classList.add('active');
    tipPercent = parseInt(button.textContent) / 100;
    customTipInput.value = '';
    calculateTip();
  });
});

customTipInput.addEventListener('input', () => {
  customTipInput.value = customTipInput.value.replace(/[^\d]/g, '');
  if (customTipInput.value) {
    tipPercent = parseInt(customTipInput.value) / 100;
  } else {
    tipPercent = 0;
  }
  calculateTip();
});

resetButton.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  tipAmountDisplay.textContent = '$ 0.00';
  totalAmountDisplay.textContent = '$ 0.00';
  tipPercent = 0;
  peopleError.textContent = '';
  tipButtons.forEach(btn => btn.classList.remove('active'));
});
