const display = document.getElementById('display');
const historyList = document.getElementById('history-list');
let history = [];
const buttons = document.querySelectorAll('.buttons button');

// Evaluate expression and update history
function evaluateExpression() {
  const expression = display.value;
  try {
    const result = eval(expression);
    display.value = result;
    updateHistory(expression, result);
  } catch {
    display.value = 'Error';
  }
}

// Update and render history
function updateHistory(expression, result) {
  const entry = `${expression} = ${result}`;
  history.unshift(entry); // Add new result at the beginning
  if (history.length > 3) history.pop(); // Keep only the last 3
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}
// Handle button clicks
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.textContent;

    // Clear all
    if (value === 'C') {
      display.value = '';
      return;
    }

    // Delete last character
    if (value === 'DEL') {
      display.value = display.value.slice(0, -1);
      return;
    }

    // Evaluate expression
    if (value === '=') {
      evaluateExpression();
      return;
    }

    // Append value
    display.value += value;
  });
});

// Theme toggle
const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  // Change icon based on mode
  themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Keyboard input support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  // Prevent default behavior on Enter
  if (key === 'Enter') {
    e.preventDefault();
    evaluateExpression();
    return;
  }

  // Backspace = delete last char
  if (key === 'Backspace') {
    e.preventDefault();
    display.value = display.value.slice(0, -1);
    return;
  }

  // Escape = clear
  if (key === 'Escape') {
    e.preventDefault();
    display.value = '';
    return;
  }

  // Allow digits and basic operators
  if (/^[0-9+\-*/.%]$/.test(key)) {
    display.value += key;
    return;
  }
});
