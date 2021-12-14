// https://community.topcoder.com/stat?c=problem_statement&pm=1592&rd=4482
//Suppose you had an n by n chess board and a super piece called a kingknight. Using only one move the kingknight denoted 'K' below can reach any of the spaces denoted 'X' or 'L' below:
// .......
// ..L.L..
// .LXXXL.
// ..XKX..
// .LXXXL.
// ..L.L..
// .......
// In other words, the kingknight can move either one space in any direction (vertical, horizontal or diagonally) or can make an 'L' shaped move. An 'L' shaped move involves moving 2 spaces horizontally then 1 space vertically or 2 spaces vertically then 1 space horizontally. In the drawing above, the 'L' shaped moves are marked with 'L's whereas the one space moves are marked with 'X's. In addition, a kingknight may never jump off the board.



// Given the size of the board, the start position of the kingknight and the end position of the kingknight, your method will return how many possible ways there are of getting from start to end in exactly numMoves moves. start and finish are int[]s each containing 2 elements. The first element will be the (0-based) row position and the second will be the (0-based) column position. Rows and columns will increment down and to the right respectively. The board itself will have rows and columns ranging from 0 to size-1 inclusive.



// Note, two ways of getting from start to end are distinct if their respective move sequences differ in any way. In addition, you are allowed to use spaces on the board (including start and finish) repeatedly during a particular path from start to finish. We will ensure that the total number of paths is less than or equal to 2^63-1 (the upper bound for a long).

const howMany = (size, start = [0, 0], end, numMoves) => {
    const memo = {};
    return count(size, start[0], start[1], end[0], end[1], numMoves, memo, () => {
        let k = 0;
        for (const key in memo) { k++; }
        console.log("k:", k);
    });
}


const count = (size, i, j, iEnd, jEnd, numMovesLeft, memo = {}, fn) => {
    //base Case
    const key = i.toString().concat(",", j, ",", numMovesLeft)
    if (key in memo) return memo[key];
    if (i < 0 || i >= size || j < 0 || j >= size) return 0;
    if (numMovesLeft == 0) {
        if (i == iEnd && j == jEnd) { memo[key] = 1; return 1; }
        else { memo[key] = 0; return 0; }
    }
    if (Math.abs(i - iEnd) + Math.abs(j - jEnd) > numMovesLeft * 3) return 0

    memo[key] =
        count(size, i - 1, j, iEnd, jEnd, numMovesLeft - 1, memo) + count(size, i + 1, j, iEnd, jEnd, numMovesLeft - 1, memo) + count(size, i, j - 1, iEnd, jEnd, numMovesLeft - 1, memo) + count(size, i, j + 1, iEnd, jEnd, numMovesLeft - 1, memo)
        + count(size, i - 1, j - 1, iEnd, jEnd, numMovesLeft - 1, memo) + count(size, i - 1, j + 1, iEnd, jEnd, numMovesLeft - 1, memo) + count(size, i + 1, j - 1, iEnd, jEnd, numMovesLeft - 1, memo) + count(size, i + 1, j + 1, iEnd, jEnd, numMovesLeft - 1, memo)
        + count(size, i - 1, j - 2, iEnd, jEnd, numMovesLeft - 1, memo) + count(size, i - 1, j + 2, iEnd, jEnd, numMovesLeft - 1, memo) + count(size, i + 1, j - 2, iEnd, jEnd, numMovesLeft - 1, memo) + count(size, i + 1, j + 2, iEnd, jEnd, numMovesLeft - 1, memo)
        + count(size, i - 2, j - 1, iEnd, jEnd, numMovesLeft - 1, memo) + count(size, i - 2, j + 1, iEnd, jEnd, numMovesLeft - 1, memo) + count(size, i + 2, j - 1, iEnd, jEnd, numMovesLeft - 1, memo) + count(size, i + 2, j + 1, iEnd, jEnd, numMovesLeft - 1, memo);

    if (fn) fn();
    return memo[key];

}


console.log(howMany(3, [0, 0], [1, 0], 1)) //1

console.log(howMany(3, [0, 0], [1, 2], 1)) //1

console.log(howMany(3, [0, 0], [2, 2], 1)) //0

console.log(howMany(3, [0, 0], [0, 0], 2)) //5

console.log(howMany(100, [0, 0], [0, 99], 50)) //243097320072600

