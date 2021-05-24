document.addEventListener("DOMContentLoaded", function () {

// QUERY SELECTORS
const buttons = document.querySelectorAll("button");
const historyDisplay = document.querySelector("#historyDisplay");
const currentDisplay = document.querySelector("#currentDisplay");

// Define Consts
const MAX_DIGITS = 12;
const historyArray = [];

// Define variables
var isFirstCalculation = true;
var isFirstNumberAfterCalculation;
var displayingResult;
let numberInserted;
let chosenOperator;
let presentNumber;
let previousNumber;

// Reset Calculator
clearEverything(historyDisplay, currentDisplay, historyArray);

// Button Listener
buttons.forEach(button => {
    button.addEventListener("click", newInput)
    button.addEventListener("click", increaseOnClick);
    button.setAttribute("tabindex", "-1");
    button.addEventListener('focus', preventFocus);
});

function increaseOnClick (e) {
    let id = e.target.id;
    let clickedButton = document.querySelector(`#${id}`);
    clickedButton.classList.add("increaseEffect");
    clickedButton.addEventListener('animationend', removeIncrease);

    function removeIncrease() {
        clickedButton.classList.remove("increaseEffect")
    }
}

function preventFocus(event) {
    event.preventDefault();
    if (event.relatedTarget) {
      // Revert focus back to previous blurring element
      event.relatedTarget.focus();
    } else {
      // No previous focus target, blur instead
      event.currentTarget.blur();
    }
  }

// New User Input (Click or Keyboard)
function newInput(e) {
    let pressedButton = e.target;
    if (maxDigitRuleRespected(currentDisplay) || !pressedButton.classList.contains("number")) {
        // If it's a number
        if (buttonIsNumber(pressedButton)) {
            populateDisplayWithButton(currentDisplay, pressedButton);
            numberInserted = true;
        }
        // If it's an Operation
        else {
            // prevent operations without a number being inserted
            if (!numberWasInserted()) {
                return
            }
            switch (pressedButton.id) {
                case "back":
                    backspace(currentDisplay);
                    break;
                case "clear":
                    clearEverything(historyDisplay, currentDisplay, historyArray)
                    break;
                case "add":
                    if(currentDisplayIsEmpty(currentDisplay)) {
                        break;
                    }
                    if(isFirstCalculation) {
                        prepareCalculation(pressedButton.id, undefined);
                    }
                    else {
                        makeCalculation(pressedButton.id), undefined;
                    }
                    break;
                case "subtract":
                    if(currentDisplayIsEmpty(currentDisplay)) {
                        break;
                    }
                    if(isFirstCalculation) {
                        prepareCalculation(pressedButton.id, undefined);
                    }
                    else {
                        makeCalculation(pressedButton.id, undefined);
                    }
                    break;
                case "division":
                    if(currentDisplayIsEmpty(currentDisplay)) {
                        break;
                    }
                    if(isFirstCalculation) {
                        prepareCalculation(pressedButton.id, undefined);
                    }
                    else {
                        makeCalculation(pressedButton.id, undefined);
                    }
                    break;
                case "multiply":
                    if(currentDisplayIsEmpty(currentDisplay)) {
                        break;
                    }
                    if(isFirstCalculation) {
                        prepareCalculation(pressedButton.id, undefined);
                    }
                    else {
                        makeCalculation(pressedButton.id, undefined);
                    }
                    break;
                case "power":
                    if(currentDisplayIsEmpty(currentDisplay)) {
                        break;
                    }
                    if(isFirstCalculation) {
                        prepareCalculation(pressedButton.id, undefined);
                    }
                    else {
                        makeCalculation(pressedButton.id), undefined;
                    }
                case "equals":
                    // prevents user from clicking "=" multiple times or before inserting a number
                    if (chosenOperator === "" || !previousNumber) {
                        return;
                    }
                    updateDisplayWithFinalResult();
                    // sets chosenOperator to "" and isFirstCalculation to true
                    resetIsFirstCalculation();
                    resetChosenOperator();
                    // allow user to insert new numbers after 'EQUALS'.
                    displayingResult = true;
                    isFirstNumberAfterCalculation = true
                    break;
                case "signalChange":
                    if (!currentDisplayIsEmpty(currentDisplay)) {
                        signalChange(currentDisplay);  
                    }           
                       break;
                case "decimal":
                    addDecimal(currentDisplay);
                        break;    
                default:
                    break;
            }
            }
        }
    }


// FUNCTIONS FOR BASIC OPERATIONS
let add = (previousNumber, numberToAdd) => roundToSixDecimals(parseFloat(previousNumber) + parseFloat(numberToAdd));
let subtract = (previousNumber, numberToSubtract) => roundToSixDecimals(parseFloat(previousNumber) - parseFloat(numberToSubtract));
let multiply = (previousNumber, multiplier) =>  roundToSixDecimals(parseFloat(previousNumber) * parseFloat(multiplier));
let power = (previousNumber, power) => roundToSixDecimals(Math.pow(previousNumber, power));
function division (previousNumber, divider) {
        return roundToSixDecimals(parseFloat(previousNumber) / parseFloat(divider));
}

function roundToSixDecimals(number) {
    return Math.round(number * 1000000) / 1000000
}

// OPERATOR FUNCTION - MAKES ALL THE OPERATIONS WITH NUMBERS BASED ON CHOSEN OPERATOR
function operate(chosenOperator, previousNumber, presentNumber) {
    switch (chosenOperator) {
        case "add":
            return add(previousNumber, presentNumber);
        case "subtract":
            return subtract(previousNumber, presentNumber);
        case "multiply":
            return multiply(previousNumber, presentNumber);
        case "division":
            return division(previousNumber, presentNumber);
        case "power":
            return power(previousNumber, presentNumber);
        default:
            break;
    }
}
// PREPARE AND MAKE CALCULATIONS FUNCTIONS
function prepareCalculation(pressedButtonId, keyboardChoice) {
    displayingResult = false;
    previousNumber = currentDisplay.textContent;
    ifFirstOperationClearDisplay();
    if(!keyboardChoice) {
    chosenOperator = pressedButtonId;
    }
    if(!pressedButtonId) {
        chosenOperator = keyboardChoice;
    }
    isFirstCalculation  = false;
}
function makeCalculation(pressedButtonId, keyboardChoice) {
    presentNumber = currentDisplay.textContent;
    let result = operate(chosenOperator, previousNumber, presentNumber);
    previousNumber = result;
    updateDisplay(result);
    isFirstNumberAfterCalculation = true;
    if(!keyboardChoice) {
    chosenOperator = pressedButtonId;
    }
    if(!pressedButtonId) {
        chosenOperator = keyboardChoice;
    }
}

let updateDisplay = (displayValue) => currentDisplay.textContent = `${displayValue}`;

function updateDisplayWithFinalResult() {
    presentNumber = currentDisplay.textContent;
    let result = operate(chosenOperator, previousNumber, presentNumber);
    updateDisplay(result);
}

// FUNCTIONS FOR CLEARING DISPLAY AND CALCULATOR
let clearCurrentDisplay = () => currentDisplay.textContent = "";

function clearEverything(history, currentDisplay, historyArray) {
    displayingResult = false;
    isFirstCalculation = true;
    numberInserted = ""
    history.textContent = "";
    currentDisplay.textContent = "";
    historyArray.splice(0, historyArray.length);
}

function backspace(currentDisplay) {
    presentNumber = currentDisplay.textContent;
    let newNumber = presentNumber.slice(0,-1);
    // prevents trailing of "." before operating
    if (newNumber.slice(-1) === ".") {
        newNumber = newNumber.slice(0, -1);
      }
    currentDisplay.textContent = newNumber;
    // prevents empty display
    if (currentDisplayIsEmpty(currentDisplay)) {
        currentDisplay.textContent = "0"
    }
}


// CHANGE SIGN AND ADD DECIMALS
function signalChange(currentDisplay) {
    presentNumber = currentDisplay.textContent;
    let inverseNumber = parseFloat(presentNumber) * (-1);
    currentDisplay.textContent = inverseNumber;
}

function addDecimal(currentDisplay) {
    if (currentDisplayIsEmpty(currentDisplay) || currentNumberIsZero(currentDisplay)) {
        currentDisplay.textContent = "0."
    }
    else if(!currentDisplayIsEmpty(currentDisplay) && !alreadyContainsDecimal(currentDisplay)) {
        currentDisplay.textContent += "."
    }
}

// POPULATE CURRENT DISPLAY WITH CLICKED BUTTON
function populateDisplayWithButton(currentDisplay, pressedButton) {
    if(currentNumberIsZero(currentDisplay)) {
        updateDisplay(pressedButton.outerText);
        }
    if(displayingResult) {
        if(isFirstNumberAfterCalculation && currentDisplay.textContent.slice(-1) !== ".") {
            updateDisplay(pressedButton.outerText);
            isFirstNumberAfterCalculation = false;
        }
        else {
            currentDisplay.textContent += pressedButton.outerText;
        }
    }
    else if(!currentNumberIsZero(currentDisplay) && !isFirstCalculation && isFirstNumberAfterCalculation === true) {
        updateDisplay(pressedButton.outerText);
        isFirstNumberAfterCalculation = false;
    }
    else {
        currentDisplay.textContent += pressedButton.outerText;
        }
}

function populateDisplayWithKeyDown(currentDisplay, number) {
    if(currentNumberIsZero(currentDisplay)) {
        updateDisplay(number);
        }
    if(displayingResult) {
        if(isFirstNumberAfterCalculation && currentDisplay.textContent.slice(-1) !== ".") {
            updateDisplay(number);
            isFirstNumberAfterCalculation = false;
        }
        else {
            currentDisplay.textContent += number;
        }
    }
    else if(!currentNumberIsZero(currentDisplay) && !isFirstCalculation && isFirstNumberAfterCalculation === true) {
        updateDisplay(number);
        isFirstNumberAfterCalculation = false;
    }
    else {
        currentDisplay.textContent += number;
        }
}

// BOOLEAN VALIDATIONS
let ifFirstOperationClearDisplay = () => isFirstCalculation ? clearCurrentDisplay() : 1;
let buttonIsNumber = (pressedButton) => (pressedButton.classList.contains("number")) ? true : false;
let currentNumberIsZero = (currentDisplay) => (currentDisplay.textContent === "0") ? true : false;
let currentDisplayIsEmpty = (currentDisplay) => (currentDisplay.textContent === "") ? true : false;
let numberWasInserted = () => numberInserted ? true : false;
function alreadyContainsDecimal(currentDisplay) {
    let presentNumber = currentDisplay.textContent;
    for (let digit of presentNumber) {
        if (digit === ".") {
        return true
        }
    }
    return false;
}

function maxDigitRuleRespected(currentDisplay) {
    let numberSize = currentDisplay.textContent;
    if (numberSize.length < MAX_DIGITS) {
        return true
    }
    return false
}

// RUNS AFTER PRESSING "EQUALS" 
let resetIsFirstCalculation = () => isFirstCalculation = true;
let resetChosenOperator = () =>  chosenOperator = "";

// // Keyboard Support
document.addEventListener("keyup", keyboardSupport);

 function keyboardSupport(e) {
     switch (e.keyCode) {
        case 8:
            backspace(currentDisplay);
            break;
        case 13: // equals
            if (chosenOperator === "" || !previousNumber) {
                return;
            }
            updateDisplayWithFinalResult();
            resetIsFirstCalculation();
            resetChosenOperator();
            displayingResult = true;
            isFirstNumberAfterCalculation = true
            break;
        case 46:
            clearEverything(history, currentDisplay, historyArray);
            break;
        case 48:
            numberInserted = true;
            populateDisplayWithKeyDown(currentDisplay, 0);
            break;
        case 49:
            numberInserted = true;
            populateDisplayWithKeyDown(currentDisplay, 1);
            break;
        case 50:
            numberInserted = true;
            populateDisplayWithKeyDown(currentDisplay, 2);
            break;
        case 51:
            numberInserted = true;
            populateDisplayWithKeyDown(currentDisplay, 3);
            break;
        case 52:
            numberInserted = true;
            populateDisplayWithKeyDown(currentDisplay, 4);
            break;
        case 53:
            numberInserted = true;
            populateDisplayWithKeyDown(currentDisplay, 5);
            break;
        case 54:
            numberInserted = true;
            populateDisplayWithKeyDown(currentDisplay, 6);
            break;
        case 55:
            if(!e.shiftKey) {
                numberInserted = true;
                populateDisplayWithKeyDown(currentDisplay, 7);
            }
            else {
                if(isFirstCalculation) {
                    prepareCalculation(undefined, "division");
                }
                else {
                    makeCalculation(undefined, "division");
                }            }
            break;
        case 56:
            numberInserted = true;
            populateDisplayWithKeyDown(currentDisplay, 8);
            break;
        case 57:
            numberInserted = true;
            populateDisplayWithKeyDown(currentDisplay, 9);
            break;
        case 83:
            signalChange(currentDisplay);
            break;
        case 187:
            if(!e.shiftKey) {
                if(isFirstCalculation) {
                    prepareCalculation(undefined, "add");
                }
                else {
                    makeCalculation(undefined, "add");
                }
            }
            else {
                if(isFirstCalculation) {
                    prepareCalculation(undefined, "multiply");
                }
                else {
                    makeCalculation(undefined, "multiply");
                }
            }
            break;
        case 189:
            if(isFirstCalculation) {
                prepareCalculation(undefined, "subtract");
            }
            else {
                makeCalculation(undefined, "subtract");
            }
            break;
        case 190:
            {
                addDecimal(currentDisplay);
                break;
            }
        default:
            break;
    }
}



// // POPULATE "HISTORY BAR" WITH PREVIOUS HISTORY
// function updateHistory(chosenOperator, previousNumber, presentNumber) {
//     switch (chosenOperator) {
//         case "add":
//             if(isFirstCalculation) {
//             }
//             else {
//             }
//             break;
//         case "subtract":
//             if(isFirstCalculation) {
//             }
//             else {
//             }            
//             break;
//         case "division":
//             if(isFirstCalculation) {
//             }
//             else {
//             }
//             break;
//         case "multiply":
//             if(isFirstCalculation) {
//             }
//             else {
//             }
//             break;
//         case "power":
//             if(isFirstCalculation) {
//             }
//             else {
//             }
//             break;
//         default:
//             break;
//     }   
// }


});