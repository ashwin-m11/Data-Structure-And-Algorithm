/**
 * @param {string[]} strs
 * @return {string}
 */
 var longestCommonPrefix = function(strs) {
    if (!strs[0]) return "";
    let prefix = strs[0]
    for (let str of strs) {
        let i = 0;
        let newPrefix = ""
        while (true) {
            if(prefix[i] && prefix[i] == str[i]) newPrefix = newPrefix + prefix[i]
            else break;
            i++;
        }
        prefix = newPrefix
        if (prefix == "") return ""
    }
    return prefix;
};



console.log(longestCommonPrefix(["flower","flow","flight"]))