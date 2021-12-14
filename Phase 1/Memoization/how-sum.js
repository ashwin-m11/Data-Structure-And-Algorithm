//https://youtu.be/oBt53YbR9Kk?t=5369


const howSum = (targetSum, numbers, memo = {}) => {
    
    if(targetSum === 0) return [];
    if(targetSum < 0) return null;
    if(targetSum in memo) return memo[targetSum];

    for (let num of numbers){
        const remainder = targetSum - num;
        const remainerResult = howSum(remainder, numbers, memo);
        if(remainerResult !== null) {
            memo[targetSum] =  [...remainerResult, num];
            return memo[targetSum]
        }
    }
    memo[targetSum] = null;
    return null;
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

console.log(howSum(7, [2,3]))
console.log(howSum(7, [5,3,4,7]))
console.log(howSum(7, [2,4]))
console.log(howSum(8, [2,3,5]))
console.log(howSum(30000, [7,14]))