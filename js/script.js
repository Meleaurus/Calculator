const container = document.querySelector("#container");
const keypad = document.querySelector("#keypad");
const display = document.querySelector("#display");
let value = 0;
let operation = "";

const keys = [
    {id: "DEL", text: "DEL",},
    {id: "CE", text: "CE",},
    {id: "sign", text: "+/-",},
    {id: "divide", text: "/",},
    {id: "seven", text: "7",},
    {id: "eight", text: "8",},
    {id: "nine", text: "9",},
    {id: "multiply", text: "*",},
    {id: "four", text: "4",},
    {id: "five", text: "5",},
    {id: "six", text: "6",},
    {id: "subtract", text: "-",},
    {id: "one", text: "1",},
    {id: "two", text: "2",},
    {id: "three", text: "3",},
    {id: "add", text: "+",},
    {id: "zero", text: "0"},
    {id: "dec", text: "."},
];

for (let i = 0; i < keys.length; i++) { 
    let btn = document.createElement("button");
    btn.innerHTML = keys[i].text;
    btn.id = keys[i].id;
    if (keys[i].id === "add" || keys[i].id === "subtract" || 
    keys[i].id === "multiply" || keys[i].id === "divide") {
        btn.classList.add("operator");
    } else {
        btn.classList.add("num");
    };
    keypad.appendChild(btn);
    container.appendChild(keypad);
}; 

screen = (text) => {
    display.innerHTML = text;
};

addEvent = (btn) => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("num")) {
        value = btn.innerHTML;
        screen(value);
        console.log(value);
        } else if (btn.classList.contains("operator")) {
            operation = btn.id;
            console.log(operation);
        };
    });
};

numbers = document.querySelectorAll(".num");
numbers.forEach(addEvent);

operators = document.querySelectorAll(".operator");
operators.forEach(addEvent);

let equals = document.createElement("button");
equals.innerHTML = "=";
equals.id = "equals";
keypad.appendChild(equals);

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