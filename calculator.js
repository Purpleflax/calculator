let resultsDisplay = document.getElementById("resultsDisplay");
let evaluate = document.getElementById("equals");
let clearDisplay = document.getElementById("clear");
let decimalPoint = document.getElementById("decimal")
let ansDisplayed;
let clickedOperator;
let inputNumOne;
let inputNumTwo;
let currentAns;
let operatorPressed = 0;

function addNum(numOne, numTwo) {
    return(parseInt(numOne) + parseInt(numTwo));
}
function subtractNum(numOne, numTwo) {
    return(parseInt(numOne) - parseInt(numTwo));
}
function divideNum(numOne, numTwo) {
    return(parseInt(numOne) / parseInt(numTwo));
}
function multiplyNum(numOne, numTwo) {
    return(parseInt(numOne) * parseInt(numTwo));
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
            currentAns = operate(inputNumOne, clickedOperator, inputNumTwo);;
            resultsDisplay.innerText = currentAns
            inputNumOne = currentAns;
            inputNumTwo = undefined;
            ansDisplayed = 2;
        } else if (ansDisplayed == 1) {
            inputNumOne = currentAns;
            displayNums("operator");
        } else if (inputNumTwo == undefined) {
            displayNums("operator")
        }
        clickedOperator = event.target.innerHTML;
        return(clickedOperator);
    })
})

evaluate.addEventListener("click", event => {
    currentAns = operate(inputNumOne, clickedOperator, inputNumTwo);;
    resultsDisplay.innerText = currentAns
    ansDisplayed = 1;
})

clearDisplay.addEventListener("click", event => {
    inputNumOne = 0;
    inputNumTwo = 0;
    clickedOperator = undefined;
    displayNums("operator");
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
