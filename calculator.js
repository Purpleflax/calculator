function operate(firstNum, operator, secondNum) {
    let result = 0;
    switch(operator) {
        case "+":
            result = addNum(firstNum, secondNum);
            break;
        case "-":
            result = subtractNum(firstNum, secondNum);
            break;
        case "/":
            result = divideNum(firstNum, secondNum);
            break;
        case "*":
            result = multiplyNum(firstNum, secondNum);
            break;
        default:
            result = addNum(firstNum, secondNum);
            break;
    }
    return(result);
}

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