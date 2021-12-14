// https://leetcode.com/problems/minimum-depth-of-binary-tree/
// Given a binary tree, find its minimum depth.

// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

// Note: A leaf is a node with no children.

var minDepth = function (root) {
    var queue = [];
    queue.push(root);
    if (!root || root.val == null) return 0;
    let level = 1;
    let nodesNextlevelCount = 0;
    let currentLevelNodesLeft = 1;
    while (true) {
        const currentElem = queue.shift();
        currentLevelNodesLeft--;
        if (currentElem.left == null && currentElem.right == null) return level;
        if (currentElem.left != null) {
            nodesNextlevelCount++;
            queue.push(currentElem.left);
        }
        if (currentElem.right != null) {
            nodesNextlevelCount++;
            queue.push(currentElem.right);
        }
        if (currentLevelNodesLeft == 0) {
            level++;
            currentLevelNodesLeft = nodesNextlevelCount;
            nodesNextlevelCount = 0;
        }
    }
};

console.log(minDepth()) //0
console.log(minDepth({})) //0
console.log(minDepth({ "val": 3, "left": { "val": 9, "left": null, "right": null }, "right": { "val": 20, "left": { "val": 15, "left": null, "right": null }, "right": { "val": 7, "left": null, "right": null } } })) //2
console.log(minDepth({ "val": 3, "left": { "val": 9, "left": { "val": 7, "left": null, "right": null }, "right": { "val": 7, "left": null, "right": null } }, "right": { "val": 20, "left": { "val": 15, "left": null, "right": null }, "right": { "val": 7, "left": null, "right": null } } })) //3