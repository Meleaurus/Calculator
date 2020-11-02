const container = document.querySelector("#container");
const keypad = document.querySelector("#keypad");
const display = document.querySelector("#display");

const keys = [
    {id: "DEL", text: "DEL",},
    {id: "CE", text: "CE",},
    {id: "plusMinus", text: "+/-",},
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
    {id: "equal", text: "="},
];

for (let i = 0; i < keys.length; i++) { 
    let btn = document.createElement("button");
    btn.innerHTML = keys[i].text;
    btn.id = keys[i].id;
    if (keys[i].id === "add" || keys[i].id === "subtract" || 
    keys[i].id === "multiply" || keys[i].id === "divide") {
        btn.classList.add("operator");
    } else if (keys[i].id === "CE") {
        btn.classList.add("ce");
    } else if (keys[i].id === "DEL") {
        btn.classList.add("del");
    } else if (keys[i].id === "dec") {
        btn.classList.add("dec");
    } else if (keys[i].id === "plusMinus") {
        btn.classList.add("plusMinus");  
    } else if (keys[i].id === "equal") {
        btn.classList.add("equal");
    } else {
        btn.classList.add("num");
    };
    display.innerHTML = "0";
    keypad.appendChild(btn);
    container.appendChild(keypad);
}; 

keypad.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target;
        const identity = e.target.classList;
        const keyContent = key.innerHTML;
        const displayedNum = display.innerHTML;
        const previousKeyType = container.dataset.previousKeyType;
        if (identity.contains("num")) {
            removePress(Array.from(keypad.children));
            if (displayedNum === "0" || previousKeyType === "operator" || previousKeyType === "calculate") {
                display.innerHTML = keyContent;
            } else {
                display.innerHTML = displayedNum + keyContent;
            } 
            container.dataset.previousKeyType = "number";
        } else if (identity.contains("dec")) {
            removePress(Array.from(keypad.children));
            if (!displayedNum.includes(".")) {
                display.innerHTML = displayedNum + ".";
            } 
            if (previousKeyType === "operator" || previousKeyType === "calculate") { 
                display.innerHTML = "0.";
            }
            container.dataset.previousKeyType = "decimal";
        } else if (identity.contains("ce")) {
            removePress(Array.from(keypad.children));
            display.innerHTML = "0";
            container.dataset.firstValue = "";
            container.dataset.operator = "";
            container.dataset.modValue = "";
            container.dataset.previousKeyType = "clear";
        } else if (identity.contains("del")) {
            removePress(Array.from(keypad.children));
            const arr = Array.from(display.innerHTML);
            arr.pop();
            if (arr.length === 0) {
                display.innerHTML = "0";
            } else {
                display.innerHTML = String(arr.join(""));
            }
            container.dataset.previousKeyType = "delete"
        } else if (identity.contains("operator")) {
            removePress(Array.from(keypad.children));
            key.classList.add("isPressed");
            const firstValue = container.dataset.firstValue;
            const operator = container.dataset.operator;
            const secondValue = displayedNum;
            if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "equal") {
                const calcValue = operate(operator, firstValue, secondValue);
                display.innerHTML = calcValue;
                container.dataset.firstValue = calcValue;
            } else {
                container.dataset.firstValue = displayedNum;
            }
            container.dataset.operator = keyContent;
            container.dataset.previousKeyType = "operator";
        } else if (identity.contains("equal")) {
            removePress(Array.from(keypad.children));
            let firstValue = container.dataset.firstValue;
            const operator = container.dataset.operator;
            let secondValue = displayedNum;
            if (firstValue) {
                if (previousKeyType === "equal") {
                    firstValue = displayedNum;
                    secondValue = container.dataset.modValue;
                }
                display.innerHTML = operate(operator, firstValue, secondValue);
                container.dataset.modValue = secondValue;
            }
            container.dataset.previousKeyType = "equal";
            console.log(firstValue)
            console.log(operator)
            console.log(secondValue)
        }
    }
});

removePress = (ele) => {
    ele.forEach(k => k.classList.remove("isPressed"));
} 

operate = (operator, a, b) => {
    if (operator == "+") {
        return parseFloat(a) + parseFloat(b);
    }
    if (operator == "-") {
        return parseFloat(a) - parseFloat(b);
    } 
    if (operator == "*") {
        return parseFloat(a) * parseFloat(b);
    } 
    if (operator == "/") {
        if (b === "0") {
            return ("ERROR");
        }
        return parseFloat(a) / parseFloat(b);
    } 
};
