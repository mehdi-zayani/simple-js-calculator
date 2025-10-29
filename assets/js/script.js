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

