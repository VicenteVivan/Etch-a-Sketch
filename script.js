function createGrid(n) {
    let sketch = document.getElementById("sketch");
    sketch.innerHTML = "";
    for (let row = 0; row < n; row++) {
        let rowN = document.createElement("div");
        rowN.classList.add("row");
        rowN.style.height = String(600 / n) + "px";
        for (let cell = 0; cell < n; cell++) {
            let cellN = document.createElement("div");
            cellN.classList.add("cell");
            cellN.style.flexBasis = String(100 / n) + "%";
            rowN.appendChild(cellN);
        }
        sketch.appendChild(rowN);
    }
}
