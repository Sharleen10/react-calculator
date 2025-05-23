import logo from './logo.svg';
import './App.css';

function App() {

  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Handles input of digits and updates the display accordingly
  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };
  // Handles decimal point input, ensuring only one decimal is added
    const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  // Resets the calculator to its initial state
  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  // Deletes the last character from the display; resets to "0" if only one character remains
    const deleteLast = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  // Executes the current operation and prepares the calculator for the next operation
  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  // Performs basic arithmetic operations based on the provided operator
   const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  // Handles the equals (=) operation by calculating and displaying the result
  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  // Formats large numbers in exponential notation if they exceed 12 characters
  const formatDisplay = (value) => {
    if (value.length > 12) {
      return parseFloat(value).toExponential(6);
    }
    return value;
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-body">
          {/* Display */}
          <div className="display-container">
            <div className="display-content">
              <div className="operation-preview">
                {previousValue !== null && operation && (
                  <span>{previousValue} {operation}</span>
                )}
              </div>
              <div className="main-display">
                {formatDisplay(display)}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="button-grid">
            {/* Row 1 */}
            <button onClick={clear} className="btn btn-clear btn-wide">
              Clear
            </button>
            <button onClick={deleteLast} className="btn btn-delete">
              Del
            </button>
            <button onClick={() => performOperation("÷")} className="btn btn-operation">
              ÷
            </button>

            {/* Row 2 */}
            <button onClick={() => inputDigit(7)} className="btn btn-number">
              7
            </button>
            <button onClick={() => inputDigit(8)} className="btn btn-number">
              8
            </button>
            <button onClick={() => inputDigit(9)} className="btn btn-number">
              9
            </button>
            <button onClick={() => performOperation("×")} className="btn btn-operation">
              ×
            </button>

            {/* Row 3 */}
            <button onClick={() => inputDigit(4)} className="btn btn-number">
              4
            </button>
            <button onClick={() => inputDigit(5)} className="btn btn-number">
              5
            </button>
            <button onClick={() => inputDigit(6)} className="btn btn-number">
              6
            </button>
            <button onClick={() => performOperation("-")} className="btn btn-operation">
              −
            </button>

            {/* Row 4 */}
            <button onClick={() => inputDigit(1)} className="btn btn-number">
              1
            </button>
            <button onClick={() => inputDigit(2)} className="btn btn-number">
              2
            </button>
            <button onClick={() => inputDigit(3)} className="btn btn-number">
              3
            </button>
            <button onClick={() => performOperation("+")} className="btn btn-operation">
              +
            </button>

            {/* Row 5 */}
            <button onClick={() => inputDigit(0)} className="btn btn-number btn-wide">
              0
            </button>
            <button onClick={inputDecimal} className="btn btn-number">
              .
            </button>
            <button onClick={handleEquals} className="btn btn-equals">
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default App;
