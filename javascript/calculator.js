document.addEventListener("DOMContentLoaded", function () {

// QUERY SELECTORS
const buttons = document.querySelectorAll("button");
const history = document.querySelector("#history");
const current = document.querySelector("#current");

// Define Consts
const MAX_DIGITS = 12;
const historyArray = [];

// Reset Calculator
clearEverything(history, current, historyArray);

// Button Listener and button CSS effects
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
let presentNumber;
let previousNumber;
let currentResult;

// New User Input (Click or Keyboard)
function newInput(e) {
    let pressedButton = e.target;
    // If it's a Number
    if (maxDigitRuleRespected(current) || !pressedButton.classList.contains("number")) {
        if (ButtonIsNumber(pressedButton)) {
            if(currentNumberIsZero(current)) {
            current.textContent = pressedButton.outerText;
            }
            else if(!currentNumberIsZero(current) && !isFirstCalculation) {
                if(firstNumberAfterOperation) {
                    current.textContent = pressedButton.outerText;
                    toggleFirstNumberAfterOperation();
                }
                else {
                    current.textContent += pressedButton.outerText;
                }
            }
            else {
                current.textContent += pressedButton.outerText;
            }
        }
        // If it's an Operation
        else {
            switch (pressedButton.id) {
                case "back":
                    presentNumber = current.textContent;
                    backspace(presentNumber, current);
                    break;
                case "clear":
                    clearEverything(history, current, historyArray)
                    break;
                case "add":
                    FirstNumberAfterOperation(true);
                    if (!currentIsEmpty(current)) {
                        presentNumber = current.textContent;
                        if (isFirstCalculation) {
                        }    
                    }
                    break;
                case "subtract":
                    break;
                case "division":
                    break;
                case "multiply":
                    break;
                case "power":
                    break;
                case "equals":      
                    break;
                case "signalChange":
                    if (!currentIsEmpty(current)) {
                        let presentNumber = current.textContent;
                        let inverseNumber = presentNumber * (-1);
                        current.textContent = inverseNumber;    
                    }           
                       break;
                case "decimal":
                    if (currentIsEmpty(current) || currentNumberIsZero(current)) {
                        current.textContent = "0."
                    }
                    else if(!currentIsEmpty(current) && !alreadyContainsDecimal(current)) {
                        current.textContent += "."
                    }
                        break;    
                    default:
                    break;
            }

            }
        }
    }

// FUNCTIONS FOR OPERATIONS AND C/CE BUTTONS
function add(previousNumber, numberToAdd){
    return parseFloat(previousNumber) + parseFloat(numberToAdd);
}

function subtract(previousNumber, numberToSubtract){
    return previousNumber - numberToSubtract;
}

function multiply(previousNumber, multiplier){
    return previousNumber * multiplier;
}

function division(previousNumber, divider){
    return previousNumber / divider;
}

function power(previousNumber, power){
    return Math.pow(previousNumber,power) ;
}

function clearEverything(history, current, historyArray) {
    var firstNumberAfterOperation = true;
    history.textContent = "";
    current.textContent = "";
    historyArray.splice(0, historyArray.length);
    isFirstCalculation = true;
}

function backspace(presentNumber, current) {
    let newNumber = presentNumber.slice(0,-1);
    current.textContent = newNumber;
    if (currentIsEmpty(current)) {
        current.textContent = "0"
    }
}

// POPULATE "HISTORY BAR" WITH PREVIOUS HISTORY
function updateHistory(pressedbuttonId, historyArray, current, presentNumber){
    if (isFirstCalculation) {
        historyArray.push(current.textContent);
    }
    else {
        historyArray.push(presentNumber); 
    }
    switch (pressedbuttonId) {
        case "add":
            historyArray.push("+");
            history.textContent = historyArray.join(" ");
            break;
        case "subtract":
            historyArray.push("-");
            history.textContent = historyArray.join(" ");
            break;
        case "division":
            historyArray.push("/");
            history.textContent = historyArray.join(" ");
            break;
        case "multiply":
            historyArray.push("*");
            history.textContent = historyArray.join(" ");
            break;
        case "power":
            historyArray.push("^");
            history.textContent = historyArray.join(" ");
            break;
        default:
            break;
    }   
}

// BOOLEAN VALIDATORS
function ButtonIsNumber(pressedButton) {
    if (pressedButton.classList.contains("number")) {
       return true
   }
   return false
}

function currentNumberIsZero(current) {
    if (current.textContent === "0") {
        return true 
    }
    return false;
}

function currentIsEmpty(current) {
    if (current.textContent === "") {
        return true 
    }
    return false;    
}

function alreadyContainsDecimal(current) {;
    let presentNumber = current.textContent;
    for (i = 0; i < presentNumber.length; i++) {
        if (presentNumber[i] === ".") {
        return true
        }
    }
    return false;
}

function maxDigitRuleRespected(current) {
    let numberSize = current.textContent;
    if (numberSize.length < MAX_DIGITS) {
        return true
    }
    return false
}

// TOGGLERS "true" & "false" for BOOLEANS
function toggleIsFirstCalculation() {
    if(isFirstCalculation) {
        isFirstCalculation = false;
    }
    else {
        isFirstCalculation = true;
    }
}

let firstNumberAfterOperation = true;
function FirstNumberAfterOperation(booleanOption){
   firstNumberAfterOperation = booleanOption;
}
    
});