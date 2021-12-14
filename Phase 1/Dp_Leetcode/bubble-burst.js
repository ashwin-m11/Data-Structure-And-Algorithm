// https://leetcode.com/problems/burst-balloons/

//Approach1, passing any possible combination of Array created
var maxCoins = function (nums = [], memo = {}, nonZero = false) {
    if (!nonZero) nums = nums.filter(x => x !== 0)

    const key = nums.toString();
    let reverseKey = "";
    for (var i = key.length - 1; i >= 0; i--) {
        reverseKey += key[i];
    }
    if (key in memo || reverseKey in memo) return memo[key];

    const numLength = nums.length
    if (numLength === 0) return 0;

    let maxCoinValue = 0;
    for (let i = 0; i < numLength; i++) {
        let leftVal = i - 1 < 0 ? 1 : nums[i - 1];
        let rightVal = i + 1 >= numLength ? 1 : nums[i + 1];
        const currentCoinValue = leftVal * nums[i] * rightVal + maxCoins([...nums.slice(0, i), ...nums.slice(i + 1)], memo, true)
        if (maxCoinValue < currentCoinValue) maxCoinValue = currentCoinValue;
    }
    memo[key] = maxCoinValue;
    return maxCoinValue;
};

// time: (n^2*2^n)
// space: (n*2^n)


//Approach2, passing subArray 
var maxCoins1 = function (nums) {
    nums = nums.filter(x => x !== 0);
    numLength = nums.length;
    let allValueSame = true;
    for (let i = 0; i < numLength - 1; i++) {
        if (nums[i] !== nums[i + 1]) { allValueSame = false; break; }
    }
    if (allValueSame) {
        val = nums[0];
        if (numLength > 1) return (numLength - 2) * val * val * val + val * (val + 1)
    }
    return calMaxCoinsSubArray([1, ...nums, 1], {})
}

var calMaxCoinsSubArray = function (nums = [], memo = {}) {

    const key = nums.toString();

    // let reverseKey = "";
    // for (var i = key.length - 1; i >= 0; i--) {
    //     reverseKey += key[i];
    // }
    if (key in memo) return memo[key];
    // if (reverseKey in memo) return memo[reverseKey];

    let maxCoinValue = 0;
    for (let i = 1; i < nums.length - 1; i++) {
        const currentCoinValue = nums[0] * nums[i] * nums[nums.length - 1] + calMaxCoinsSubArray([...nums.slice(0, i + 1)], memo) + calMaxCoinsSubArray([...nums.slice(i)], memo)
        if (maxCoinValue < currentCoinValue) maxCoinValue = currentCoinValue;
    }
    memo[key] = maxCoinValue;

    return maxCoinValue;
};

//Approach2, passing complete Array with left and right position
var maxCoins2 = function (nums) {
    nums = nums.filter(x => x !== 0);
    numLength = nums.length;
    let allValueSame = true;
    for (let i = 0; i < numLength - 1; i++) {
        if (nums[i] !== nums[i + 1]) { allValueSame = false; break; }
    }
    if (allValueSame) {
        val = nums[0];
        if (numLength > 1) return (numLength - 2) * val * val * val + val * (val + 1)
    }
    return calMaxCoinsCompleteArrayWithPosition([1, ...nums, 1], {}, 0, numLength + 1)
}

var calMaxCoinsCompleteArrayWithPosition = function (nums = [], memo = {}, left, right) {
    if (left >= right + 1) return 0;

    const key = left.toString().concat(",", right)
    console.log(key);
    if (key in memo) {
        return memo[key];
    }

    let maxCoinValue = 0;
    for (let i = left + 1; i < right; i++) {
        const currentCoinValue = nums[left] * nums[i] * nums[right] + calMaxCoinsCompleteArrayWithPosition(nums, memo, left, i) + calMaxCoinsCompleteArrayWithPosition(nums, memo, i, right)
        if (maxCoinValue < currentCoinValue) maxCoinValue = currentCoinValue;
    }
    memo[key] = maxCoinValue;

    return maxCoinValue;
};

//Bottoms Up calculation
var maxCoins3 = function (nums) {
    nums = nums.filter(x => x !== 0);
    numLength = nums.length;
    let allValueSame = true;
    for (let i = 0; i < numLength - 1; i++) {
        if (nums[i] !== nums[i + 1]) { allValueSame = false; break; }
    }
    if (allValueSame) {
        val = nums[0];
        if (numLength > 1) return (numLength - 2) * val * val * val + val * (val + 1)
    }
    return calMaxCoinsBottomsUp([1, ...nums, 1])
}

var calMaxCoinsBottomsUp = function (nums = []) {
    const numLength = nums.length
    const table = Array(numLength).fill().map(() => Array(numLength).fill(0))

    for (let i = numLength - 1; i >= 0; i--) {
        for (let j = i + 1; j < numLength; j++) {
            let currentPositionMaxCoinValue = 0
                for (let k = i + 1; k < j; k++) {
                    calVal = table[i][k] + table[k][j] + nums[i]*nums[k]*nums[j]
                    currentPositionMaxCoinValue = Math.max(currentPositionMaxCoinValue, calVal)
                }
                table[i][j] = currentPositionMaxCoinValue;
        }
    }
    console.log(table)
    return table[0][numLength-1];
};

// console.log(new Date())
// // console.log(maxCoins([8, 3, 4, 3, 5, 0, 5, 6, 6, 2, 8, 5, 6, 2, 3, 8, 3, 5, 1, 0, 2, 9, 6]))
// console.log(maxCoins([8, 3, 4, 3, 5, 0, 5, 6, 6, 2, 8, 5, 6, 2, 3, 8, 3, 5, 1, 0, 2]))
// console.log(maxCoins([8, 2, 6, 8, 9, 8, 1, 4, 1, 5, 3, 0, 7, 7, 0, 4, 2, 2, 5]))
// console.log(maxCoins([7, 9, 8, 0, 7, 1, 3, 5, 5, 2, 3]))
// console.log(maxCoins([3, 1, 5, 8])) //167 
// console.log(maxCoins([1, 5])) //10
// console.log(maxCoins([])) //0
// console.log(new Date())

// console.log(maxCoins1([8, 3, 4, 3, 5, 0, 5, 6, 6, 2, 8, 5, 6, 2, 3, 8, 3, 5, 1, 0, 2, 9, 6]))
// console.log(maxCoins1([8, 3, 4, 3, 5, 0, 5, 6, 6, 2, 8, 5, 6, 2, 3, 8, 3, 5, 1, 0, 2]))
// console.log(maxCoins1([8, 2, 6, 8, 9, 8, 1, 4, 1, 5, 3, 0, 7, 7, 0, 4, 2, 2, 5]))
// console.log(maxCoins1([7, 9, 8, 0, 7, 1, 3, 5, 5, 2, 3]))
// console.log(maxCoins1([3, 1, 5, 8])) //167 
// console.log(maxCoins1([1, 5])) //10
// console.log(maxCoins1([])) //0
// console.log(new Date())

// console.log(maxCoins2([8, 3, 4, 3, 5, 0, 5, 6, 6, 2, 8, 5, 6, 2, 3, 8, 3, 5, 1, 0, 2, 9, 6]))
// console.log(maxCoins2([8, 3, 4, 3, 5, 0, 5, 6, 6, 2, 8, 5, 6, 2, 3, 8, 3, 5, 1, 0, 2]))
// console.log(maxCoins2([8, 2, 6, 8, 9, 8, 1, 4, 1, 5, 3, 0, 7, 7, 0, 4, 2, 2, 5]))
// console.log(maxCoins2([7, 9, 8, 0, 7, 1, 3, 5, 5, 2, 3]))
console.log(maxCoins3([3, 1, 5, 8])) //167 
// console.log(maxCoins2([1, 5])) //10
// console.log(maxCoins2([])) //0
console.log(new Date())
