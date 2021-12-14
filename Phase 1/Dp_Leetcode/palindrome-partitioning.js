//https://leetcode.com/problems/palindrome-partitioning/


//top down
const palindromPartioning = (str, memo = {}, count = { "val": 0 }) => {
    if (str in memo) { console.log("HERE"); return memo[str]; }
    let len = str.length;
    if (len === 0) return [[]];
    if (len === 1) return [[str]];
    let sol = [];
    for (let i = 1; i <= len; i++) {
        const firstPart = str.slice(0, i);
        const secondPart = str.slice(i);
        if (isPalindrome(firstPart)) {
            count["val"]++;
            const secondPartValues = palindromPartioning(secondPart, memo, count);
            for (const arr of secondPartValues) {
                sol.push([firstPart, ...arr]);
            }
        }
    }
    memo[str] = sol;
    console.log(count);
    return sol;
}

function isPalindrome(str) {
    let len = str.length;
    for (let i = 0; i < len / 2; i++) {
        if (str[i] != str[len - 1 - i]) return false;
    }
    return true;
}

// bottomsUp

const palindromPartioningBottomsUp = (str, count = { "val": 0 }) => {
    let table = Array(str.length + 1).fill().map(() => []);
    table[str.length] = [[]];
    for (let i = str.length - 1; i >= 0; i--) {
        for (let j = i + 1; j <= str.length; j++) {
            if (isPalindrome(str.slice(i, j))) {
                count["val"]++;
                table[j].forEach(solutionFromJ => {
                    table[i].push([str.slice(i, j), ...solutionFromJ])
                })
            }
        }
    }
    console.log(count);
    return table[0];
}

console.log(palindromPartioning("acbbcaababa"))
console.log(palindromPartioningBottomsUp("acbbcaababa"))

