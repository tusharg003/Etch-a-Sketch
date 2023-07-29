const input = document.querySelector("input");
const setSize = document.querySelector("#setSize");
const reset = document.querySelector("#reset");
const setColor = document.querySelector("#setColor");
const eraser = document.querySelector("#eraser");
const random = document.querySelector("#random");
const grid = document.querySelector("#grid");
const message = document.querySelector("p");
const colorPicker = document.querySelector("#colorPicker");

let size = 16;
let color = "#000000";
let generateRandomColor = false;
function colorChoice() {
    if (generateRandomColor == true) {
        this.style.backgroundColor = `hsl(${Math.random() * 360},100%,50%)`;
        // generateRandomColor = false;
    } else {
        this.style.backgroundColor = color;
    }
}
function initialBoard() {
    let isDragging = false; // Flag to indicate dragging state
    grid.style.gridTemplateColumns = `repeat(${size},1fr)`;
    grid.style.gridTemplateRows = `repeat(${size},1fr)`;
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        // cell.textContent = `${i % 10}`;
        cell.addEventListener("mouseover", colorChoice);
        //for click and drag change the abv to click
        // cell.addEventListener("mouseover", () => {
        //     if (isDragging)
        //         cell.style.backgroundColor = color;
        // })
        // cell.addEventListener("mousedown", () => {
        //     isDragging = true;
        // })
        // cell.addEventListener("mouseup", () => {
        //     isDragging = false;
        // })

        grid.appendChild(cell);
    }
}

function setBoard() {
    let val = input.value;
    if (val > 0 && val < 101) {
        message.textContent = ` Grid ${val} X ${val}`
        size = val;
    }
    else {
        message.textContent = "Enter a number between 1 and 100!"
    }
    const squares = document.querySelectorAll(".cell");
    squares.forEach(cell => cell.remove());

    initialBoard();
}

function resetBoard() {
    const squares = document.querySelectorAll(".cell");
    squares.forEach(cell => cell.remove());
    initialBoard();
}

function setcolor() {
    generateRandomColor = false;
    eraser.classList.remove("pressed");
    random.classList.remove("pressed");

    colorPicker.addEventListener("change", (e) => {
        color = e.target.value;
    })
}
function erase() {
    generateRandomColor = false;
    color = "#FFFFFF";
    eraser.classList.add("pressed");
    random.classList.remove("pressed");

    // eraser.classList.toggle("btn btn-warning")
}
function randomColor() {
    generateRandomColor = true;
    random.classList.add("pressed");
    eraser.classList.remove("pressed");


}
initialBoard();
setSize.addEventListener('click', setBoard);
reset.addEventListener('click', resetBoard);
setColor.addEventListener('click', setcolor)
eraser.addEventListener('click', erase)
random.addEventListener('click', randomColor)

