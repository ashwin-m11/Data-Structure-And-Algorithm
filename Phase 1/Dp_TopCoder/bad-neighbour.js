// https://community.topcoder.com/stat?c=problem_statement&pm=2402&rd=5009
//	
// The old song declares "Go ahead and hate your neighbor", and the residents of Onetinville have taken those words to heart. Every resident hates his next-door neighbors on both sides. Nobody is willing to live farther away from the town's well than his neighbors, so the town has been arranged in a big circle around the well. Unfortunately, the town's well is in disrepair and needs to be restored. You have been hired to collect donations for the Save Our Well fund.

// Each of the town's residents is willing to donate a certain amount, as specified in the int[] donations, which is listed in clockwise order around the well. However, nobody is willing to contribute to a fund to which his neighbor has also contributed. Next-door neighbors are always listed consecutively in donations, except that the first and last entries in donations are also for next-door neighbors. You must calculate and return the maximum amount of donations that can be collected.

const maxSum = (arr) => {
    if (arr.length <= 3) return Math.max(...arr)
    const memo = {};
    const val = Math.max(arr[0] + maxSumSubArray(arr, 2, arr.length - 2, memo), arr[arr.length - 1] + maxSumSubArray(arr, 1, arr.length - 3, memo), maxSumSubArray(arr, 1, arr.length - 2, memo));
    return val;
}


const maxSumSubArray = (arr, left, right, memo = {}) => {
    if (left <= 0 || right >= arr.length - 1 || left > right) return 0;
    const key = left.toString().concat(",", right);
    if (key in memo) return memo[key];
    if (right - left <= 1) {
        memo[key] = Math.max(arr[left], arr[right]);
        return memo[key];
    }
    let sum = 0;
    for (let i = left; i <= right; i++) {
        // if (i <= left + 1) sum = Math.max(sum, arr[i] + maxSumSubArray(arr, i + 2, right, memo));
        // else if (i >= right - 1) sum = Math.max(sum, arr[i] + maxSumSubArray(arr, left, i - 2, memo));
        sum = Math.max(sum, arr[i] + maxSumSubArray(arr, left, i - 2, memo) + maxSumSubArray(arr, i + 2, right, memo))
    }
    memo[key] = sum;
    return sum;
}

console.log(maxSum([94, 40, 49, 65, 21, 21, 106, 80, 92, 81, 679, 4, 61,
    6, 237, 12, 72, 74, 29, 95, 265, 35, 47, 1, 61, 397,
    52, 72, 37, 51, 1, 81, 45, 435, 7, 36, 57, 86, 81, 72])) //2926


console.log(maxSum([10, 3, 2, 5, 7, 8])) //19

console.log(maxSum([7, 7, 7, 7, 7, 7, 7])) //21

console.log(maxSum([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])) //16

console.log(maxSum([11, 15])) //15
