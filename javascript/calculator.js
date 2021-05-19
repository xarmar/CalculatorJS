document.addEventListener("DOMContentLoaded", function () {

// QUERY SELECTORS
const MAX_DIGITS = 12;
const buttons = document.querySelectorAll("button");
const history = document.querySelector("#history");
const current = document.querySelector("#current");

const historyArray = [];
history.textContent= "";
current.textContent= "";


// BUTTON EFFECTS
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

function maxDigitRuleRespected(current) {
    let numberSize = current.textContent;
    console.log(numberSize);
    console.log(numberSize.length);
    if (numberSize.length < MAX_DIGITS) {
        return true
    }
    return false
}

// OPERATIONS
function newInput(e) {
    let pressedButton = e.target;
    if (maxDigitRuleRespected(current) || !pressedButton.classList.contains("number")) {
        if (ButtonIsNumber(pressedButton)) {
            if(currentNumberIsZero(current)) {
            current.textContent = pressedButton.outerText;
            }
            else {
                current.textContent += pressedButton.outerText;
            }
        }
        else {
            switch (pressedButton.id) {
                case "back":
                    let presentNumber = current.textContent;
                    let newNumber = presentNumber.slice(0,-1);
                    current.textContent = newNumber;
                    if (newNumber === "") {
                        current.textContent = "0"
                    }
                    break;
                case "clear":
                    history.textContent = "";
                    current.textContent = "";
                    historyArray.splice(0, historyArray.length);
                    break;
                
                case "add":
                    if (!currentIsEmpty(current)) {
                        historyArray.push(current.textContent);
                        historyArray.push("+")
                        history.textContent = historyArray.join(" ");
                        current.textContent = ""; 
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
    
                default:
                    break;
            }

            }
        }
    }
    
});