
const exist = new Map()

function minSpace(pi, favArr = []) {
    for (const str of favArr) {
        exist[str] = true;
    }
    return check(pi, 0) - 1;
}

function check(pi, pos, memo = {}) {
    if (pos in memo) return memo[pos];

    let str = "";
    let minSpace = Number.POSITIVE_INFINITY;

    if (pos == pi.length) return 0; //base case

    for (let i = pos; i <= pi.length; i++) {
        str = str + pi[i];
        if (exist[str]) {
            const space = check(pi, i + 1, memo);
            if (space != -1) {
                minSpace = Math.min(minSpace, 1 + space)
            }
        }
    }

    memo[pos] = minSpace == Number.POSITIVE_INFINITY ? -1 : minSpace;
    return memo[pos];
}



let pi = "3141567534563345344645";
let favArr = ["3", "4", "1415", "675345", "63345344", "645", "31415675345633453", "4645", "141567534"]

console.log(minSpace(pi, favArr))

//n = length of PI  m = length of favArray
// Timecomplexity : O(n*2 + m)


// Another solution would have been at line 19, instead of iterating over pi, iterate over favArr


function minSpace1(pi1, favArr1 = []) {
    return check1(pi1, 0, favArr1) - 1;
}

function check1(pi, pos, favArr1, memo = {}) {
    if (pos in memo) return memo[pos];

    let minSpace = Number.POSITIVE_INFINITY;
    if (pos == pi.length) return 0; //base case

    for (const favStr of favArr1) {
        if (pi.slice(pos).indexOf(favStr) == 0) {
            const space = check1(pi, pos + favStr.length,favArr1, memo)
            if (space != -1) {
                minSpace = Math.min(minSpace, 1 + space)
            }
        }
    }

    memo[pos] = minSpace == Number.POSITIVE_INFINITY ? -1 : minSpace;
    return memo[pos];
}



let pi1 = "3141567534563345344645";
let favArr1 = ["3", "44", "1415", "675345", "63345344", "645", "31415675345633453", "645", "141567534"]

console.log(minSpace1(pi1, favArr1))

//n = length of PI  m = length of favArray
// Timecomplexity : O(n*m*)