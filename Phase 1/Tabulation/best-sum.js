//https://youtu.be/oBt53YbR9Kk?t=5369


const bestSum = (targetSum, numbers) => {
    const table = Array(targetSum + 1).fill(null);
    table[0] = []

    for (let i = 0; i < targetSum; i++) {
        if (table[i] !== null) {
            for (let num of numbers) {
                if (!table[i + num]) { table[i + num] = [...table[i], num] }
                else if (table[i + num].length > table[i].length + 1) table[i + num] = [...table[i], num]
            }
        }
    }
    return table[targetSum]
}


console.log(bestSum(7, [2, 3]))
console.log(bestSum(7, [5, 3, 4, 7]))
console.log(bestSum(7, [2, 4]))
console.log(bestSum(8, [2, 3, 5]))
console.log(bestSum(30, [7, 14, 30]))