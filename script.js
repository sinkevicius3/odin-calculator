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