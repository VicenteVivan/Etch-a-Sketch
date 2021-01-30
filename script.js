function $(id) {
    return document.getElementById(id);
}

//Post-Used Variables
let cells = [];
let mainColor = "white";
let clickErase = 1;

//Colors Sub-Section
(function colorList() {
    let colorPalette = $("colors");
    let colors = [
        "#1abc9c",
        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#34495e",
        "#16a085",
        "#27ae60",
        "#2980b9",
        "#8e44ad",
        "#2c3e50",
        "#f1c40f",
        "#e67e22",
        "#e74c3c",
        "#ecf0f1",
        "#95a5a6",
        "#f39c12",
        "#d35400",
        "#c0392b",
        "#bdc3c7",
        "#7f8c8d",
    ];
    colors.forEach((element) => {
        let newColor = document.createElement("div");
        newColor.style.backgroundColor = element;
        newColor.classList.add("color");
        colorPalette.appendChild(newColor);
    });

    let allColors = document.querySelectorAll(".color");
    allColors.forEach((element) => {
        element.addEventListener("click", function (event) {
            allColors.forEach((element) => {
                element.style.border = "0";
                element.style.padding = "20px";
            });
            event.target.style.padding = "17px";
            event.target.style.border = "3px solid white";
            event.target.style.boxSizing = "border-box";
            mainColor = event.target.style.backgroundColor;
            clickErase++;
            $("erase").style.backgroundColor = "#121e3b";
            $("erase").style.color = "white";
        });
    });
})();

//Erase and Reset

$("erase").addEventListener("click", function (event) {
    document.querySelectorAll(".color").forEach((element) => {
        element.style.border = "0";
        element.style.padding = "20px";
    });
    mainColor = "white";
    clickErase++;
    if (clickErase % 2 == 0) {
        event.target.style.backgroundColor = "white";
        event.target.style.color = "black";
    } else {
        event.target.style.backgroundColor = "#121e3b";
        event.target.style.color = "white";
    }
});

$("reset").addEventListener("click", function () {
    document.querySelectorAll(".cell").forEach((element) => {
        element.style.backgroundColor = "white";
    });
});

//Draw Funciton
function draw(event) {
    event.target.style.backgroundColor = mainColor;
}

function loadDrawableCells() {
    cells = document.querySelectorAll(".cell");
    console.log(cells);
    cells.forEach((element) => {
        element.addEventListener("mousedown", function (event) {
            draw(event);
            cells.forEach((element) => {
                element.addEventListener("mouseenter", draw);
                element.addEventListener("mouseup", function (event) {
                    cells.forEach((element) => {
                        element.removeEventListener("mouseenter", draw);
                    });
                });
            });
        });
    });
}

// Generate Grid

function createGrid(n) {
    let sketch = document.getElementById("sketch");
    sketch.innerHTML = "";
    for (let row = 0; row < n; row++) {
        let rowN = document.createElement("div");
        rowN.classList.add("row");
        for (let cell = 0; cell < n; cell++) {
            let cellN = document.createElement("div");
            cellN.classList.add("cell");
            cellN.style.flexBasis = String(100 / n) + "%";
            rowN.appendChild(cellN);
        }
        sketch.appendChild(rowN);
    }
    loadDrawableCells();
}

createGrid(16);

let size = $("size");
let createGridBtn = $("size-button");

createGridBtn.addEventListener("click", function (event) {
    let n = Number(size.value); //nxn Grid
    if (1 <= n && n <= 100) {
        createGrid(n);
    }
});
