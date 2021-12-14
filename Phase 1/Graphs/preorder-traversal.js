var preorderTraversal = (root) => {
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
    array.push(root.val);
    if (root.left != null) dfs(root.left, array);
    if (root.right != null) dfs(root.right, array);
    return
}

const iterative = (root, array, stack) => {

    while (root != null || stack.length != 0) {
       while(root != null){
           array.push(root.val);
           if(root.right) stack.push(root.right)
           root = root.left;
       }
       root = stack.pop();
    }
}

const morrisTraversal = (root, array) => {
    if(!root) return;
    array.push(root.val)
    // console.log("HERE");
    // console.log(JSON.stringify(root));
    if (!leftCheck(root)) { morrisTraversal(root.right, array); }
    else {
        // console.log("HERE1");
        // console.log(JSON.stringify(root));
        root = updateRightNode(root); 
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


function updateRightNode(root) {

    //rightNodeShiftedToRightMostNodeOfLeftNode
    let rightMostNode = root.left;
    while (rightCheck(rightMostNode)) {
        rightMostNode = rightMostNode.right
    }
    rightMostNode.right = root.right;;
    root = root.left;
    return root;
}


console.log(preorderTraversal({ "val": 1, "left": { "val": 5, "left": { "val": 33, "left": null, "right": null }, "right": null }, "right": { "val": 2, "left": { "val": 3, "left": null, "right": null }, "right": null } }))
// console.log(preorderTraversal({ "val": 1, "left": null, "right": { "val": 2, "left": { "val": 3, "left": null, "right": null }, "right": null } }))
// console.log(preorderTraversal({ "val": 1, "left": null, "right": { "val": 2, "left": { "val": 3, "left": null, "right": null }, "right": null } }))
// console.log(preorderTraversal({ "val": 1, "left": null, "right": { "val": 2, "left": { "val": 3, "left": null, "right": null }, "right": null } }))
console.log(preorderTraversal({"val":19,"left":{"val":14,"left":{"val":9,"left":{"val":3,"left":null,"right":null},"right":{"val":8,"left":null,"right":null}},"right":{"val":11,"left":null,"right":{"val":7,"left":null,"right":{"val":2,"left":null,"right":null}}}},"right":{"val":16,"left":{"val":13,"left":{"val":10,"left":null,"right":{"val":6,"left":null,"right":{"val":5,"left":null,"right":null}}},"right":null},"right":{"val":4,"left":null,"right":null}}}))