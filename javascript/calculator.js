
document.addEventListener("DOMContentLoaded", function () {

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
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

})