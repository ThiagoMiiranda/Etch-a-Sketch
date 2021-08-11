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
    output.textContent = event.target.value;

    deleteTable();

    let rowOfPixels = event.target.value;
    let pixelSize = TABLESIZE / rowOfPixels;
    let totalOfPixels = rowOfPixels * rowOfPixels; //multiply by itself because the table is a square

    container.style.gridTemplateColumns = `repeat(${rowOfPixels}, ${pixelSize}px)`;
    createTable(totalOfPixels);
    createPixelEvent();
}

function createPixelEvent() {
    let pixels = document.querySelectorAll('.container div');
    pixels.forEach((pixel) => {
        pixel.addEventListener('mouseover', (e) => {
            let color = document.querySelector('#colorPicker').value;
            e.target.style.backgroundColor = color;
        });
    });
}

const TABLESIZE = 512;
const container = document.querySelector('.container');

const clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', () => {
    let pixels = document.querySelectorAll('.container div');
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = '';
    });
});

const slider = document.querySelector('#slider');
slider.addEventListener('input', userInput);

//Basic setup for page load
container.style.gridTemplateColumns = `repeat(16, 32px)`;
createTable(16*16);
createPixelEvent();