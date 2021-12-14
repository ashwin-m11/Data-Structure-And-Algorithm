//https://youtu.be/oBt53YbR9Kk?t=5369


const bestSum = (targetSum, numbers, memo = {}) => {
    
    if(targetSum === 0) return [];
    if(targetSum < 0) return null;
    if(targetSum in memo) return memo[targetSum];

    let shortestCombination = null;
    for (let num of numbers){
        const remainder = targetSum - num;
        const remainerResult = bestSum(remainder, numbers, memo);
        if(remainerResult !== null && (shortestCombination == null || remainerResult.length + 1 < shortestCombination.length)) {
            // memo[targetSum] =  [...remainerResult, num];
            shortestCombination = [...remainerResult, num];
            // return memo[targetSum]
        }
    }
    memo[targetSum] =  shortestCombination;
    return shortestCombination;
}


// m=targetSum
// n = numbers.length 
//
// time: O(n^m*m)
// space: O(m)

// Memoized
// m=targetSum
// n = numbers.length 
//
// time: O(n*m *m)
// space: O(m + m*m)

console.log(bestSum(7, [2,3]))
console.log(bestSum(7, [5,3,4,7]))
console.log(bestSum(7, [2,4]))
console.log(bestSum(8, [2,3,5]))
console.log(bestSum(30, [7,14, 30]))