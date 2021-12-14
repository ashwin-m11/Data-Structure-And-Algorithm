// https://www.spoj.com/problems/JNEXT/

// DevG likes too much fun to do with numbers. 
// Once his friend Arya came and gave him a challenge, he gave DevG an array of digits which is forming a number currently (will be called as given number). 
// DevG was challanged to find the just next greater number which can be formed using digits of given number. 
// Now DevG needs your help to find that just next greater number and win the challenge.


function nextNumber(num) {
    num = num.toString().split("");
    let stack = [num.pop()];
    while (true) {
        let val = num.pop();
        if (val >= stack[stack.length - 1]) stack.push(val);
        else {
            let pointer = stack.length - 1;
            while (val < stack[pointer] && pointer >= 0) {
                pointer--;
            }
            [val, stack[pointer + 1]] = [stack[pointer + 1], val]
            stack = [val, ...stack];
            break;
        }
        if (num.length == 0) return null;
    }

    return num.join("") + stack.join("")
}


console.log(nextNumber(15483)) //15834
console.log(nextNumber(1474584126)) //1474584162
console.log(nextNumber(7774321)) //null
console.log(nextNumber(6774321)) //7123467
