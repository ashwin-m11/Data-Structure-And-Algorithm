// https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/

const NQueen = (n) => {
    var sol = Array(n).fill().map(() => Array(n).fill(0));
    var rows = Array(n).fill(0);
    var columns = Array(n).fill(0);
    if (solveUtil(sol, n, 0, rows, columns)) return sol;
    return null;
}

const solveUtil = (sol, n, queenCount, rows, columns) => {
    if (queenCount === n) return true;
    let i = 0;
    let j = 0;
    while (i < n) {
        if (rows[i] === 1) { i++; continue; }
        rows[i] = 1;
        while (j < n) {
            if (columns[j] === 1) { j++; continue; }
            if(isDiagonallyUnderRador(i,j, sol, n)) {console.log("HERE") ;j++; continue; }
            sol[i][j] = 1;
            columns[j] = 1;
            if (solveUtil(sol, n, queenCount + 1, rows, columns)) return true;
            else {
                sol[i][j] = 0;
                columns[j] = 0;
            }
            j++;
        }
        rows[i] = 0;
        i++;
    }
    return false;
}


const isDiagonallyUnderRador = (i1, j1, sol, n) => {
    for (i = i1, j = j1; i >= 0 && j >= 0; i--, j--)
        if (sol[i][j] == 1) return true

    // for (i = i1, j = j1; i >= 0 && j < n; i--, j++)
        // if (sol[i][j] == 1) return true

    for (i = i1, j = j1; i < n && j >= 0; i++, j--)
        if (sol[i][j] == 1) return true

    // for (i = i1, j = j1; i < n && j < n; i++, j++)
    //     if (sol[i][j] == 1) return true

    return false;
}

console.log(NQueen(15))