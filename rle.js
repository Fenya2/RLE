/*
Сыромятников Д.О. КНМО-101
 */

function encodeWithRLE (sequence) {
//[symbol, series]
    let series = [];
    let j = 0;
    let i = 0;
    while (i < sequence.length) {
        while(sequence[i+j] === sequence[i+j+1]) {
            j += 1;
        }
        j += 1; // first symbol is already exist
        series.push([sequence[i], j]);
        i += j; // jump to another symbol
        j = 0;
    }
    let outputSequence = '';
    for(let i = 0; i < series.length; i++) {
        while(series[i][1] > 255) {
            outputSequence += '#' + String.fromCharCode(255) + series[i][0];
            series[i][1] -= 255;
        }
        if(series[i][1] > 3) {
            outputSequence += '#' + String.fromCharCode(series[i][1]) + series[i][0];
        }
        else if(series[i][1] < 4 && series[i][0] === '#') {
            outputSequence += '#' + String.fromCharCode(series[i][1]) + series[i][0];
        }
        else {
            outputSequence += series[i][0].repeat([series[i][1]]);
        }
    }
    return outputSequence;
}

function decodeRLE(subsequence) { // '# quantity symbol'
    let outputSubsequence = '';
    for(let i = 0; i < subsequence.length; i++) {
        if(subsequence[i] ==='#') {
            outputSubsequence += subsequence[i+2].repeat(subsequence.charCodeAt(i+1));
            i += 2;   // just jump
            continue; // to another symbol
        }
        outputSubsequence += subsequence[i];
    }
    return outputSubsequence;
}

function showHelp() {
    console.log(require("fs").readFileSync('help.txt').toString());
}

let fs = require('fs');
switch (process.argv[2]) {
    case 'code':
        try{
            let inputSequence = fs.readFileSync(process.argv[3]).toString();
            outputSequence = encodeWithRLE(inputSequence);
            fs.writeFileSync(process.argv[4], outputSequence);
            console.log(`compression coefficient is ${Math.round((inputSequence.length/outputSequence.length)*100)/100}`);
        } catch (e) {
            showHelp();
            console.error(e.message);
        }
        break;
    case 'decode':
        try {
            let inputSequence = fs.readFileSync(process.argv[3]).toString();
            outputSequence = decodeRLE(inputSequence);
            fs.writeFileSync(process.argv[4], outputSequence);
        } catch (e) {
            showHelp();
            console.error(e.message);
        }
        break;
    default:
        showHelp();
        break;
}