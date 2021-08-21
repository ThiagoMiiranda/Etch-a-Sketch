function createTable(totalOfPixels) {
    for (let i = 0; i < totalOfPixels; i++) {
        let pixel = document.createElement('div');
        container.appendChild(pixel);
    }
}

function deleteTable() {
    let pixels = document.querySelectorAll('.container div');
    pixels.forEach((pixel) => {
        container.removeChild(pixel);
    });
}

function userInput(event) {
    let output = document.querySelector('output');
    output.textContent = event.target.value + ' x ' + event.target.value;

    deleteTable();

    let rowOfPixels = event.target.value;
    let pixelSize = TABLESIZE / rowOfPixels;
    let totalOfPixels = rowOfPixels * rowOfPixels; //multiply by itself because the table is a square

    container.style.gridTemplateColumns = `repeat(${rowOfPixels}, ${pixelSize}px)`;
    createTable(totalOfPixels);
    createPixelEvent();
}

function getRandomIntIncl(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRGBValues(RGBString) {
    let red = RGBString.substring(RGBString.indexOf('(') + 1, RGBString.indexOf(','));
    if (!red) {red = 255;}

    let green = RGBString.substring(RGBString.indexOf(',') + 2, RGBString.lastIndexOf(','));
    if (!green) {green = 255;}

    let blue = RGBString.substring(RGBString.lastIndexOf(',') + 2, RGBString.indexOf(')'));
    if (!blue) {blue = 255;}
    
    return [Number(red), Number(green), Number(blue)];
}

function paint(e) {
    if (paintMode == 'color') {
        let color = document.querySelector('#colorPicker').value;
        e.target.style.backgroundColor = color;
    } else if (paintMode == 'rainbow') {
        let color = `rgb(${getRandomIntIncl(0, 255)}, ${getRandomIntIncl(0, 255)}, ${getRandomIntIncl(0, 255)})`;
        e.target.style.backgroundColor = color;
    } else if (paintMode == 'black-shades') {
        let oldColor = e.target.style.backgroundColor;
        let oldRGBValues = getRGBValues(oldColor);

        let red = oldRGBValues[0], green = oldRGBValues[1], blue = oldRGBValues[2];
        red = red - Math.ceil(red * 0.2);
        green = green - Math.ceil(green * 0.2);
        blue = blue - Math.ceil(blue * 0.2);

        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    } else if (paintMode == 'warm') {
        let color = `hsl(${getRandomIntIncl(0, 50)}, ${getRandomIntIncl(60, 100)}%, 50%)`;
        e.target.style.backgroundColor = color;
    } else if (paintMode == 'cold') {
        let color = `hsl(${getRandomIntIncl(180, 250)}, ${getRandomIntIncl(60, 100)}%, 50%)`;
        e.target.style.backgroundColor = color;
    }
}

function createPixelEvent() {
    let pixels = document.querySelectorAll('.container div');
    pixels.forEach((pixel) => {
        pixel.addEventListener('mouseover', paint);
    });
}

function removePixelEvents() {
    let pixels = document.querySelectorAll('.container div');
    pixels.forEach((pixel) => {
        pixel.removeEventListener('mouseover', paint);
    });
}

const TABLESIZE = 512;
const container = document.querySelector('.container');
let paintMode = 'color';

const clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', () => {
    let pixels = document.querySelectorAll('.container div');
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = '';
    });
});

const slider = document.querySelector('#slider');
slider.addEventListener('input', userInput);

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('CheckboxStateChange', (e) => {
        if (checkbox.checked) {
            paintMode = e.target.value;
            createPixelEvent();

            checkboxes.forEach((toolsBtn) => {
                if (checkbox.value != toolsBtn.value) {
                    toolsBtn.checked = false;
                }
            });
        } else {
            paintMode = 'color';
        }
    });
});

//Basic setup for page load
container.style.gridTemplateColumns = `repeat(16, 32px)`;
createTable(16*16);
createPixelEvent();