// https://community.topcoder.com/stat?c=problem_statement&pm=1215&rd=4555
	
// Karel is a frustrated painter who works by day in an electrical repair shop. 
// Inspired by the color-coded bands on resistors, he is painting a series of long, narrow canvases with bold colored stripes. 
// However, Karel is lazy and wants to minimize the number of brush strokes it takes to paint each canvas.

// Abbreviating each color to a single uppercase letter, Karel would write the stripe pattern red-green-blue-green-red as "RGBGR" (quotes added for clarity). 
// It would take him three brush strokes to paint this pattern. 
// The first stroke would cover the entire canvas in red (RRRRR). 
// The second stroke would leave a band of red on either side and fill in the rest with green (RGGGR). 
// The final brush stroke would fill in the blue stripe in the center (RGBGR).



const stripePainter = (str) => {
    let i = 1;
    while (i < str.length) {
        if (str[i] == str[i - 1]) str = str.slice(0, i - 1) + str.slice(i)
        else i++;
    }
    const currentStr = Array(str.length).fill("w").join("");
    // console.log(str, currentStr, 0, str.length - 1);
    // return minStrokes(str, currentStr, 0, str.length - 1)
    // return minStrokes1(str, currentStr)
    return minStrokes(str, currentStr)
}

const minStrokes = (str, memo = {}) => {

    let key = str
    if (key in memo) { return memo[key]; }

    if (str == "") return 0;
    if (str.length == 1) { memo[key] = 1; return 1; }


    let minCount = Number.POSITIVE_INFINITY;
    for (let i = str.length - 1; i > 0; i--) {
        if(str[0] == str[i]){
            minCount = Math.min(minCount, minStrokes(str.slice(0,i), memo) + minStrokes(str.slice(i+1), memo))
        }else{
            minCount = Math.min(minCount, minStrokes(str.slice(0,i), memo) + minStrokes(str.slice(i), memo))
        }
    }
    memo[key] = minCount;
    return minCount
}

const minStrokes1 = (str, currentStr, memo = {}) => {

    let key = currentStr.concat(str);
    if (key in memo) { return memo[key]; }

    let m = 1;
    // console.log(str, currentStr);
    while (m < str.length) {
        if (str[m] == str[m - 1]) {
            str = str.slice(0, m - 1) + str.slice(m);
            currentStr = currentStr.slice(0, m - 1) + currentStr.slice(m);
        }
        else m++;
    }
    // console.log(str, currentStr);

    if (str == "") return 0;
    if (str == currentStr) { memo[key] = 0; return 0; }
    if (str.length == 1) { memo[key] = 1; return 1; }


    let minCount = Number.POSITIVE_INFINITY;
    for (let i = 0; i < str.length; i++) {
        // console.log("HERE 1");
        if (str[i] != currentStr[i]) {
            // console.log("HERE 2", i);
            let singleVal = true;
            let j = str.length - 1;
            while (j > i) {
                // console.log("HERE 3", j);
                if (str[i] == str[j]) {
                    let newCurrentStr = currentStr;
                    for (let k = i; k <= j; k++) {
                        newCurrentStr[k] = str[i];
                    }
                    // console.log("HERE 4", str, newCurrentStr, i, j);
                    minCount = Math.min(minCount, 1 + minStrokes(str.slice(0, i), newCurrentStr.slice(0, i), memo) + minStrokes(str.slice(i + 1, j), newCurrentStr.slice(i + 1, j), memo) + minStrokes(str.slice(j + 1), newCurrentStr.slice(j + 1), memo))
                    singleVal = false;
                    break;
                }
                j--;
            }
            if (singleVal) {
                // console.log("HERE 3");
                // console.log("left:" ,left, ",i:" ,i, ",right:" ,right, ",str:" ,str, ",currentStr:" ,currentStr,);
                minCount = Math.min(minCount, 1 + minStrokes(str.slice(0, i) + str.slice(i + 1), currentStr.slice(0, i) + currentStr.slice(i + 1), memo))
            }
        }
    }
    memo[key] = minCount;
    return minCount
}


//bottoms up.. tabulation

const stripePainterTabulation = (str) => {
    str = " " + str;
    const table = Array(str.length).fill().map(() => Array(str.length).fill(0));

    for (let i = str.length - 1; i > 0; i--) {
        for (let j = i; j <= str.length - 1; j++) {
            if (i == j) table[i][j] = 1;
            else if (str[i] == str[j]) table[i][j] = table[i][j - 1]
            else {
                let minVal = Number.POSITIVE_INFINITY;
                for (let k = i; k < j; k++) {
                    minVal = Math.min(minVal, table[i][k] + table[k+1][j])
                }
                table[i][j] = minVal
            }
        }
    }

    return table[1][str.length-1]
}



console.log(stripePainter("RGBGR")) //3
console.log(stripePainter("RGRG")) //3
console.log(stripePainter("ABACADA")) //4
console.log(stripePainter("AABBCCDDCCBBAABBCCDD")) //7
console.log(stripePainter("BECBBDDEEBABDCADEAAEABCACBDBEECDEDEACACCBEDABEDADD")) //26

// console.log(stripePainterTabulation("RGBGR")) //3
// console.log(stripePainterTabulation("RGRG")) //3
// console.log(stripePainterTabulation("ABACADA")) //4
// console.log(stripePainterTabulation("AABBCCDDCCBBAABBCCDD")) //7
// console.log(stripePainterTabulation("BECBBDDEEBABDCADEAAEABCACBDBEECDEDEACACCBEDABEDADD")) //26