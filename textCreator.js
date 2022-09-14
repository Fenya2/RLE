const numOfSymbols = 500;
const maxSeriaLength = 255^3+180;
const fileName = 'input.txt';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
output = ''
for(let i = 0; i < numOfSymbols; i++) {
    output += String.fromCharCode(getRandomInt(0,255)).repeat(getRandomInt(0,maxSeriaLength));
}
fs = require('fs');
fs.writeFileSync(fileName, output);
fs.writeFileSync(`${process.argv[2]}`, output);