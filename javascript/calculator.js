
document.addEventListener("DOMContentLoaded", function () {

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", increaseOnClick);
    button.addEventListener("click", newInput)
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

function newInput(e) {
    let id = e.target.id;
    switch (id) {
        case zero:

            break;  
        case one:
            
            break;
        case two:
            
            break;
        case three:
            
            break;
        case four:
            
            break;
        case five:
            
            break;
        case six:
            
            break;
        case seven:
            
            break;
        case eight:
            
            break;
        case nine:
            
            break;
        case signChange:
            
            break;
        case decimal:
            
            break;
        case equals:
            
            break;
        case add:
            
            break;
        case subtract:
            
            break;
        case multiply:
            
            break;
        case division:
            
            break;
        case power:
            
            break;
        case backspace:
            
            break;
        case clear:
            
            break;
        default:
            break;
    }
    
}



})