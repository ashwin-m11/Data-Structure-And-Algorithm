function checkLapindrome (str) {

    let length = str.length;

    let leftDict = {};
    let rightDict = {};

    for (let i = 0; i < Math.floor(length/2); i++) {
        if(str[i] in leftDict) leftDict[str[i]] ++
        else leftDict[str[i]] = 1
    }

    for (let i = length - 1; i >= Math.floor((length+1)/2); i--) {
        if(str[i] in rightDict) rightDict[str[i]] ++
        else rightDict[str[i]] = 1
    }

    // console.log(leftDict, rightDict);

    for (const key in leftDict) {
        if ( !(key in rightDict) || rightDict[key] != leftDict [key]) return false
    }

    return true;
}

console.log(checkLapindrome("gaga"));
console.log(checkLapindrome("abcde"));
console.log(checkLapindrome("rotor"));
console.log(checkLapindrome("xyzxy"));
console.log(checkLapindrome("abbaab"));
console.log(checkLapindrome("ababc"));