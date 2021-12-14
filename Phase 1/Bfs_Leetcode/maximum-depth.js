// https://leetcode.com/problems/maximum-depth-of-binary-tree/
// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

var maxDepth = function (root) {
    var queue = [];
    queue.push(root);
    if (!root || root.val == null) return 0;
    let level = 0;
    let nodesNextlevelCount = 0;
    let currentLevelNodesLeft = 1;
    while (queue.length > 0) {
        const currentElem = queue.shift();
        currentLevelNodesLeft--;
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
    return level;
};

console.log(maxDepth()) //0
console.log(maxDepth({})) //0
console.log(maxDepth({ "val": 3, "left": { "val": 9, "left": null, "right": null }, "right": { "val": 20, "left": { "val": 15, "left": null, "right": null }, "right": { "val": 7, "left": null, "right": null } } })) //3
console.log(maxDepth({ "val": 3, "left": { "val": 9, "left": { "val": 7, "left": null, "right": null }, "right": { "val": 7, "left": null, "right": null } }, "right": { "val": 20, "left": { "val": 15, "left": null, "right": null }, "right": { "val": 7, "left": null, "right": { "val": 7, "left": null, "right": { "val": 7, "left": { "val": 7, "left": null, "right": null }, "right": null } } } } })) //6


var maxDepth1 = function (root) {
    var queue = [];
    queue.push(root);
    if (!root || root.val == null) return 0;
    let level = 0;
    let nodesNextlevelCount = 0;
    let currentLevelNodesLeft = 1;
    while (queue.length > 0) {
        const currentElem = queue.shift();
        currentLevelNodesLeft--;
        for (const child of currentElem.children) {
            nodesNextlevelCount++;
            queue.push(child);
        }
        if (currentLevelNodesLeft == 0) {
            level++;
            currentLevelNodesLeft = nodesNextlevelCount;
            nodesNextlevelCount = 0;
        }
    }   
    return level;
};

console.log(maxDepth1({"val":1,"children":[{"val":3,"children":[{"val":5,"children":[]},{"val":6,"children":[]}]},{"val":2,"children":[]},{"val":4,"children":[]}]}))