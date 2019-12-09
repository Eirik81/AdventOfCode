import _ = require("lodash");

const data = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,10,19,23,1,23,9,27,1,5,27,31,2,31,13,35,1,35,5,39,1,39,5,43,2,13,43,47,2,47,10,51,1,51,6,55,2,55,9,59,1,59,5,63,1,63,13,67,2,67,6,71,1,71,5,75,1,75,5,79,1,79,9,83,1,10,83,87,1,87,10,91,1,91,9,95,1,10,95,99,1,10,99,103,2,103,10,107,1,107,9,111,2,6,111,115,1,5,115,119,2,119,13,123,1,6,123,127,2,9,127,131,1,131,5,135,1,135,13,139,1,139,10,143,1,2,143,147,1,147,10,0,99,2,0,14,0];

data[1] = 12;
data[2] = 2;

function intCodeMachine(input: number[]) {
    let i = 0;
    while (i < input.length) {
        const opCode = input[i];  
        const v1 = input[input[i+1]];
        const v2 = input[input[i+2]];      
        const resPos = input[i+3];
        switch (opCode) {
            case 99: return;
            case 1: {
                input[resPos] = v1 + v2;
                break;
            }
            case 2: {
                input[resPos] = v1 * v2;
                break;
            }
            default: {
                console.log("Invalid opCode: " + opCode);
            }
        }
        i += 4;
    }
}

function run() {
    const res1 = _.cloneDeep(data);
    intCodeMachine(res1);
    console.log("Result1: " + res1[0]);

    for (let i = 0; i < 100; i += 1) {
        for (let j = 1; j < 100; j += 1) {
            const res2 = _.cloneDeep(data);
            res2[1] = i;
            res2[2] = j;
            intCodeMachine(res2);
            if (res2[0] === 19690720) {
                console.log("Result2: " + i + ", " + j);
                return;
            }
        }
    }
}

run();
