
document.addEventListener("DOMContentLoaded", function () {

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", input);
});

function input () {
    console.log("buttonw was clicked")
}

})