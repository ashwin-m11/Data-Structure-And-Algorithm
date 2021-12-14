// Given inorder and postOrder/preOrder traversal , construct the tree
class Node {
    constructor(val, left, right) {
        this.val = val;
        this.left = left == undefined ? null : left;
        this.right = right == undefined ? null : right;
    }
}

const constructTree = (inorderArray, postOrderArray, preOrderArray) => {
    const inorderDict = {};
    for (let index = 0; index < inorderArray.length; index++) {
        inorderDict[inorderArray[index]] = index;
    }

    function constructSubTree(l, r) {
        const val = postOrderArray ? postOrderArray[r] : preOrderArray[l];
        let nodePos = inorderDict[val];
        let countLeftNodes = 0;
        let countRightNodes = 0;
        // console.log(val, l, r)

        const diff = r - l;
        if (diff < 0) return undefined; //base case
        if (diff == 0) return new Node(val); //base case

        // updating null and counting left nodes for a given root
        inorderArray[nodePos] = null;
        nodePos--;
        while (inorderArray[nodePos] || inorderArray[nodePos] == 0) {
            nodePos--
            countLeftNodes++;
        }
        // nodePos++;
        // while (inorderArray[nodePos] || inorderArray[nodePos] == 0) {
        //     nodePos++;
        //     countRightNodes++;
        // }
        // countLeftNodes = r-l-countRightNodes;

        if (postOrderArray) return new Node(val, constructSubTree(l, l + countLeftNodes - 1), constructSubTree(l + countLeftNodes, r - 1))
        return new Node(val, constructSubTree(l + 1, l + countLeftNodes), constructSubTree(l + countLeftNodes + 1, r))
    };

    return constructSubTree(0, inorderArray.length - 1);
}

console.log(JSON.stringify(constructTree([10, 6, 5, 13, 16, 4, 2], [5, 6, 10, 13, 2, 4, 16])))
// //{"val":16,"left":{"val":13,"left":{"val":10,"left":null,"right":{"val":6,"left":null,"right":{"val":5,"left":null,"right":null}}},"right":null},"right":{"val":4,"left":null,"right":{"val":2,"left":null,"right":null}}}

// console.log(JSON.stringify(constructTree([3, 9, 8, 14, 11, 7, 2, 19, 10, 6, 5, 13, 16, 4], [3, 8, 9, 2, 7, 11, 14, 5, 6, 10, 13, 4, 16, 19])))
//{"val":19,"left":{"val":14,"left":{"val":9,"left":{"val":3,"left":null,"right":null},"right":{"val":8,"left":null,"right":null}},"right":{"val":11,"left":null,"right":{"val":7,"left":null,"right":{"val":2,"left":null,"right":null}}}},"right":{"val":16,"left":{"val":13,"left":{"val":10,"left":null,"right":{"val":6,"left":null,"right":{"val":5,"left":null,"right":null}}},"right":null},"right":{"val":4,"left":null,"right":null}}}

// console.log(JSON.stringify(constructTree([3, 9, 8, 14, 11, 7, 2, 19, 10, 6, 5, 13, 16, 4], null, [19, 14, 9, 3, 8, 11, 7, 2, 16, 13, 10, 6, 5, 4])))
//{"val":19,"left":{"val":14,"left":{"val":9,"left":{"val":3,"left":null,"right":null},"right":{"val":8,"left":null,"right":null}},"right":{"val":11,"left":null,"right":{"val":7,"left":null,"right":{"val":2,"left":null,"right":null}}}},"right":{"val":16,"left":{"val":13,"left":{"val":10,"left":null,"right":{"val":6,"left":null,"right":{"val":5,"left":null,"right":null}}},"right":null},"right":{"val":4,"left":null,"right":null}}}
