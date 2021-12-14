// https://leetcode.com/problems/ones-and-zeroes/
// You are given an array of binary strings strs and two integers m and n.

// Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.

// A set x is a subset of a set y if all elements of x are also elements of y.

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 var findMaxForm = function(strs, m, n) {
    let dp = Array(m+1).fill().map(x => Array(n+1).fill(0));    
    for (let i = 0; i < strs.length; i++){
        let mVal = 0;        
        let nVal = 0;
        let currStr = strs[i];
        for (let i = 0; i < currStr.length; i++ ){
            currStr[i] == "0"? mVal++ : nVal++;
        }
        calBestVal (mVal,nVal)        
    }
    function calBestVal (mVal,nVal) {
        for (let i = m; i >= 0; i-- ){
            for (let j = n; j >= 0; j-- ){
                if(mVal <= i && nVal <= j){
                    dp[i][j] = Math.max(dp[i][j], 1+ dp[i-mVal][j-nVal]);
                }
            }
        }
    }

    return Math.max(...dp.map(x => Math.max(...x)))
};

console.log(findMaxForm(["10","0001","111001","1","0"],5,3)) //4