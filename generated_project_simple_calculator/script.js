// script.js - Calculator core logic
// This script is loaded with defer, so the DOM is ready when it runs.

// ====================
// Step 1: DOM References & State
// ====================
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

const state = {
  currentInput: '', // string representation of the expression being built
  lastResult: null, // numeric result of the last evaluation (not currently used but kept for future extensions)
  errorTimeoutId: null, // to clear temporary error messages
};

// ====================
// Step 6: Display Update (used throughout)
// ====================
function updateDisplay() {
  display.value = state.currentInput || '0';
}

// Helper to show a temporary error message
function showError(message) {
  // Clear any existing timeout
  if (state.errorTimeoutId) {
    clearTimeout(state.errorTimeoutId);
    state.errorTimeoutId = null;
  }
  display.value = message;
  // Reset after 2 seconds
  state.errorTimeoutId = setTimeout(() => {
    state.errorTimeoutId = null;
    state.currentInput = '';
    updateDisplay();
  }, 2000);
}

// ====================
// Step 2: Utility Functions
// ====================
function appendToInput(value) {
  // Guard against multiple consecutive operators
  const operators = '+-*/';
  const lastChar = state.currentInput.slice(-1);
  if (operators.includes(value)) {
    if (state.currentInput === '' && value !== '-') {
      // Disallow starting expression with +, *, /
      return;
    }
    if (operators.includes(lastChar)) {
      // Replace the previous operator with the new one
      state.currentInput = state.currentInput.slice(0, -1) + value;
      updateDisplay();
      return;
    }
  }

  // Prevent leading zeros (e.g., "00" -> "0") unless a decimal point follows
  if (state.currentInput === '0' && /[0-9]/.test(value)) {
    // If the user is typing another digit after a solitary zero, replace the zero
    state.currentInput = value;
  } else {
    state.currentInput += value;
  }
  updateDisplay();
}

function clearInput() {
  state.currentInput = '';
  state.lastResult = null;
  updateDisplay();
}

function backspace() {
  if (state.currentInput.length > 0) {
    state.currentInput = state.currentInput.slice(0, -1);
    updateDisplay();
  }
}

// ====================
// Step 3: Calculation Engine
// ====================
function evaluateExpression() {
  if (!state.currentInput) return;

  // Basic validation – expression must not end with an operator
  const operators = '+-*/';
  if (operators.includes(state.currentInput.slice(-1))) {
    showError('Error: Incomplete expression');
    return;
  }

  try {
    const rpn = infixToRPN(tokenize(state.currentInput));
    const result = evaluateRPN(rpn);
    if (!isFinite(result)) {
      // Handles division by zero and other infinities
      showError('Error: Division by zero');
      return;
    }
    state.lastResult = result;
    state.currentInput = String(result);
    updateDisplay();
  } catch (e) {
    console.error(e);
    showError('Error: Invalid expression');
  }
}

// Tokenizer – splits the input string into numbers and operators
function tokenize(expr) {
  const tokens = [];
  let numberBuffer = '';
  const pushNumber = () => {
    if (numberBuffer) {
      tokens.push(numberBuffer);
      numberBuffer = '';
    }
  };

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (ch >= '0' && ch <= '9' || ch === '.') {
      numberBuffer += ch;
    } else if ('+-*/'.includes(ch)) {
      pushNumber();
      tokens.push(ch);
    } else {
      // Unexpected character – ignore or throw
      throw new Error('Invalid character in expression');
    }
  }
  pushNumber();
  return tokens;
}

// Shunting‑yard algorithm – converts infix token array to RPN (postfix) array
function infixToRPN(tokens) {
  const outputQueue = [];
  const operatorStack = [];
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const leftAssociative = { '+': true, '-': true, '*': true, '/': true };

  for (const token of tokens) {
    if (!isNaN(token)) {
      // token is a number
      outputQueue.push(token);
    } else if ('+-*/'.includes(token)) {
      while (
        operatorStack.length &&
        '+-*/'.includes(operatorStack[operatorStack.length - 1]) &&
        ((leftAssociative[token] && precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]) ||
          (!leftAssociative[token] && precedence[token] < precedence[operatorStack[operatorStack.length - 1]]))
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else {
      throw new Error('Unknown token');
    }
  }

  while (operatorStack.length) {
    const op = operatorStack.pop();
    if (!'+-*/'.includes(op)) {
      throw new Error('Mismatched parentheses'); // Not used here but kept for completeness
    }
    outputQueue.push(op);
  }

  return outputQueue;
}

// Evaluate RPN expression
function evaluateRPN(rpn) {
  const stack = [];
  for (const token of rpn) {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      if (a === undefined || b === undefined) {
        throw new Error('Invalid RPN expression');
      }
      let res;
      switch (token) {
        case '+':
          res = a + b;
          break;
        case '-':
          res = a - b;
          break;
        case '*':
          res = a * b;
          break;
        case '/':
          if (b === 0) {
            // Division by zero – let caller handle via isFinite check
            return Infinity;
          }
          res = a / b;
          break;
        default:
          throw new Error('Unsupported operator');
      }
      stack.push(res);
    }
  }
  if (stack.length !== 1) {
    throw new Error('RPN evaluation error');
  }
  return stack[0];
}

// ====================
// Step 4: Event Listeners for Buttons
// ====================
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value; // For number & operator buttons
    if (button.id === 'clear') {
      clearInput();
    } else if (button.id === 'backspace') {
      backspace();
    } else if (button.id === 'equals') {
      evaluateExpression();
    } else if (value !== undefined) {
      // Could be a number or an operator
      appendToInput(value);
    }
  });
});

// ====================
// Step 5: Keyboard Support
// ====================
function handleKey(e) {
  const key = e.key;
  const allowedKeys = '0123456789.+-*/';
  if (allowedKeys.includes(key)) {
    e.preventDefault();
    if (key === '.' && state.currentInput.slice(-1) === '.') {
      // Prevent multiple consecutive dots
      return;
    }
    appendToInput(key);
    return;
  }

  if (key === 'Enter' || key === '=') {
    e.preventDefault();
    evaluateExpression();
    return;
  }

  if (key === 'Backspace') {
    e.preventDefault();
    backspace();
    return;
  }

  if (key === 'Escape') {
    e.preventDefault();
    clearInput();
    return;
  }
}

document.addEventListener('keydown', handleKey);

// Initial display update
updateDisplay();
