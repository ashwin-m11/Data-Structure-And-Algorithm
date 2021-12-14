//https://community.topcoder.com/stat?c=problem_statement&pm=2940&rd=5854
// The latest version of your favorite adventure game has just been released. On each level you search for stars that earn you points. Simply moving over a location containing stars allows you to acquire them. To help you on your journey, you are given an overhead map of the level in a String[]. Each character in level describes the number of stars at that location. You begin in the upper left spot of the map (character 0 of element 0 of level). On the current stage you must move according to the following rules:
// 1) On the first pass you may only move downward or rightward each move (not diagonally) until you reach the lower right corner.
// 2) The second pass begins in the lower right corner where the first pass ended, and proceeds back to the beginning using only upward and leftward steps (not diagonal).
// 3) The final pass, like the first pass, begins in the upper left corner and proceeds to the lower right corner using only rightward and downward (not diagonal) steps.
// Once the stars on a spot are claimed, they cannot be claimed again on a future pass. Return the largest possible number of stars that can be acquired.

const starAdventure = (matrix) => {
    const length = matrix.length - 1;
    const breadth = matrix[0].length - 1;
    if (breadth <= 2) {
        let sum = 0;
        matrix.forEach(row => {
            row.forEach(val => sum += val)
        });
        return sum;
    }
    // console.log(length, breadth)

    const table = Array(length + 1).fill().map(() => Array(breadth + 1).fill().map(() => Array(breadth + 1).fill().map(() => Array(breadth + 1).fill(0))))
    const sumTable = Array(length + 1).fill().map(() => Array(breadth + 1).fill().map(() => Array(breadth + 1).fill(0)));

    for (let rowIndex = length; rowIndex >= 0; rowIndex--) {
        calSumRow(rowIndex, sumTable, breadth, matrix);
        calRowValues(rowIndex, table, length, breadth, sumTable)
    }
    let maxValue = 0;
    for (let iIndex = breadth - 2; iIndex >= 0; iIndex--) {
        for (let jIndex = breadth - 1; jIndex > iIndex; jIndex--) {
            for (let kIndex = breadth; kIndex > jIndex; kIndex--) {
                maxValue = Math.max(maxValue, table[0][iIndex][jIndex][kIndex])
            }
        }
    }
    return maxValue;
}


function calSumRow(row, sumTable, breadth, matrix) {
    for (let leftIndex = breadth; leftIndex >= 0; leftIndex--) {
        for (let rightIndex = breadth; rightIndex >= leftIndex; rightIndex--) {
            let val = 0;
            for (let currIndex = leftIndex; currIndex <= rightIndex; currIndex++) {
                val += matrix[row][currIndex];
            }
            sumTable[row][leftIndex][rightIndex] = val;
        }
    }
}


function calRowValues(row, table, length, breadth, sumTable) {

    if (row == length) {
        for (let iIndex = breadth - 2; iIndex >= 0; iIndex--) {
            // console.log(iIndex, sumTable[row][iIndex][breadth])
            for (let jIndex = breadth - 1; jIndex > iIndex; jIndex--) {
                for (let kIndex = breadth; kIndex > jIndex; kIndex--) {
                    table[row][iIndex][jIndex][kIndex] = sumTable[row][iIndex][breadth]
                }
            }
        }
    } else {
        for (let iIndex = breadth - 2; iIndex >= 0; iIndex--) {
            for (let jIndex = breadth - 1; jIndex > iIndex; jIndex--) {
                for (let kIndex = breadth; kIndex > jIndex; kIndex--) {
                    let maxValue = 0;
                    for (let iIndexDes = jIndex - 1; iIndexDes >= iIndex; iIndexDes--) {
                        for (let jIndexDes = kIndex - 1; jIndexDes >= jIndex; jIndexDes--) {
                            for (let kIndexDes = breadth; kIndexDes >= kIndex; kIndexDes--) {
                                maxValue = Math.max(maxValue, sumTable[row][iIndex][iIndexDes] + sumTable[row][jIndex][jIndexDes] + sumTable[row][kIndex][kIndexDes] + table[row + 1][iIndexDes][jIndexDes][kIndexDes])
                            }
                        }
                    }
                    table[row][iIndex][jIndex][kIndex] = maxValue;
                }
            }
        }
    }
}


console.log(starAdventure([
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
])) //450

console.log(starAdventure([
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [2, 2, 2, 3, 4, 5, 6, 7, 8, 9],
    [3, 3, 3, 3, 4, 5, 6, 7, 8, 9],
    [4, 4, 4, 4, 4, 5, 6, 7, 8, 9],
    [5, 5, 5, 5, 5, 5, 6, 7, 8, 9],
    [6, 6, 6, 6, 6, 6, 6, 7, 8, 9],
    [7, 7, 7, 7, 7, 7, 7, 7, 8, 9],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
])) //335

console.log(starAdventure([
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2]
])) //21

console.log(starAdventure([
    [0, 1],
    [1, 1]
]))