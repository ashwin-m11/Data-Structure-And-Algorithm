//https://youtu.be/oBt53YbR9Kk?t=5369


const allConstruct = (target, wordBank, memo = {}) => {
    if (target === "") return [[]];
    if(target in memo) return memo[target];

    let allCombination = [];
    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            const suffixCombination = allConstruct(suffix, wordBank, memo);
            // for (const key in suffixCombination) {
            //     allCombination.push([word, ...suffixCombination[key]])
            // }
            allCombination.push(...suffixCombination.map(way => [word, ...way]))
        }
    }
    memo[target] = allCombination;
    return allCombination;
}


console.log(allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]))
console.log(allConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]))
console.log(allConstruct("purple", ["purp", "p", "ur", "le", "purpl"]))
console.log(new Date())
console.log(allConstruct("aaaaaaaaaaaaaaaaaaaaaz", ["a", "aa", "aaa", "aaaa", "aaaaa"]))
console.log(new Date())
console.log(allConstruct("aaaaaaaaaaaaaaaaaaa", ["a", "aa", "aaa", "aaaa", "aaaaa"]).length)  //this is the worst case scenario where you have to iterate on massive length of the array
console.log(new Date())
