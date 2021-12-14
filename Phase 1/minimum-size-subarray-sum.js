// https://leetcode.com/problems/minimum-size-subarray-sum/


/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    let len = Number.POSITIVE_INFINITY;

    const dp = (pointer, counter = 0, targetLeft = target) => {
        //if (counter >= len) return; 
        if (targetLeft <= 0) len = Math.min(len, counter);
        if (pointer >= nums.length) return;
        else dp(pointer + 1, counter + 1, targetLeft - nums[pointer]);
    }

    for (let i = 0; i < nums.length; i++) {
        dp(i, 0, target);
    }

    return len;
};


let target = 7, nums = [2, 3, 1, 2, 4, 3]

console.log(minSubArrayLen(target, nums))

// Time complexity : O(n^2)



minSubArrayLen = function (target, nums) {
    let pointer = 0;
    let tourist = 0;
    if (nums.length == 0) return 0;

    let minLen = Number.POSITIVE_INFINITY;
    let calSum = 0;

    while (tourist < nums.length) {
        calSum += nums[tourist];

        while (calSum - nums[pointer] >= target) {
            minLen = Math.min(minLen, tourist - pointer + 1);
            calSum -= nums[pointer++];
        }
        tourist++;
    }

    return minLen == Number.POSITIVE_INFINITY ? 0 : minLen;
};

console.log(minSubArrayLen(target, nums))
