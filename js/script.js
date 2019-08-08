const gridScreen = document.querySelector(".grid-screen");
const sizeContainer = document.querySelector(".size-container");
let drawStyle = "black";
let size = 16;
let cells;

// create grid with dim * dim  cells
function generateGrid(dim) {

  const cell = document.createElement("div");
  cell.classList.add("cell"); 

  // update grid style
  gridScreen.style.gridTemplateColumns = `repeat(${dim}, 1fr)`;
  gridScreen.style.gridTemplateRows = `repeat(${dim}, 1fr)`;

  // create cells
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {

      if (i === 0 && j === 0) {
        gridScreen.appendChild(cell);
      } else {
        gridScreen.appendChild(cell.cloneNode());
      }
    }
  }

  cells = document.querySelectorAll(".cell");
  draw();
}

generateGrid(size);

// event listeners for cells to change color
function draw() {
  cells.forEach((button) => {

    button.addEventListener("mouseover", () => {
      if (drawStyle === "black") {
        button.style.background = "#000";
      } else if (drawStyle === "rainbow") {
        button.style.background = randomRGB();
      } else if (drawStyle === "eraser") {
        button.style.background = "transparent";
      }
    });
  });
}

// button to change draw to blackr
const black = document.querySelector(".black");
black.addEventListener("click", () => {
  drawStyle = "black";
  showCurrentStyle(drawStyle);
});

// return random RGB value
function randomRGB() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}

// button to change draw to rainbow
const rainbow = document.querySelector(".rainbow");
rainbow.addEventListener("click", () => {
  drawStyle = "rainbow";
  showCurrentStyle(drawStyle);
});

// button to change draw to eraser
const eraser = document.querySelector(".eraser");
eraser.addEventListener("click", () => {
  drawStyle = "eraser";
  showCurrentStyle(drawStyle);
});

// border around current draw style
function showCurrentStyle(style) {
  black.style.border = "none";
  rainbow.style.border = "none";
  eraser.style.border = "none";

  if (drawStyle === "black") {
    black.style.border = "0.25vh solid black";
  } else if (drawStyle === "rainbow") {
    rainbow.style.border = "0.25vh solid black";
  } else if (drawStyle === "eraser") {
    eraser.style.border = "0.25vh solid black";
  }
}

// button to show grid size input
const gridSize = document.querySelector(".grid-size");
gridSize.addEventListener("click", () => {
  sizeContainer.style.display = "flex";
});

// delete grid and make another with new size
const submit = document.querySelector(".submit-size");
submit.addEventListener("click", () => {
  let size = parseInt(document.querySelector(".input-size").value);

  document.querySelector(".input-size").value = null;

  sizeContainer.style.display = "none";
  deleteGrid();
  generateGrid(size);
});

function eraseScreen() {
  cells.forEach((button) => {

    button.style.background = "transparent";
  });
}

// reset button to erase screen
const reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
  eraseScreen();
});

// delete all cell divs
function deleteGrid() {
  cells.forEach(div => div.parentNode.removeChild(div));
};