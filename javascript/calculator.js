document.addEventListener("DOMContentLoaded", function () {

const MAX_DIGITS = 12;
let isFirstCalculation = true;

// QUERY SELECTORS
const buttons = document.querySelectorAll("button");
const history = document.querySelector("#history");
const current = document.querySelector("#current");
const historyArray = [];
let previousNumber;
clearEverything(history, current, historyArray);

// FUNCTIONS FOR OPERATIONS
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

// BUTTON LISTENER
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

// BOOLEAN VALIDATIONS
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
    let currentNumber = current.textContent;
    for (i = 0; i < currentNumber.length; i++) {
        if (currentNumber[i] === ".") {
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

function clearEverything(history, current, historyArray) {
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

function toggleIsFirstCalculation() {
    if(isFirstCalculation) {
        isFirstCalculation = false;
    }
    else {
        isFirstCalculation = true;
    }
}

// NEW USER INPUT
function newInput(e) {
    let pressedButton = e.target;
    // IF IT'S A NUMBER
    if (maxDigitRuleRespected(current) || !pressedButton.classList.contains("number")) {
        if (ButtonIsNumber(pressedButton)) {
            if(currentNumberIsZero(current)) {
            current.textContent = pressedButton.outerText;
            }
            else {
                current.textContent += pressedButton.outerText;
            }
        }
        // IF IT'S AN 'OPERATION' BUTTON
        else {
            switch (pressedButton.id) {
                case "back":
                    let presentNumber = current.textContent;
                    backspace(presentNumber, current);
                    break;
                case "clear":
                    clearEverything(history, current, historyArray)
                    break;
                case "add":
                    if (!currentIsEmpty(current)) {
                        let currentNumber = current.textContent;
                        if (isFirstCalculation) {
                            toggleIsFirstCalculation();
                            historyArray.push(current.textContent);
                            historyArray.push("+");
                            history.textContent = historyArray.join(" ");
                            previousNumber = current.textContent;
                            current.textContent = ""; 
                            }
                        else {
                            current.textContent = "";
                            historyArray.push(currentNumber); 
                            historyArray.push("+");
                            history.textContent = historyArray.join(" ");
                            let addition = add(previousNumber, currentNumber);
                            current.textContent = `${addition}`;
                            previousNumber = current.textContent;
                        }
                    }        
                    break;
                case "subtract":
                    if (!currentIsEmpty(current)) {
                        historyArray.push(current.textContent);
                        historyArray.push("-")
                        history.textContent = historyArray.join(" ");
                        current.textContent = "";
                    }            
                    break;
                case "division":
                    if (!currentIsEmpty(current)) {
                        historyArray.push(current.textContent);
                        historyArray.push("/")
                        history.textContent = historyArray.join(" ");
                        current.textContent = "";
                    }             
                    break;
                case "multiply":
                    if (!currentIsEmpty(current)) {
                        historyArray.push(current.textContent);
                        historyArray.push("*")
                        history.textContent = historyArray.join(" ");
                        current.textContent = "";
                    }           
                    break;
                case "power":
                   if (!currentIsEmpty(current)) {
                        historyArray.push(current.textContent);
                        historyArray.push("^")
                        history.textContent = historyArray.join(" ");
                        current.textContent = "";
                   }           
                   break;
                case "equals":
                 if (!currentIsEmpty(current)) {
                        historyArray.push(current.textContent);
                        historyArray.push("=")
                        history.textContent = historyArray.join(" ");
                        current.textContent = "";
                 }           
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
                        console.log(current.textContent);
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


    
});