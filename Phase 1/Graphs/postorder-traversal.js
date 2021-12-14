var postorderTraversal = (root) => {
    // const array = [];
    // dfs(root, array) //recursive
    // return array;

    // const array = [];
    // const stack = []
    // iterative(root, array, stack);
    // return array;

    const array = [];
    morrisTraversal(root, array);
    return array.reverse();

}


const dfs = (root, array) => {
    if (root.left != null) dfs(root.left, array);
    if (root.right != null) dfs(root.right, array);
    array.push(root.val);
    return
}

const iterative = (root, array, stack) => {

    while (root != null || stack.length != 0) {
        // console.log(root, array);
        while (root != null && (root.right || root.left)) {
            stack.push({ val: root.val, right: null, left: null });
            if (root.right) stack.push(root.right);
            root = root.left;
        }
        if (root) array.push(root.val);
        root = stack.pop();
    }
}

const morrisTraversal = (root, array) => {
    while (root != null) {
        console.log(root)
        array.push(root.val);
        const leftCheckBool = leftCheck(root);
        const rightCheckBool = rightCheck(root);
        if (leftCheckBool && rightCheckBool) {
            root = updateRoot(root)
        } else if (leftCheckBool) {
            root = root.left;
        } else if (rightCheckBool) {
            root = root.right;
        } else break;
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

    //leftNodeShiftedToLeftMostNodeOfRightNode
    let leftMostNode = root.right;
    while (leftCheck(leftMostNode)) {
        leftMostNode = leftMostNode.left
    }
    leftMostNode.left = root.left;
    root.left = null;
    root = root.right;
    return root;
}


console.log(postorderTraversal({ "val": 1, "left": { "val": 5, "left": { "val": 33, "left": null, "right": null }, "right": null }, "right": { "val": 2, "left": { "val": 3, "left": null, "right": null }, "right": null } }))
// console.log(postorderTraversal({ "val": 1, "left": null, "right": { "val": 2, "left": { "val": 3, "left": null, "right": null }, "right": null } }))
// console.log(postorderTraversal({ "val": 1, "left": null, "right": { "val": 2, "left": { "val": 3, "left": null, "right": null }, "right": null } }))
// console.log(postorderTraversal({ "val": 1, "left": null, "right": { "val": 2, "left": { "val": 3, "left": null, "right": null }, "right": null } }))