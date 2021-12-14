// https://leetcode.com/problems/24-game/

// You are given an integer array cards of length 4. You have four cards, each containing a number in the range [1, 9]. You should arrange the numbers on these cards in a mathematical expression using the operators ['+', '-', '*', '/'] and the parentheses '(' and ')' to get the value 24.

// You are restricted with the following rules:

// The division operator '/' represents real division, not integer division.
// For example, 4 / (1 - 2 / 3) = 4 / (1 / 3) = 12.
// Every operation done is between two numbers. In particular, we cannot use '-' as a unary operator.
// For example, if cards = [1, 1, 1, 1], the expression "-1 - 1 - 1 - 1" is not allowed.
// You cannot concatenate numbers together
// For example, if cards = [1, 2, 1, 2], the expression "12 + 12" is not valid.
// Return true if you can get such expression that evaluates to 24, and false otherwise.


function operate(x, y) {
    const arr = []
    for (const operator of ["+", "-", "*", "/"]) {
        arr.push(...operation(x, y, operator));
    }
    return arr;
}


function operation(x, y, operator) {
    switch (operator) {
        case "+":
            return [x + y];
        case "-":
            return [x - y, y - x];
        case "*":
            return [x * y];
        case "/":
            if (y == 0) return x == 0 ? [] : [y / x];
            if (x == 0) return [x / y];
            return [x / y, y / x];
        default:
            return [];
    }
}



//this solution won't work because I am always considering one entry point (one card) to the current operating value. But it's possible that entry point is not the card value but 
// the operated value (value calculated from 2 card value)  Example : 1,9,1,2. Here solution is (9-1)*(2+1) 
var judgePoint24 = function (cards) {
    cards = cards.map(card => Number(card.toFixed(4)));
    console.log(cards);
    function dfs(cardVisited = [], valArr = [], count = 0) {
        if (count == 4 && valArr.includes(24)) return true;

        for (let i = 0; i < cardVisited.length; i++) {
            if (!cardVisited[i]) {
                cardVisited[i] = 1;

                const newValArr = [];
                if (valArr.length == 0) newValArr.push(cards[i]);
                for (const val of valArr) {
                    newValArr.push(...operate(val, cards[i]));
                }
                if (dfs(cardVisited, newValArr, count + 1)) return true;

                cardVisited[i] = 0;
            }
        }
        return false;
    }

    return dfs([0, 0, 0, 0]);
};

console.log(judgePoint24([1, 9, 1, 2]))



var judgePoint24Corrected = function (cards) {
    cards = cards.map(card => Number(card.toFixed(4)));
    // console.log(cards);
    function dfs(list) {

        // if list has only 1 value that means all numbers are operated
        if (list.length == 1) return Math.abs(list[0] - 24) < 0.002;


        for (let i = 0; i < list.length; i++) {
            for (let j = i + 1; j < list.length; j++) {
                let newList = []
                for (let k = 0; k < list.length; k++) {
                    if (k != i && k != j) newList.push(list[k]);
                }
                for (let newVal of operate(list[i], list[j])) {
                    newList.push(newVal);
                    if (dfs(newList)) return true;
                    else newList.pop();
                }
            }
        }
        // console.log("I am here")
        return false;
    }

    return dfs(cards);
};

console.log(judgePoint24Corrected([1, 9, 1, 2]))
console.log(judgePoint24Corrected([6, 6, 6, 6]))
