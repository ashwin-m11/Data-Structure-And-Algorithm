// https://leetcode.com/problems/maximum-binary-tree/

var noOfOperation = { count: 0 }

var constructMaximumBinaryTree = function (nums) {
    const stack = [];
    stack.push(new TreeNode(nums[0]));
    let counter = 1;

    while (true) {
        while (counter < nums.length) {
            //variable declaration
            let stackLength = stack.length - 1;
            let topNode = null;

            //finding position for value greater than new node to be inserted
            while (stackLength >= 0) {
                noOfOperation.count++;
                if (stack[stackLength].val > nums[counter]) break;
                stack[stackLength].right = topNode;
                topNode = stack.pop();
                stackLength--;
            }
            stack.push(new TreeNode(nums[counter], topNode));
            counter++;
        }
        if (stack.length == 1) break;
        const node = stack.pop();
        stack[stack.length - 1].right = node;
    }
    return stack[0]
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
constructMaximumBinaryTree(abc(10000))
console.log(noOfOperation);
console.log(new Date())

// TimeComplexity O(n)
// Space Complexity O(n)





