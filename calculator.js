let resultsDisplay = document.getElementById("resultsDisplay");
let evaluate = document.getElementById("equals");
let clearDisplay = document.getElementById("clear");
let decimalPoint = document.getElementById("decimal");
let plusOrMinus = document.getElementById("plusOrMinus");
let percentSign = document.getElementById("percent");
let decimalPresent = 0;
let switchedSign = 0;
let percentOccurance = 0;
let ansDisplayed;
let clickedOperator;
let inputNumOne;
let inputNumTwo;
let currentAns;
let operatorPressed = 0;

function addNum(numOne, numTwo) {
    return(parseFloat(numOne) + parseFloat(numTwo));
}
function subtractNum(numOne, numTwo) {
    return(parseFloat(numOne) - parseFloat(numTwo));
}
function divideNum(numOne, numTwo) {
    return(parseFloat(numOne) / parseFloat(numTwo));
}
function multiplyNum(numOne, numTwo) {
    return(parseFloat(numOne) * parseFloat(numTwo));
}

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
    } else if (numberToDisplay != "operator") {
        resultsDisplay.innerText += numberToDisplay;
    } else {
        resultsDisplay.innerText = "0";
        decimalPresent = 0;
    }
}

document.querySelectorAll(".intButton").forEach(item => {
    item.addEventListener("click", event => {
        let clickedNum = event.target.innerHTML
        displayNums(clickedNum);
        if (resultsDisplay.innerText != 0 && clickedOperator == undefined)  {
            inputNumOne = resultsDisplay.innerText;
        } else {
            inputNumTwo = resultsDisplay.innerText;
        }
    })
})

document.querySelectorAll(".operatorButton").forEach(item => {
    item.addEventListener("click", event => {
        if (inputNumTwo != undefined) {
            if (switchedSign == 0 && percentOccurance == 0) {
                currentAns = operate(inputNumOne, clickedOperator, inputNumTwo);
                resultsDisplay.innerText = Math.round((currentAns + Number.EPSILON) * 10000) / 10000;
                inputNumOne = currentAns;
                inputNumTwo = undefined;
                decimalPresent = 0;
                ansDisplayed = 2;
            } else if (switchedSign == 1) {
                currentAns = (operate(inputNumOne, clickedOperator, inputNumTwo)) * -1;
                resultsDisplay.innerText = Math.round((currentAns + Number.EPSILON) * 10000) / 10000;
                inputNumOne = currentAns;
                inputNumTwo = undefined;
                decimalPresent = 0;
                switchedSign = 0;
                ansDisplayed = 2;
            } else if (percentOccurance == 1) {
                currentAns = (operate(inputNumOne, clickedOperator, inputNumTwo)) / 100;
                resultsDisplay.innerText = Math.round((currentAns + Number.EPSILON) * 10000) / 10000;
                inputNumOne = currentAns;
                inputNumTwo = undefined;
                decimalPresent = 0;
                percentOccurance = 0;
                ansDisplayed = 2;
            }
        } else if (ansDisplayed == 1 && switchedSign == 0) {
            inputNumOne = currentAns;
            displayNums("operator");
        } else if (ansDisplayed == 1 && switchedSign == 1) {
            currentAns = currentAns * -1;
            inputNumOne = currentAns;
            switchedSign = 0;
            displayNums("operator");
        }
        clickedOperator = event.target.innerHTML;
        return(clickedOperator);
    })
})

evaluate.addEventListener("click", event => {
    if (switchedSign == 0 && percentOccurance == 0) {
        currentAns = operate(inputNumOne, clickedOperator, inputNumTwo);
        resultsDisplay.innerText = Math.round((currentAns + Number.EPSILON) * 10000) / 10000;
        ansDisplayed = 1;
        inputNumOne = undefined;
        inputNumTwo = undefined;
    } else if (switchedSign == 1) {
        currentAns = (operate(inputNumOne, clickedOperator, inputNumTwo)) * -1;
        resultsDisplay.innerText = Math.round((currentAns + Number.EPSILON) * 10000) / 10000;
        ansDisplayed = 1;
        switchedSign = 0;
        inputNumOne = undefined;
        inputNumTwo = undefined;
    } else if (percentOccurance == 1) {
        currentAns = (operate(inputNumOne, clickedOperator, inputNumTwo)) / 100;
        resultsDisplay.innerText = Math.round((currentAns + Number.EPSILON) * 10000) / 10000;
        ansDisplayed = 1;
        percentOccurance = 0;
        inputNumOne = undefined;
        inputNumTwo = undefined;
    }
})

clearDisplay.addEventListener("click", event => {
    inputNumOne = 0;
    inputNumTwo = 0;
    decimalPresent = 0;
    clickedOperator = undefined;
    displayNums("operator");
})

decimalPoint.addEventListener("click", event => {
    if (decimalPresent != 1) {
        if (resultsDisplay.innerText == 0) {
            displayNums("0.")
        } else {
            displayNums(".");
        }
    }
    decimalPresent = 1;
})

plusOrMinus.addEventListener("click", event => {
    switchedSign = 1;
    resultsDisplay.innerText = parseFloat(resultsDisplay.innerText) * -1;
})

percentSign.addEventListener("click", event => {
    percentOccurance = 1;
    resultsDisplay.innerText = parseFloat(resultsDisplay.innerText) / 100;
})


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
}
