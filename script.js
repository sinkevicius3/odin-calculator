function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero.");
  }
  return a / b;
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
  let firstNumber = null;
  let secondNumber = null;
  let operator = null;
  let operatorJustClicked = false;
  let activeOperatorBtn = null;
  let justCalculated = false;

  numpadBtns.forEach(button => {
    button.addEventListener('click', () => {
      const buttonValue = button.textContent;

      if (buttonValue === 'C') {
        screenText.textContent = "0";
        displayValue = "";
        firstNumber = null;
        secondNumber = null;
        operator = null;
        operatorJustClicked = false;
        justCalculated = false;
        if (activeOperatorBtn) {
          activeOperatorBtn.classList.remove('operator-active');
          activeOperatorBtn = null;
        }
        return;
      }

      if (['+', '-', '*', '/'].includes(buttonValue)) {
        if (operator && displayValue !== "") {
          secondNumber = parseFloat(displayValue);
          try {
            firstNumber = operate(operator, firstNumber, secondNumber);
            screenText.textContent = firstNumber.toString().slice(0, 12);
          } catch (e) {
            screenText.textContent = e.message;
            firstNumber = null;
          }
        } else if (displayValue !== "") {
          firstNumber = parseFloat(displayValue);
        }

        operator = buttonValue;
        operatorJustClicked = true;
        displayValue = "";
        justCalculated = false;

        if (activeOperatorBtn) {
          activeOperatorBtn.classList.remove('operator-active');
        }
        button.classList.add('operator-active');
        activeOperatorBtn = button;
        return;
      }

      if (buttonValue === "=") {
        if (operator && displayValue !== "") {
          secondNumber = parseFloat(displayValue);
          try {
            firstNumber = operate(operator, firstNumber, secondNumber);
            screenText.textContent = firstNumber.toString().slice(0, 12);
          } catch (e) {
            screenText.textContent = e.message;
            firstNumber = null;
          }
        }

        displayValue = firstNumber ? firstNumber.toString() : "";
        secondNumber = null;
        operator = null;
        operatorJustClicked = false;
        justCalculated = true;

        if (activeOperatorBtn) {
          activeOperatorBtn.classList.remove('operator-active');
          activeOperatorBtn = null;
        }
        return;
      }

      if (justCalculated) {
        displayValue = "";
        firstNumber = null;
        operator = null;
        justCalculated = false;
      }

      if (operatorJustClicked) {
        displayValue = "";
        operatorJustClicked = false;
      }

      if (displayValue.length < 12) {
        displayValue += buttonValue;
      }

      screenText.textContent = displayValue;
    });
  });
}

runCalculator();