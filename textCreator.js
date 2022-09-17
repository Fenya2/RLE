const numOfSymbols = 1000;
const minSerialLength = 1;
const maxSeriaLength = 800;
const fileName = 'input.txt';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
output = '';
for(let i = 0; i < numOfSymbols; i++) {
    output += String.fromCharCode(getRandomInt(1,255)).repeat(getRandomInt(minSerialLength,maxSeriaLength));
}
try {
    fs = require('fs');
    fs.writeFileSync(fileName, output);
    console.log("success!");
    // fs.writeFileSync(`${process.argv[2]}`, output);
} catch (e) {
    console.error(e.message);
}

