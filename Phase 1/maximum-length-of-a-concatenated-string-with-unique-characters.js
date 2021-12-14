//https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/
//You are given an array of strings arr. A string s is formed by the concatenation of a subsequence of arr that has unique characters.

// Return the maximum possible length of s.

// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.




/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function (arr) {
    let maxLengthVal = 0;
    let newArr = []

    for (const str of arr) {
        if (str.length == Array.from(str).filter(unique).length) {
            maxLengthVal = Math.max(maxLengthVal, str.length)
            newArr.push(str);
        }
    }
    arr = newArr;
    newArr = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            let unique = true;
            for (const char of arr[i]) {
                if (arr[j].indexOf(char) != -1) unique = false;
            }
            if (unique) {
                newArr.push(arr[i].concat(arr[j]));
            }
        }
    }
    if (newArr.length == 0) return maxLengthVal
    return Math.max(maxLength(newArr), maxLengthVal);
};


const unique = (value, index, self) => {
    return self.indexOf(value) === index
}


// console.log(maxLength(["un", "iq", "ue"])); //4
// console.log(maxLength(["cha", "r", "act", "ers"])); //6
// console.log(maxLength(["abcdefghijklmnopqrstuvwxyz"])); //26
// console.log(maxLength(["aa", "bb"])); //0
// console.log(maxLength(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"])) //26

// O(n) = n^(2^n) as the array keeps increasing



/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLengthOptimized = function (arr, newArr = [], pointer = 0) {
    if (pointer == arr.length) return Math.max(...newArr.map(x => x.length));
    let maxLengthVal = 0;
    const pointerVal = arr[pointer];
    if (pointerVal.length == Array.from(pointerVal).filter(unique).length) {
        let newArrLength = newArr.length;
        for (let i = 0; i < newArrLength; i++) {
            maxLengthVal = Math.max(maxLengthVal, newArr[i].length);
            const newStr = newArr[i].concat(pointerVal);
            if (newStr.length === (new Set([...newStr])).size) {
                newArr.push(newStr);
            }
        }
        newArr.push(pointerVal);
    }
    return Math.max(maxLengthOptimized(arr, newArr, pointer + 1), maxLengthVal);
};


// console.log(maxLengthOptimized(["un", "iq", "ue"])); //4
// console.log(maxLengthOptimized(["cha", "r", "act", "ers"])); //6
// console.log(maxLengthOptimized(["abcdefghijklmnopqrstuvwxyz"])); //26
// console.log(maxLengthOptimized(["aa", "bb"])); //0
// console.log(maxLengthOptimized(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"])) //16


var maxLengthOptimizedAndSimplified = function (arr) {
    let res = 0
    const dp = (i, str = "") => {
        res = Math.max(res, str.length);
        for (let pointer = i; pointer < arr.length; pointer++) {
            const newStr = str + arr[pointer];
            (newStr.length == (new Set([...newStr])).size) && dp(pointer + 1,newStr);
        }
    }
    dp(0)
    return res;
};

console.log(maxLengthOptimizedAndSimplified(["cha", "r", "act", "ers"])); //6
