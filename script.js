// Generate i * j sized grid of 'div' elements and add corresponding style

function generateGrid(gridContainer, rows = 32, cols = 32) {
    for (let i = 0; i < rows; i++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");
        for (let j = 0; j < cols; j++) {
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
    eventName = event.target.tagName.toUpperCase()
    if (eventName === "INPUT") {
        currentColorValue = event.target.value;
        return currentColorValue;
    }

    else if (eventName === "DIV") {
        currentColorName = event.target.classList[1].slice(6);
        currentColorValue = colors[currentColorName];
        return currentColorValue;
    }
}

function colorCell(cell) {
    if (cell === lastColoredCell || cell === gridContainer) {
        return;
    }
    else {
        removeColor(cell);
        if (rainbowMode) {
            cell.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
        }
        else {
            cell.style.backgroundColor = currentColorValue;
            lastColoredCell = cell;
        }
    }
}

function removeColor(cell) {
    cell.style.backgroundColor = "transparent";
}

function resetGrid() {
    const gridCells = Array.from(document.querySelectorAll(".grid-cell"))
    gridCells.forEach((gridCell) => {
        gridCell.style.backgroundColor = '';
    })
}

function updateColorPicker(currentColorValue) {
    colorPicker.value = currentColorValue;
    colorPicker.style.backgroundColor = currentColorValue;
}

function removeGrid(gridContainer) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild)
    }

}

function debounce(func, delay = 5) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

function throttle(func, delay = 1000) {
    let shouldWait = false;
    let waitingArgs;

    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false;
        } else {
            func(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    }

    return (...args) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }

        func(...args);
        shouldWait = true;

        setTimeout(timeoutFunc, delay);
    }
}

function resizeGrid(dimValue) {
    removeGrid(gridContainer);
    dimensionText.textContent = `${dimValue} x ${dimValue}`;
    generateGrid(gridContainer, dimValue, dimValue);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
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
    redViolet: '#ff0066',
    white: '#ffffff',
    black: '#000000'
}

const gridContainer = document.querySelector(".grid-container");
generateGrid(gridContainer);

const colorChoiceContainer = document.querySelector(".color-choices-container");
const colorChoices = Array.from(document.querySelectorAll(".color-choice"));
generateColorChoices(colorChoiceContainer);

const debouncedColorCell = debounce(colorCell, 5);
const throttledResideGrid = throttle(resizeGrid, 500);

const resetButton = document.querySelector(".reset-button");
const rainbowButton = document.querySelector(".rainbow-button");
const colorPicker = document.querySelector("#color-picker");

const dimensionSlider = document.querySelector(".dimension-slider");
const dimensionText = document.querySelector("#dimension-text");


let currentColorName = "";
let currentColorValue = "";
let lastColoredCell = '';

let isMouseDown = false;
let rainbowMode = false;


for (choice of colorChoices) {
    choice.classList.add("shrink")
    choice.addEventListener("click", (event) => {
        currentColorValue = selectColor(event);
        updateColorPicker(currentColorValue)
    })
}

gridContainer.addEventListener("mousedown", (event) => {
    if (event.button !== 0) {
        return;
    }
    event.preventDefault();
    isMouseDown = true;
    debouncedColorCell(event.target, currentColorName)
});

gridContainer.addEventListener("mouseup", (event) => {
    isMouseDown = false;
    lastColoredCell = '';
});

gridContainer.addEventListener("mouseleave", (event) => {
    if (event.button !== 0) {
        return;
    }
    isMouseDown = false;
    lastColoredCell = '';
});

gridContainer.addEventListener("mouseover", (event) => {
    if (event.button !== 0) {
        return;
    }
    if (isMouseDown) {
        debouncedColorCell(event.target, currentColorName);
    }
});

dimensionSlider.addEventListener("input", function (event) {
    throttledResideGrid(event.target.value)
});


resetButton.addEventListener("click", () => {
    resetGrid();
});

colorPicker.addEventListener("input", (event) => {
    selectColor(event);
    updateColorPicker(currentColorValue)
})

rainbowButton.addEventListener("click", () => {
    if (rainbowMode) {
        rainbowMode = false;
        console.log(rainbowMode)
    }

    else {
        rainbowMode = true;
        console.log(rainbowMode)
    }
})