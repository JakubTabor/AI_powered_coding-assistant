# Simple Calculator

**A lightweight, browser‑based calculator built with vanilla HTML, CSS, and JavaScript.**

---

## Tech Stack
- **HTML5** – Structure and accessibility markup.
- **CSS3** – Styling and responsive layout.
- **JavaScript (ES6)** – Core calculator logic, event handling, and error management.

---

## Features
- Basic arithmetic operations: addition, subtraction, multiplication, division.
- Clear (`C`) and backspace (`←`) functionality.
- Real‑time display of entered expression.
- Keyboard shortcuts for all buttons (numbers, operators, `Enter` for `=`, `Esc` for clear, `Backspace` for delete).
- Graceful error handling (e.g., division by zero, malformed expressions) with user‑friendly messages.
- Fully responsive layout that works on desktop and mobile browsers.

---

## Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/your‑username/simple-calculator.git
   cd simple-calculator
   ```
2. **Open the application**
   - No build step is required. Simply open `index.html` in any modern web browser.
   ```bash
   open index.html   # macOS
   # or double‑click the file in Explorer/Finder
   ```

---

## Usage Guide
### Button Layout
| Row | Buttons |
|-----|---------|
| 1 | **C** (Clear) | **←** (Backspace) | **/** (Divide) |
| 2 | **\*** (Multiply) | **-** (Subtract) | **+** (Add) |
| 3 | Numbers **7 8 9** |
| 4 | Numbers **4 5 6** |
| 5 | Numbers **1 2 3** |
| 6 | **0** and **=** (Equals) |

- Click a button or press the corresponding key on your keyboard.
- The display (`<input>` at the top) shows the current expression and the result after pressing `=`.

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `0‑9` | Enter numbers |
| `+ - * /` | Operators |
| `Enter` | Evaluate (`=`) |
| `Esc` | Clear (`C`) |
| `Backspace` | Delete last character |

### Error Handling
- **Division by zero** – The calculator shows `Error: Division by zero` and clears the expression after a short pause.
- **Invalid syntax** – If the expression cannot be evaluated, `Error` is displayed.
- The display is read‑only to prevent manual edits that could bypass validation.

---

## Screenshots
> *Add screenshots of the calculator in action here.*

```
[ Screenshot placeholder ]
```

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bug‑fix.
3. Make your changes, ensuring the existing functionality remains intact.
4. Submit a Pull Request with a clear description of what you changed and why.

---

## License
[Insert license information here – e.g., MIT License]
