//https://youtu.be/oBt53YbR9Kk?t=5369


const canConstruct = (target, wordBank) => {
    const table = Array(target.length + 1).fill(false);
    table[0] = true;

    for (let i = 0; i < target.length; i++) {
        if (table[i] === true) {
            for (let word of wordBank) {
                if (target.slice(i).indexOf(word) === 0) table[i + word.length] = true;
            }
        }
    }
    return table[target.length]
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

console.log(canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]))
console.log(canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]))
console.log(canConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]))
console.log(canConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeee"
]))
