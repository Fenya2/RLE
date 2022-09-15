/*
RLE - run and encoding
#

Пелевин "...госплан..."

Постановка задачи:
1.Что дано?
2. Что надо сделать?

Давать родо-видовые определения
Леонид Волков (СКБ "Контур")

лет>35
 */

function encodeWithRLE (subsequence) {
//[symbol, series]
    let series = [];
    let j = 0;
    let i = 0
    while (i < subsequence.length) {
        while(subsequence[i+j] == subsequence[i+j+1]) {
            j += 1;
        }
        j += 1; // first symbol is already exist
        series.push([subsequence[i], j]);
        i += j; // jump to another symbol
        j = 0;
    }
    //console.log(series);
    let outputSubsequence = '';
    for(let i = 0; i < series.length; i++) {
        if (series[i][0] == '#' && series[i][1] < 4) {

            outputSubsequence += '#' + String.fromCharCode(series[i][1]) + '#';
            // for(let j = 0; j < series[i][1]; j++) {
            //     outputSubsequence += '#' + String.fromCharCode(1) + '#';
            // }
        } else {
            if (series[i][1] < 4) {
                outputSubsequence += series[i][0].repeat([series[i][1]]);
            }
            else {
                while(series[i][1] > 255) {
                    outputSubsequence += '#' + String.fromCharCode(255) + series[i][0];
                    series[i][1] -= 255;
                }
                outputSubsequence += '#' + String.fromCharCode(series[i][1]) + series[i][0];
            }
        }
    }
    return outputSubsequence;
}

function decodeRLE(subsequence) { // '# quantity symbol'
    // console.log('in decode rle')
    // console.log(subsequence);
    let outputSubsequence = '';
    for(let i = 0; i < subsequence.length; i++) {
        if(subsequence[i] =='#') {
            outputSubsequence += subsequence[i+2].repeat(subsequence.charCodeAt(i+1));
            i += 2;   // just jump
            continue; // to another symbol
        }
        outputSubsequence += subsequence[i];
    }
    return outputSubsequence;
}


//[input, mode, output]
clParams = [];

for(let i = 2; i < 5; i++) {
    clParams[i-2] = process.argv[i];
}

let fs = require('fs');
let inputSubsequence;

try {
    inputSubsequence = fs.readFileSync(clParams[0]).toString(); // get subsequence
    fs.writeFileSync(clParams[2], 'check file name'); // check, if we can create file with entered name
    if (clParams[1] == '/e') {
        console.log('encode mode');
        outputSubsequence = encodeWithRLE(inputSubsequence);
        compressionKoef = (outputSubsequence.length / inputSubsequence.length).toFixed();
        //console.log(outputSubsequence);
        console.log(`compression koef is ${compressionKoef}. ${100 * compressionKoef} percents compression`);
        fs.writeFileSync(clParams[2], outputSubsequence);
    } else if (clParams[1] == '/d') {
        console.log('decode mode');
        //console.log(inputSubsequence);
        fs.writeFileSync(clParams[2], decodeRLE(inputSubsequence));
    } else {
        throw new SyntaxError('неправильно выбран режим работы программы ([/e] или [/d])');
    }
} catch (e) {
    if (e.name == Error.name) {
        console.error('unexpected file name');
        console.error(e.name, e.message);
    }
    else if (e.name == SyntaxError.name) {
        console.error(e.message);
    }
}
