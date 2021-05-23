document.addEventListener("DOMContentLoaded", function () {

// QUERY SELECTORS
const buttons = document.querySelectorAll("button");
const historyDisplay = document.querySelector("#historyDisplay");
const currentDisplay = document.querySelector("#currentDisplay");

// Define Consts
const MAX_DIGITS = 12;
const historyArray = [];

// Reset Calculator
clearEverything(historyDisplay, currentDisplay, historyArray);

// Button Listener
buttons.forEach(button => {
    button.addEventListener("click", newInput)
    button.addEventListener("click", increaseOnClick);
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
var isFirstCalculation = true;
var isFirstNumberAfterCalculation;
let operationPreview;
let chosenOperator;
let previousNumber;

// New User Input (Click or Keyboard)
function newInput(e) {
    let pressedButton = e.target;
    if (maxDigitRuleRespected(currentDisplay) || !pressedButton.classList.contains("number")) {
        // If it's a number
        if (buttonIsNumber(pressedButton)) {
            populateDisplayWithButton(currentDisplay, pressedButton);
        }
        // If it's an Operation
        else {
            switch (pressedButton.id) {
                case "back":
                    backspace(currentDisplay);
                    break;
                case "clear":
                    clearEverything(historyDisplay, currentDisplay, historyArray, operationPreview)
                    break;
                case "add":
                    if(isFirstCalculation) {
                        previousNumber = currentDisplay.textContent;
                        ifFirstOperationClearDisplay();
                        chosenOperator = "add";
                        isFirstCalculation  = false;
                    }
                    else {
                        // updates display with result
                        presentNumber = currentDisplay.textContent;
                        let result = operate(chosenOperator, previousNumber, presentNumber);
                        console.log(result);
                        previousNumber = result;
                        updateDisplay(result);
                        isFirstNumberAfterCalculation = true;
                    }
                    break;
                case "subtract":
                    previousNumber = currentDisplay.textContent;
                    ifFirstOperationClearDisplay();
                    chosenOperator = "subtract";
                    break;
                case "division":
                    previousNumber = currentDisplay.textContent;
                    ifFirstOperationClearDisplay();
                    chosenOperator = "division";
                    break;
                case "multiply":
                    previousNumber = currentDisplay.textContent;
                    ifFirstOperationClearDisplay();
                    chosenOperator = "multiply";
                    break;
                case "power":
                    previousNumber = currentDisplay.textContent;
                    ifFirstOperationClearDisplay();
                    chosenOperator = "power";
                    break;
                case "equals":
                    // prevents user from clicking "=" multiple times
                    if (chosenOperator === "") {
                        return;
                    }
                    // updates display with result
                    presentNumber = currentDisplay.textContent;
                    let result = operate(chosenOperator, previousNumber, presentNumber);
                    updateDisplay(result);
                    // sets chosenOperator to "" and isFirstCalculation to true
                    resetIsFirstCalculation();
                    resetChosenOperator();
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



// FUNCTIONS FOR CALCULATIONS AND DIPLAYING RESULTS
let updateDisplay = (displayValue) => currentDisplay.textContent = `${displayValue}`;
let add = (previousNumber, numberToAdd) => parseFloat(previousNumber) + parseFloat(numberToAdd);
let subtract = (previousNumber, numberToSubtract) =>  parseFloat(previousNumber) - parseFloat(numberToSubtract);
let multiply = (previousNumber, multiplier) =>  parseFloat(previousNumber) * parseFloat(multiplier);
let power = (previousNumber, power) => Math.pow(previousNumber,power);
function division (previousNumber, divider) {
    if (divider != 0) {
        return parseFloat(previousNumber) / parseFloat(divider);
    }
}

// OPERATOR FUNCTION - MAKES ALL THE OPERATIONS WITH NUMBERS
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

// FUNCTIONS FOR CLEARING DISPLAY AND CALCULATOR
let clearCurrentDisplay = () => currentDisplay.textContent = "";

function clearEverything(history, currentDisplay, historyArray, operationPreview) {
    isFirstCalculation = true;
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
    let presentNumber = currentDisplay.textContent;
    let inverseNumber = presentNumber * (-1);
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
    else if(!currentNumberIsZero(currentDisplay) && !isFirstCalculation && isFirstNumberAfterCalculation === true) {
        updateDisplay(pressedButton.outerText);
        isFirstNumberAfterCalculation = false;
    }
    else {
        currentDisplay.textContent += pressedButton.outerText;
        }
}

// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
// // POPULATE "HISTORY BAR" WITH PREVIOUS HISTORY
// function updateHistory(pressedbuttonId, historyArray, previousNumber){

//     historyArray.push(previousNumber); 
    
//     switch (pressedbuttonId) {
//         case "add":
//             historyArray.push("+");
//             historyDisplay.textContent = historyArray.join(" ");
//             break;
//         case "subtract":
//             historyArray.push("-");
//             historyDisplay.textContent = historyArray.join(" ");
//             break;
//         case "division":
//             historyArray.push("/");
//             historyDisplay.textContent = historyArray.join(" ");
//             break;
//         case "multiply":
//             historyArray.push("*");
//             historyDisplay.textContent = historyArray.join(" ");
//             break;
//         case "power":
//             historyArray.push("^");
//             historyDisplay.textContent = historyArray.join(" ");
//             break;
//         default:
//             break;
//     }   
// }


// BOOLEAN VALIDATIONS
let ifFirstOperationClearDisplay = () => isFirstCalculation ? clearCurrentDisplay() : 1;
let buttonIsNumber = (pressedButton) => (pressedButton.classList.contains("number")) ? true : false;
let currentNumberIsZero = (currentDisplay) => (currentDisplay.textContent === "0") ? true : false;
let currentDisplayIsEmpty = (currentDisplay) => (currentDisplay.textContent === "") ? true : false;
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
// document.addEventListener("keyup", keyboardSupport);

// function keyboardSupport(e) {
//     switch (e.keyCode) {
//         case 48:
//             populateDisplayWithKeyDown(currentDisplay, 0);
//             break;
//         case 49:
//             populateDisplayWithKeyDown(currentDisplay, 1);
//             break;
//         case 50:
//             populateDisplayWithKeyDown(currentDisplay, 2);
//             break;
//         case 51:
//             populateDisplayWithKeyDown(currentDisplay, 3);
//             break;
//         case 52:
//             populateDisplayWithKeyDown(currentDisplay, 4);
//             break;
//         case 53:
//             populateDisplayWithKeyDown(currentDisplay, 5);
//             break;
//         case 54:
//             populateDisplayWithKeyDown(currentDisplay, 6);
//             break;
//         case 55:
//             populateDisplayWithKeyDown(currentDisplay, 7);
//             break;
//         case 56:
//             populateDisplayWithKeyDown(currentDisplay, 8);
//             break;
//         case 57:
//             populateDisplayWithKeyDown(currentDisplay, 9);
//             break;
//         default:
//             break;
//     }
// }


});