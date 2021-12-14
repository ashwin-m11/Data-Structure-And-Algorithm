//https://youtu.be/oBt53YbR9Kk?t=5369


const countConstruct = (target, wordBank, memo = {}) => {
    if (target === "") return 1;
    if (target in memo) return memo[target];

    let totalCount = 0
    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length)
            const numWaysForRest = countConstruct(suffix, wordBank, memo);
            totalCount += numWaysForRest
        }
    }

    memo[target] = totalCount;
    return totalCount;
}


console.log(countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]))
console.log(countConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]))
console.log(countConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]))
console.log(countConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeee"
]))
console.log(countConstruct("aaaaaaaaaaaaaaaaaaa", ["a", "aa", "aaa", "aaaa", "aaaaa"]))

