const fib = (n) => {
    return exponentialSolFibonachi(n)[0][0]
}

const fib1 = (n, memo = {}) => {
    if (n <= 1) return 1
    if (n in memo) return memo[n]
    memo[n] = fib1(n - 1, memo) + fib1(n - 2, memo);
    return memo[n]
}

const exponentialSolFibonachi = (n, memo = {}) => {
    console.log(memo)
    if (n in memo) return memo[n];
    if (n <= 1) return [[1, 1], [1, 0]];
    if (n % 2 == 0) {
        memo[n] = MatrixMultiplication(exponentialSolFibonachi(n / 2, memo), exponentialSolFibonachi(n / 2, memo))
        return memo[n];
    }
    memo[n] = MatrixMultiplication(MatrixMultiplication(exponentialSolFibonachi((n - 1) / 2, memo), exponentialSolFibonachi((n - 1) / 2), memo), [[1, 1], [1, 0]])
    return memo[n];
}



const MatrixMultiplication = (A, B) => {
    C = Array(A.length).fill().map(() => Array(B[0].length));
    for (let i = 0; i < C.length; i++) {
        for (let j = 0; j < C[0].length; j++) {
            let val = 0;
            // console.log(A[i])
            for (const iKey in A[i]) {
                val = val + A[i][iKey] * B[iKey][j]
            }
            C[i][j] = val;
        }
    }
    return C
}

// let A  = [[1, 1, 6], [1, 0, 4]]
// let B  = [[1, 6,1, 1], [-8, 6,1,1],[5, 6, 1,1]]
// console.log(MatrixMultiplication(A, B))
// console.log(MatrixMultiplication([[1,2], [3,4]], [[1,4], [3,5]]))

// let A  = [[1, 1, 6], [1, 0, 4]]
// let B  = [[1, 6,1, 1], [-8, 6,1,1],[5, 6, 1,1]]
// console.log(exponentialSolFibonachi(3))


// console.log(fib(3))
// console.log(fib(4))
// console.log(fib(5))
// console.log(fib(6))
// console.log(fib(7))
console.log(fib(110))
console.log(fib1(110))