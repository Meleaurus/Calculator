const calc = document.querySelector("#calc");

numbers = [1, 2, 3, 4, 5];



add = (a, b) => {
    return a + b;
};

subtract = (a, b) => {
    return a - b;
};

multiply = (a, b) => {
    return a * b;
};

divide = (a, b) => {
    return a / b;
};

operate = (operator, a, b) => {
    str = operator.toLowerCase();
    if (str == "add") {
        return add(a , b);
    } else if (str == "subtract") {
        return subtract(a, b);
    } else if (str == "multiply") {
        return multiply(a, b);
    } else if (str == "divide") {
        return divide(a, b);
    } else {
        return alert("Please type in a valid operator.")
    }
};

console.log(operate("divide", 20, 2));