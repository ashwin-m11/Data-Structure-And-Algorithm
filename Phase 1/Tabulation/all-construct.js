//https://youtu.be/oBt53YbR9Kk?t=5369


const allConstruct = (target, wordBank) => {
    const table = Array(target.length + 1).fill().map(() => []);
    table[0] = [[]]

    for (let i = 0; i < target.length; i++) {
        for (let word of wordBank) {
            if (target.slice(i).indexOf(word) === 0) {
                for (let construct of table[i]) {
                    table[i + word.length].push([...construct, word])
                }
            }
        }
    }
    return table[target.length]
}


console.log(allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]))
console.log(allConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]))
console.log(allConstruct("purple", ["purp", "p", "ur", "le", "purpl"]))
console.log(new Date())
console.log(allConstruct("aaaaaaaaaaaaaaaaaaaaaz", ["a", "aa", "aaa", "aaaa", "aaaaa"]))
console.log(new Date())
console.log(allConstruct("aaaaaaaaaaaaaaaaaaa", ["a", "aa", "aaa", "aaaa", "aaaaa"]).length)  //this is the worst case scenario where you have to iterate on massive length of the array
console.log(new Date())

