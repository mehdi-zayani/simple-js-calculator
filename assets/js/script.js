const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');


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
      try {
        display.value = eval(display.value);
      } catch {
        display.value = 'Error';
      }
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

  // Prevent page reload or default behavior on Enter
  if (key === 'Enter') {
    e.preventDefault();
    try {
      display.value = eval(display.value);
    } catch {
      display.value = 'Error';
    }
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
