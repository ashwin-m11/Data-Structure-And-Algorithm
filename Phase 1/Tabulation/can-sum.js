//https://youtu.be/oBt53YbR9Kk?t=5369


const canSum = (targetSum, numbers) => {
    const table = Array(targetSum+1).fill(false);
    table[0] = true;
    for (let i = 0; i < targetSum; i++) {
        if(table[i] === true){
            for (let num of numbers) {
                 table[i+num] = true;
            }
        }        
    }
   return table[targetSum]
}


console.log(canSum(7, [2,3])) //True
console.log(canSum(7, [5,3,4,7])) //True
console.log(canSum(7, [2,4])) //False
console.log(canSum(8, [2,3,5])) //True
console.log(canSum(30000, [7,14])) //False