// https://community.topcoder.com/stat?c=problem_statement&pm=1996&rd=4710

// *** Input twisted from array of strings to string (compared to original prob)***
// You have been given a String picture. Each character in picture represents a space in the picture. A 'B' designates a space that needs to be painted black, and a 'W' denotes a space that must be painted white. The painting device you have been given only makes horizontal strokes, of any length. In addition, it can only use 1 color at a time. Due to the nature of the paint, a space cannot be painted twice
// picture = "BWBWBWBWBWBWBWBWBWBWBWBWBWBWBW"

// This wouldn't be an issue if we had forever to paint the picture. Unfortunately, you only have enough time to make at most maxStrokes distinct strokes. Any more strokes would put you past your deadline. Since finishing on time is more important than getting it perfect, you are willing to mispaint some of the spaces. Return the fewest number of spaces that can be mispainted while still using no more than maxStrokes strokes. An unpainted space is considered mispainted.





const miniPaint = (pictureStr, maxStrokes) => {
    const valArray = [];
    const maxStrokesDict = {}
    const misplacedCount = 0;
    //valArray =  [{
    //   paint : "A" ,correctCount: 4  
    //  }] ***  
    let currCorrectCount = 1;
    let currColor = pictureStr[0];
    for (let i = 0; i < pictureStr.length - 1; i++) {
        if (pictureStr[i] == pictureStr[i + 1]) {
            currCorrectCount++;
        } else {
            valArray.push({ paint: currColor, correctCount: currCorrectCount });
            currCorrectCount = 1;
            currColor = pictureStr[i + 1];
        }
    }
    valArray.push({ paint: currColor, correctCount: currCorrectCount });
    recurseMiniPaint(valArray, maxStrokesDict, 0);
    return maxStrokesDict[maxStrokes];
}


const recurseMiniPaint = (valArray, maxStrokesDict, currIncorrectVal) => {
    // console.log(valArray);
    // const key = valArray.length;
    // if (key == 0) { maxStrokesDict[key] = [JSON.stringify(valArray), currIncorrectVal]; return }
    // if (key in maxStrokesDict) {
    //     maxStrokesDict[key] = [JSON.stringify(valArray),Math.min(maxStrokesDict[key][1], currIncorrectVal)]
    // } else {
    //     maxStrokesDict[key] = [JSON.stringify(valArray),currIncorrectVal]
    // }

    const key = valArray.length;
    if (key == 0) { ; maxStrokesDict[key] =  currIncorrectVal; return }
    if (key in maxStrokesDict) {
        // console.log("HERE");
        maxStrokesDict[key] = Math.min(maxStrokesDict[key], currIncorrectVal)
    } else {
        maxStrokesDict[key] = currIncorrectVal
    }

    let i = 0;
    while (i < key - 1) {
        if (valArray[i]["paint"] == valArray[i+1]["paint"]) {
            valArray[i + 1]["correctCount"] += valArray[i]["correctCount"]
            valArray = [...valArray.slice(0, i), ...valArray.slice(i + 1)]
            return recurseMiniPaint(valArray, maxStrokesDict, currIncorrectVal)
        }
        i++;
    }

    let minCorrectCount = Number.POSITIVE_INFINITY;
    let posForMinCount = -1;
    for (let j = 1; j < key - 1; j++) {
        if (minCorrectCount > valArray[j]["correctCount"]) {
            minCorrectCount = valArray[j]["correctCount"];
            posForMinCount = j;
        }
    }
    if (posForMinCount != -1) {
        recurseMiniPaint([...valArray.slice(0, posForMinCount), ...valArray.slice(posForMinCount + 1)], maxStrokesDict, currIncorrectVal + minCorrectCount)
    }
    if (minCorrectCount > valArray[0]["correctCount"] && valArray[0]["correctCount"] < valArray[key - 1]["correctCount"]) recurseMiniPaint([...valArray.slice(1)], maxStrokesDict, currIncorrectVal + valArray[0]["correctCount"])
    else if (minCorrectCount > valArray[key - 1]["correctCount"]) recurseMiniPaint([...valArray.slice(0, key - 1)], maxStrokesDict, currIncorrectVal + valArray[key - 1]["correctCount"])

}


console.log(miniPaint("B", 1)); //0
console.log(miniPaint("BWBBBWWWBBBWWBWWWBW", 3)); //6
console.log(miniPaint("WWWWWBBBBBBBWWWWW", 3)); //0
console.log(miniPaint("WWWWWBBBBBBBWWWWW", 2)); //5
console.log(miniPaint("WWWWWBBBBBBBWWWWW", 1)); //7
console.log(miniPaint("BWBWBWBWBWBWBWBWBWBWBWBWBWBWBW", 8)); //11
console.log(miniPaint("BWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBWBW", 100)); //40