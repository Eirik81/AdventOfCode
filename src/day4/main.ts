import _ = require("lodash");

function isValidPassword(pass: number): boolean {
    let hasDuplicate = false;
    const str = pass + "";
    for (let i = 1; i < str.length; i += 1) {
        if (str[i - 1] > str[i]) {
            return false;
        }
        if (str[i - 1] === str [i]) {
            hasDuplicate = true;
        }
    }
    return hasDuplicate;
}

function isValidPassword2(pass: number): boolean {
    let hasDuplicate = false;
    const str = pass + "";
    for (let i = 1; i < str.length; i += 1) {
        if (str[i - 1] > str[i]) {
            return false;
        }
        if (str[i - 1] === str[i] && str[i - 2] !== str[i] && str[i + 1] !== str[i]) {
            hasDuplicate = true;
        }
    }
    return hasDuplicate;
}

function run() {
    let res1 = 0;
    let res2 = 0;
    for (let pass = 168630; pass <= 718098; pass += 1) {
        if (isValidPassword(pass)) {
            res1 += 1;
        }
        if (isValidPassword2(pass)) {
            res2 += 1;
        }
    }
    console.log("Result1: " + res1);
    console.log("Result2: " + res2);
}

run();