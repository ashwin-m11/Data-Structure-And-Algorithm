//https://leetcode.com/problems/number-of-squareful-arrays/submissions/
//Top-Down Approach

var numSquarefulPerms = function (nums) {
    let duplicationCounter = {};

    // duplicationCounter = {
    //     12 : {"ite" : 2, "val" : 2},
    //     14 : {"ite" : 4, "val" : 24},
    //     17 : {"ite" : 1, "val" : 1},
    // }

    for (const num of nums) {
        if (num in duplicationCounter) {
            duplicationCounter[num]["ite"]++;
            duplicationCounter[num]["val"] = duplicationCounter[num]["val"] * duplicationCounter[num]["ite"]
        }
        else {
            duplicationCounter[num] = { "ite": 1, "val": 1 }
        }
    }
    let factor = 1;
    // console.log(duplicationCounter);
    for (const key in duplicationCounter) {
        // console.log(key);
        factor = factor * duplicationCounter[key]["val"]
    }

    let count = 0;
    let memo = {};
    for (let i = 0; i < nums.length; i++) {
        count += numSquarefulPermsIteration([...nums.slice(0, i), ...nums.slice(i + 1)], nums[i], memo, {});
    }
    console.log(memo);
    return count / factor;
};

var numSquarefulPermsIteration = function (nums, previousNum, memo, memoSquare) {
    const key = [previousNum, ...nums].toString();
    if (key in memo) { return memo[key] }
    if (nums.length === 0) return 1;
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        const summation = previousNum + nums[i];
        let isSquare = false;
        if (summation in memoSquare) isSquare = memoSquare[summation];
        else {
            const squareRoot = Math.sqrt(summation);
            isSquare = squareRoot === Math.floor(squareRoot);
            memoSquare[summation] = isSquare;
        }
        if (isSquare) count += numSquarefulPermsIteration([...nums.slice(0, i), ...nums.slice(i + 1)], nums[i], memo, memoSquare);
    }
    memo[key] = count;
    return count;
}

var isSquare = function (sum, left = 0, right = 10000) {
    const mid = Math.floor((left + right) * 0.5)
    const val = mid * mid;
    if (sum === val) return true;
    if (mid === left) return right * right === sum
    if (sum > val) { return isSquare(sum, mid, right) }
    else return isSquare(sum, left, mid)
}





//Break and Conquer
var numSquarefulPerms12 = function (nums) {
    let duplicationCounter = {};
    
    for (const num of nums) {
        if (num in duplicationCounter) {
            duplicationCounter[num]["ite"]++;
            duplicationCounter[num]["val"] = duplicationCounter[num]["val"] * duplicationCounter[num]["ite"]
        }
        else {
            duplicationCounter[num] = { "ite": 1, "val": 1 }
        }
    }
    let factor = 1;
    // console.log(duplicationCounter);
    for (const key in duplicationCounter) {
        // console.log(key);
        factor = factor * duplicationCounter[key]["val"]
    }

    let pairSquarable = [];
    let numLength = nums.length;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (isSquare(nums[i] + nums[j])) {
                pairSquarable.push([i, j]);
                pairSquarable.push([j, i]);
            }
        }
    }
    // console.log(pairSquarable);
    const SquareIteration = (pairSquarable, multiPairSquarable = pairSquarable) => {
        let possibleCombination = [];
        if (multiPairSquarable[0].length === numLength) return multiPairSquarable.length;
        for (let i = 0; i < multiPairSquarable.length; i++) {
            let firstArray = multiPairSquarable[i];
            console.log("firstArray: " , firstArray)
            for (let j = 0; j < pairSquarable.length; j++) {
                let secondArray = pairSquarable[j];
                // console.log("secondArray: " , secondArray)
                if (secondArray[0] == firstArray[firstArray.length - 1]) {
                    if (!firstArray.includes(secondArray[1])) {
                        possibleCombination.push([...firstArray, secondArray[1]]);
                    }
                }
            }
            // console.log(possibleCombination);
            // console.log("----------");
        }
        if (possibleCombination.length === 0) return 0
        return SquareIteration(pairSquarable, possibleCombination);
    }

    return SquareIteration(pairSquarable)/factor;

}



// console.log(numSquarefulPerms([1, 17, 8]));
// console.log(numSquarefulPerms([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]));

console.log(numSquarefulPerms12([1, 17, 8, 8]));
console.log(numSquarefulPerms12([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]));