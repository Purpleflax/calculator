let resultsDisplay = document.getElementById("resultsDisplay");
let evaluate = document.getElementById("equals");
let clearDisplay = document.getElementById("clear");
let decimalPoint = document.getElementById("decimal");
let plusOrMinus = document.getElementById("plusOrMinus");
let percentSign = document.getElementById("percent");
let decimalPresent = 0;
let percentOccurance = 0;
let ansDisplayed;
let clickedOperator = undefined;
let inputNumOne = undefined;
let inputNumTwo = undefined;
let currentAns = undefined;
let operatorPressed = 0;

function addNum(numOne, numTwo) {
    return(parseFloat(numOne) + parseFloat(numTwo));
};
function subtractNum(numOne, numTwo) {
    return(parseFloat(numOne) - parseFloat(numTwo));
};
function divideNum(numOne, numTwo) {
    return(parseFloat(numOne) / parseFloat(numTwo));
};
function multiplyNum(numOne, numTwo) {
    return(parseFloat(numOne) * parseFloat(numTwo));
};

document.querySelectorAll(".operatorButton").forEach(item => {
    item.addEventListener("click", handleOperatorPress);
})
document.querySelectorAll(".intButton").forEach(item => {
    item.addEventListener("click", handleIntegerPress);
}) 
evaluate.addEventListener("click", evaluateItems);
clearDisplay.addEventListener("click", emptyDisplay);
percentSign.addEventListener("click", toPercent);
decimalPoint.addEventListener("click", decimalFunction); 
plusOrMinus.addEventListener("click", changeSign); 
document.addEventListener("keydown", event => {
    console.log(event.key);
    if (!isNaN(event.key)) {
        if (event.key != 0) {document.getElementById(event.key).click();}
        else {document.getElementById("zero").click();}
    };
    if (event.key == "Enter") {
        evaluateItems();
    };
    if (event.key == "+") {
        handleOperatorPress();
        clickedOperator = "+";
    }
    if (event.key == "*") {
        handleOperatorPress();
        clickedOperator = "x";
    }
    if (event.key == "/") {
        event.preventDefault();
        handleOperatorPress();
        clickedOperator = "÷";
    }
    if (event.key == "-") {
        handleOperatorPress();
        clickedOperator = "-";
    }
    if (event.key == "%") {
        toPercent();
    }
    if (event.key == ".") {
        decimalFunction();
    }
    if (event.key == "Backspace") {
        emptyDisplay();
    }
});

function displayNums(numberToDisplay) {
    if (numberToDisplay != "operator" && resultsDisplay.innerHTML == "0") {
        resultsDisplay.innerText = "";
        resultsDisplay.innerText += numberToDisplay;
        ansDisplayed = 0;
    } else if (ansDisplayed == 1 && numberToDisplay != "operator") {
        resultsDisplay.innerText = "";
        resultsDisplay.innerText += numberToDisplay;
        ansDisplayed = 0;
        clickedOperator = undefined;
    } else if (ansDisplayed == 2 && numberToDisplay != "operator") {
        resultsDisplay.innerText = "";
        resultsDisplay.innerText += numberToDisplay;
        ansDisplayed = 0;
    } else if (numberToDisplay != "operator" ) {
        resultsDisplay.innerText += numberToDisplay;
    } else {
        resultsDisplay.innerText = "0";
        decimalPresent = 0;
    }
};

function handleIntegerPress() {
    let clickedNum = event.target.innerHTML;
    displayNums(clickedNum);
    if (resultsDisplay.innerText != 0 && clickedOperator == undefined)  {
        inputNumOne = resultsDisplay.innerText;
    } else {
        inputNumTwo = resultsDisplay.innerText;
    }
};


function handleOperatorPress() {
    if (inputNumTwo != undefined) {
        currentAns = operate(inputNumOne, clickedOperator, inputNumTwo);
        resultsDisplay.innerText = Math.round((currentAns + Number.EPSILON) * 10000) / 10000;
        inputNumOne = currentAns;
        inputNumTwo = undefined;
        decimalPresent = 0;
        ansDisplayed = 2;
    } else if (inputNumOne != undefined) {
        displayNums("operator");
    } else if (ansDisplayed == 1) {
        inputNumOne = currentAns;
        displayNums("operator");
    } else if (ansDisplayed == 1) {
        currentAns = currentAns * -1;
        inputNumOne = currentAns;
        displayNums("operator");
    }
    clickedOperator = event.target.innerHTML;
    return(clickedOperator);
};

function evaluateItems() {
    if (inputNumTwo != undefined) {
        currentAns = operate(inputNumOne, clickedOperator, inputNumTwo);
        resultsDisplay.innerText = Math.round((currentAns + Number.EPSILON) * 10000) / 10000;
        ansDisplayed = 1;
        inputNumOne = undefined;
        inputNumTwo = undefined;
    } else if (currentAns != undefined) {
        resultsDisplay.innerText = currentAns;
    } else if (inputNumOne == undefined && inputNumTwo == undefined && currentAns == undefined) {
        resultsDisplay.innerText = "0";
    } else {
        resultsDisplay.innerText = inputNumOne;
    }
};

function emptyDisplay() {
    inputNumOne = undefined;
    inputNumTwo = undefined;
    currentAns = undefined;
    decimalPresent = 0;
    clickedOperator = undefined;
    displayNums("operator");
};

function decimalFunction() {
    if (decimalPresent != 1) {
        if (resultsDisplay.innerText == 0) {
            displayNums("0.");
        } else {
            displayNums(".");
        }
    }
    decimalPresent = 1;
};

function changeSign() {
    if (inputNumTwo == undefined && clickedOperator == undefined) {
        inputNumOne = inputNumOne - (inputNumOne * 2);
    } else if (inputNumOne != undefined && clickedOperator != undefined) {
        inputNumTwo = inputNumTwo - (inputNumTwo * 2);
    } else {
        currentAns = currentAns - (currentAns * 2);
    }
    resultsDisplay.innerText = parseFloat(resultsDisplay.innerText) * -1;
};

function toPercent() {
    if (inputNumTwo == undefined && clickedOperator == undefined) {
        inputNumOne = inputNumOne / 100;
    } else if (inputNumOne != undefined && clickedOperator != undefined) {
        inputNumTwo = inputNumTwo / 100;
    } else {
        currentAns = currentAns / 100;
    }
    resultsDisplay.innerText = parseFloat(resultsDisplay.innerText) / 100;
};


function operate(firstNum, operator, secondNum) {
    let result = 0;
    switch(operator) {
        case "+":
            result = addNum(firstNum, secondNum);
            break;
        case "-":
            result = subtractNum(firstNum, secondNum);
            break;
        case "÷":
            result = divideNum(firstNum, secondNum);
            break;
        case "x":
            result = multiplyNum(firstNum, secondNum);
            break;
        default:
            result = addNum(firstNum, secondNum);
            break;
    }
    return(result);
};
