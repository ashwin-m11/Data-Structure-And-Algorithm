// https://leetcode.com/problems/maximum-number-of-consecutive-values-you-can-make/

/**
 * @param {number[]} coins
 * @return {number}
 */
var getMaximumConsecutive = function (coins) {
    return dp(0, 0, coins.sort((a, b) => a - b)) + 1

};

function dp(currSum, visitingIndex, coins) {
    const visitingVal = coins[visitingIndex];
    if (visitingVal > currSum + 1 || visitingIndex >= coins.length) return currSum;
    visitingIndex++;
    return dp(currSum + visitingVal, visitingIndex, coins);
}



console.log(getMaximumConsecutive([1, 11, 11, 1, 1, 11, 11, 1, 11, 111, 1, 1, 111, 11, 1, 11, 1, 11, 1, 1, 1, 1, 1]))