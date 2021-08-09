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