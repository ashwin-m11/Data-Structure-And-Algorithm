// https://leetcode.com/problems/generate-parentheses/

//Method 1
var generateParenthesis = function (n) {
    validCombinations = [];
    generateAll("", validCombinations, n, 0, 0);
    return validCombinations;
};

var generateAll = (combination, validCombinations, n, openBracketCount, closedBracketCount) => {
    if (openBracketCount > n || closedBracketCount > openBracketCount) return;
    if (combination.length != n * 2) {
        generateAll(combination + "(", validCombinations, n, openBracketCount + 1, closedBracketCount);
        generateAll(combination + ")", validCombinations, n, openBracketCount, closedBracketCount + 1);
    } else {
         validCombinations.push(combination)
    }
}

var valid = (str) => {
    let balance = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "(") balance++;
        else balance--;
        if (balance < 0) return false;
    }
    return (balance === 0)
}

//Method 2 Closures

var generateParenthesisUsingClosure = (n) => {
    let validCombinations = [];
    if (n === 0) return [""];
    for (let c = 0; c < n; c++) {
        var firstClosure = generateParenthesisUsingClosure(c);
        for (const firstVal of firstClosure) {
            for (const secondVal of generateParenthesisUsingClosure(n - c - 1)) {
                validCombinations.push("(" + firstVal + ")" + secondVal)
            }
        }
    }
    return validCombinations
}

console.log(generateParenthesis(5))
// console.log(generateParenthesisUsingClosure(2))
// console.log(generateParenthesisUsingClosure(3))
// console.log(generateParenthesisUsingClosure(4))
// console.log(generateParenthesisUsingClosure(5))