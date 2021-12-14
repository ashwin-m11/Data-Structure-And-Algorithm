var inorderTraversal = (root) => {
    // const array = [];
    // dfs(root, array) //recursive
    // return array;

    // const array = [];
    // const stack = []
    // iterative(root, array, stack);
    // return array;

    const array = [];
    morrisTraversal(root, array);
    return array;

}


const dfs = (root, array) => {
    if (root.left != null) dfs(root.left, array);
    array.push(root.val);
    if (root.right != null) dfs(root.right, array);
    return
}

const iterative = (root, array, stack) => {

    while (root != null || stack.length != 0) {
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        array.push(root.val);
        root = root.right;
    }
}

const morrisTraversal = (root, array) => {
    if(!root) return;
    // console.log("HERE");
    // console.log(JSON.stringify(root));
    if (!leftCheck(root)) { array.push(root.val); morrisTraversal(root.right, array); }
    else {
        // console.log("HERE1");
        // console.log(JSON.stringify(root));
        root = updateRoot(root); 
        // console.log("HERE2");
        // console.log(JSON.stringify(root));
        morrisTraversal(root, array);
    }
}


function leftCheck(root) {
    // return root && root.left != null ---check this 
    return root.left != null
}

function rightCheck(root) {
    // return root && root.right != null ---check this 
    return root.right != null
}


function updateRoot(root) {

    //currentRootShiftToRightMostNodeOfLeftNode
    let rightNode = root.left;
    while (rightCheck(rightNode)) {
        rightNode = rightNode.right
    }
    rightNode.right = root;
    root = root.left;
    rightNode.right.left = null;

    return root;
}


console.log(inorderTraversal({ "val": 1, "left": { "val": 5, "left": { "val": 33, "left": null, "right": null }, "right": null }, "right": { "val": 2, "left": { "val": 3, "left": null, "right": null }, "right": null } }))
// console.log(inorderTraversal({ "val": 1, "left": null, "right": { "val": 2, "left": { "val": 3, "left": null, "right": null }, "right": null } }))
// console.log(inorderTraversal({ "val": 1, "left": null, "right": { "val": 2, "left": { "val": 3, "left": null, "right": null }, "right": null } }))
// console.log(inorderTraversal({ "val": 1, "left": null, "right": { "val": 2, "left": { "val": 3, "left": null, "right": null }, "right": null } }))
console.log(inorderTraversal({"val":16,"left":{"val":13,"left":{"val":10,"left":null,"right":{"val":6,"left":{"val":5,"left":null,"right":null},"right":null}},"right":null},"right":{"val":4,"left":{"val":2,"left":null,"right":null},"right":null}}))