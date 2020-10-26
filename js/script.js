const container = document.querySelector("#container");
const keypad = document.querySelector("#keypad");
const display = document.querySelector("#display");
let operation = "";
let operationSelected = "False";
let current = [];

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
    } else if (keys[i].id === "CE") {
        btn.classList.add("clear")
    } else {
        btn.classList.add("num");
    };
    keypad.appendChild(btn);
    container.appendChild(keypad);
}; 

screen = (text) => {
    operationSelected = "False";
    display.innerHTML = text;
};

addEvent = (btn) => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("num")) {
            screen(display.innerHTML + btn.innerHTML);
        } else if (btn.classList.contains("operator")) {
            if (operationSelected === "True") {
                screen(operate(operation, current[0], display.innerHTML));
            }
            operation = btn.id; 
            operationSelected = "True";
            current.push(display.innerHTML); 
            console.log(current);
            display.innerHTML = "";
        } else if (btn.classList.contains("clear")) {
            display.innerHTML = "";
            current = [];
        }
    });
};

numbers = document.querySelectorAll(".num").forEach(addEvent);
operators = document.querySelectorAll(".operator").forEach(addEvent);
clearEntry = document.querySelectorAll(".clear").forEach(addEvent);

let equals = document.createElement("button");
equals.innerHTML = "=";
equals.id = "equals";
keypad.appendChild(equals);
equals.addEventListener("click", () => {
    screen(operate(operation, current, current));
});

operate = (str, a, b) => {
    a = parseInt(a);
    b = parseInt(b);
    if (str == "add") {
        return a + b;
    } else if (str == "subtract") {
        return a - b;
    } else if (str == "multiply") {
        return a * b;
    } else if (str == "divide") {
        return a / b;
    } 
};
