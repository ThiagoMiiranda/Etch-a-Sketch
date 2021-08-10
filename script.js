const container = document.querySelector('.container');

const tableSize = 512;
const pixelSize = 16;
const rowOfPixels = tableSize / pixelSize;
const totalOfPixels = rowOfPixels * rowOfPixels; //You multiply by itself because the table is a square

for (let i = 0; i < totalOfPixels; i++) {
    let pixel = document.createElement('div');
    pixel.style.height = pixelSize + 'px';
    pixel.style.width = pixelSize + 'px';
    /*pixel.style.border = 'solid red';*/
    container.appendChild(pixel);
}

const pixels = document.querySelectorAll('.container div');
pixels.forEach((pixel) => {
    pixel.addEventListener('mouseover', (e) => {
        let color = document.querySelector('#colorPicker').value;
        e.target.style.backgroundColor = color;
    });
});

const clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', () => {
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = '';
    });
});