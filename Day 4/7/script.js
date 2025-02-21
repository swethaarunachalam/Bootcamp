let display = document.getElementById("display");

function appendToDisplay(value) {
    display.value += value;
}

function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = "Error";
    }
}

function clearDisplay() {
    display.value = "";
}
