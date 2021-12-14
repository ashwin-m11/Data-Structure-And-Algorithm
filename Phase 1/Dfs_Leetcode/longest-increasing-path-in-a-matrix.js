//https://leetcode.com/problems/longest-increasing-path-in-a-matrix/
// Given an m x n integers matrix, return the length of the longest increasing path in matrix.

// From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).



// Example 1:


// Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
// Output: 4
// Explanation: The longest increasing path is [1, 2, 6, 9].



var longestIncreasingPath = function (matrix) {
    let maxCount = 0;
    const length = matrix.length - 1;
    const breadth = length >= 0 ? matrix[0].length - 1 : 0;
    const dict = Array(length+1).fill().map(() => Array(breadth+1).fill(null));
    for (let i = 0; i <= length; i++) {
        for (let j = 0; j <= breadth; j++) {
            if(dict[i][j] == null){
                maxCount = Math.max(maxCount, dfs(matrix, i, j, length, breadth, dict))
            }
        }
    }
    return maxCount;
};



function dfs(matrix, i, j, length, breadth, dict = {}) {
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    let count = 1;
    for (let [iAdd, jAdd] of directions) {
        const iNew = i + iAdd;
        const jNew = j + jAdd;
        if (!(iNew < 0 || iNew > length || jNew < 0 || jNew > breadth) && matrix[iNew][jNew] > matrix[i][j]) {
                const newCount =  dict[iNew][jNew] == null ? 1+dfs(matrix, iNew, jNew, length, breadth, dict) : 1+dict[iNew][jNew];
                count = Math.max(count, newCount)
        }
    }
    dict[i][j] = count;
    return count;
}

console.log(longestIncreasingPath([[9,9,4],[6,6,8],[2,1,1]]))
console.log(longestIncreasingPath([[3,4,5],[3,2,6],[2,2,1]]))