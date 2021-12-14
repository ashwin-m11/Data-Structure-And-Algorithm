// https://leetcode.com/problems/maximum-binary-tree/

var noOfOperation = { count: 0 }

var constructMaximumBinaryTree = function (nums) {
    return constructTree(nums, 0, nums.length - 1)
}

function constructTree(nums, l, r) {
    if (l > r) return null
    const maxValueIndex = findMax(nums, l, r);
    return new TreeNode(nums[maxValueIndex], constructTree(nums, l, maxValueIndex - 1), constructTree(nums, maxValueIndex + 1, r))
}

function findMax(nums, l, r) {
    if (l == r) return l;
    let maxValueIndex = l;
    let i = l;
    while (i < r) {
        noOfOperation.count++;
        i++;
        if (nums[i] > nums[maxValueIndex]) maxValueIndex = i;
    }
    return maxValueIndex;
}

class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function abc(x) {
    var arr = [];
    while (arr.length < x) {
        var r = Math.floor(Math.random() * 1000000) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

// console.log(JSON.stringify(constructMaximumBinaryTree([3, 2, 1, 6, 0, 5])))
// console.log(JSON.stringify(constructMaximumBinaryTree(abc())))

console.log(new Date())
constructMaximumBinaryTree(abc(100))
console.log(noOfOperation);
console.log(new Date())

// TimeComplexity O(n*n)
// Space Complexity O(n)





