//https://community.topcoder.com/stat?c=problem_statement&pm=2829&rd=5072

// Given a string of digits, find the minimum number of additions required for the string to equal some target number.
//  Each addition is the equivalent of inserting a plus sign somewhere into the string of digits. 
// After all plus signs are inserted, evaluate the sum as usual. 
// For example, consider the string "12" (quotes for clarity). With zero additions, we can achieve the number 12. If we insert one plus sign into the string, we get "1+2", which evaluates to 3. 
// So, in that case, given "12", a minimum of 1 addition is required to get the number 3. 
// As another example, consider "303" and a target sum of 6. 
// The best strategy is not "3+0+3", but "3+03". You can do this because leading zeros do not change the result.
// Write a class QuickSums that contains the method minSums, which takes a String numbers and an int sum. 
// The method should calculate and return the minimum number of additions required to create an expression from numbers that evaluates to sum. If this is impossible, return -1.

const minSum = (str, sum) => {
    let returnVal = quickSums(str, sum, 0);
    returnVal = returnVal == Number.POSITIVE_INFINITY ? null : returnVal;
    return returnVal;
}

const quickSums = (str, sum, count) => {
    if (str == "" && sum == 0) return count -1;
    if (sum < 0 || str == "") return Number.POSITIVE_INFINITY;

    // console.log(str, sum, count);
    let minCount = Number.POSITIVE_INFINITY;
    for (let i = 0; i <= str.length - 1; i++) {
        const leftVal = Number(str.slice(0, i+1));
        if (leftVal <= sum) {
            minCount = Math.min(minCount, quickSums(str.slice(i+1), sum - leftVal, count + 1))
        }
    }
    return minCount;
}

console.log(minSum("99999", 45)) //4

console.log(minSum("1110", 3)) //3

console.log(minSum("0123456789", 45)) //8

console.log(minSum("99999", 100)) //null

console.log(minSum("382834", 100)) //2

console.log(minSum("9230560001", 71)) //4
