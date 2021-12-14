// https://leetcode.com/problems/diameter-of-binary-tree/

//   Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}


//  * @param {TreeNode} root
//  * @return {number}
//  */
var diameterOfBinaryTree = function (root) {
    var maxValue = 0;
    function calLengthNode(node) {
        if (node == null) return -1;
        let leftLength = 1 + calLengthNode(node.left)
        let rightLength = 1 + calLengthNode(node.right)
        maxValue = Math.max(maxValue, leftLength + rightLength)
        return Math.max(leftLength, rightLength);
    }
    calLengthNode(root);
    return maxValue
};





console.log(diameterOfBinaryTree({ "val": 1, "left": { "val": 2, "left": { "val": 4, "left": null, "right": null }, "right": { "val": 5, "left": null, "right": null } }, "right": { "val": 3, "left": null, "right": null } }))
console.log(diameterOfBinaryTree({ "val": 1, "left": { "val": 2, "left": null, "right": null }, "right": null }))