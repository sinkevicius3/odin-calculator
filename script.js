function add(a, b){
  return (a + b);
}

function subtract(a, b){
  return (a - b);
}

function multiply(a, b){
  return (a * b);
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero.");
  }
  return (a / b);
}

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case '+':
      return add(firstNumber, secondNumber);
    case '-':
      return subtract(firstNumber, secondNumber);
    case '*':
      return multiply(firstNumber, secondNumber);
    case '/':
      return divide(firstNumber, secondNumber);
    default:
      throw new Error("Invalid operator.");
  }
}

function runCalculator() {
  const screenText = document.getElementById('screen-text');
  const numpadBtns = document.querySelectorAll('.numpad-btn');

  let displayValue = "";
  let firstNumber = 0;
  let secondNumber = 0;
  let operator = "";
  let operatorJustClicked = false;
  let activeOperatorBtn = null;

  numpadBtns.forEach(button => {
    button.addEventListener('click', () => {
      const buttonValue = button.textContent;

      if (buttonValue === 'C') {
        screenText.textContent = "0";
        displayValue = "";
        firstNumber = 0;
        secondNumber = 0;
        operator = "";
        operatorJustClicked = false;
        if (activeOperatorBtn) {
          activeOperatorBtn.classList.remove('operator-active');
          activeOperatorBtn = null;
        }
        return;
      }

      else if (buttonValue === "+" || buttonValue === "-" || 
               buttonValue === "*" || buttonValue === "/") {

        if (operator && displayValue !== "") {
          secondNumber = parseFloat(displayValue);
          firstNumber = operate(operator, firstNumber, secondNumber);
          screenText.textContent = firstNumber;
        } else if (displayValue !== "") {
          firstNumber = parseFloat(displayValue);
        }

        operator = buttonValue;
        operatorJustClicked = true;
        displayValue = "";

        if (activeOperatorBtn) {
          activeOperatorBtn.classList.remove('operator-active');
        }
        button.classList.add('operator-active');
        activeOperatorBtn = button;
      }

      else if (buttonValue === "=") {
        if (operator && displayValue !== "") {
          secondNumber = parseFloat(displayValue);
          firstNumber = operate(operator, firstNumber, secondNumber);
          screenText.textContent = firstNumber;
        }

        displayValue = firstNumber.toString();
        secondNumber = 0;
        operator = "";
        operatorJustClicked = false;

        if (activeOperatorBtn) {
          activeOperatorBtn.classList.remove('operator-active');
          activeOperatorBtn = null;
        }
      }

      else {
        if (operatorJustClicked) {
          displayValue = "";
          operatorJustClicked = false;
        }
        displayValue += buttonValue;
        screenText.textContent = displayValue;
      }
    });
  });
}

runCalculator();