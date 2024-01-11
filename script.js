// Generate i * j sized grid of 'div' elements and add corresponding style

function generateGrid(gridContainer) {
    for (let i = 0; i < 16; i++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");
        for (let j = 0; j < 16; j++) {
            const gridCell = document.createElement("div");
            gridCell.classList.add("grid-cell");
            gridRow.appendChild(gridCell);
        }
        gridContainer.appendChild(gridRow);
    }
}

// Generate color background based on class "color-*"

function generateColorChoices(colorChoiceContainer) {
    const colorChoiceContainerChildren = Array.from(colorChoiceContainer.children)
    for (const row of colorChoiceContainerChildren) {
        for (const colorChoice of row.children) {
            const colorChoiceName = colorChoice.classList[1].slice(6);
            if (colorChoiceName in colors) {
                colorChoice.style.backgroundColor = colors[colorChoiceName];
            }
        }
    }
}

function selectColor(event) {
    const userChoice = event.target
    currentColor = userChoice.classList[1].slice(6);
}

function colorCells(event, currentColor) {
    event.target.style.backgroundColor = colors[`${currentColor}`];
}
// Colors corresponding to class "color-*"

const colors = {
    red: '#ff0000',
    redOrange: '#ff3700',
    orange: '#ff6a00',
    yellowOrange: '#ff9100',
    yellow: '#ffe600',
    yellowGreen: '#c8ff00',
    green: '#22ff00',
    blueGreen: '#00ff95',
    blue: '#006eff',
    blueViolet: '#5100ff',
    violet: '#b700ff',
    redViolet: '#ff0066'
}

const gridContainer = document.querySelector(".grid-container");
const colorChoiceContainer = document.querySelector(".color-choices-container");
const colorChoices = Array.from(document.querySelectorAll(".color-choice"));
let currentColor = colors["red"];


for (choice of colorChoices) {
    choice.classList.add("shrink")
    choice.addEventListener("click", (event) => {
        selectColor(event);
    })
}

generateGrid(gridContainer);
generateColorChoices(colorChoiceContainer);


gridContainer.addEventListener("mouseover", (event) => {
    colorCells(event, currentColor);
});