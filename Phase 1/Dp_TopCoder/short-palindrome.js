const shortPalindrome = (str) => {
    //base case 
    if(str.length <= 1) return str;
    
    const len = str.length;
    const left = str[0];
    const right = str[len - 1];

    if (left == right) return left.concat(shortPalindrome(str.slice(1, len - 1)), right);
    const leftAddStr = right.concat(shortPalindrome(str.slice(0, len - 1)), right);
    const rightAddStr = left.concat(shortPalindrome(str.slice(1)), left);
    if (leftAddStr.length == rightAddStr.length) return leftAddStr > rightAddStr ? rightAddStr : leftAddStr
    return leftAddStr.length < rightAddStr.length ? leftAddStr : rightAddStr
}



console.log(shortPalindrome("RACE")); //ECARACE

console.log(shortPalindrome("TOPCODER")); //REDTOCPCOTDER
console.log(shortPalindrome("Q")); //Q
console.log(shortPalindrome("MADAMIMADAM")); //MADAMIMADAM
console.log(shortPalindrome("ALRCAGOEUAOEURGCOEUOOIGFA")); //AFLRCAGIOEOUAEOCEGRURGECOEAUOEOIGACRLFA


