//https://community.topcoder.com/stat?c=problem_statement&pm=1918&rd=5006
// You are planting a flower garden with bulbs to give you joyous flowers throughout the year. However, you wish to plant the flowers such that they do not block other flowers while they are visible.

// You will be given a int[] height, a int[] bloom, and a int[] wilt. Each type of flower is represented by the element at the same index of height, bloom, and wilt. height represents how high each type of flower grows, bloom represents the morning that each type of flower springs from the ground, and wilt represents the evening that each type of flower shrivels up and dies. Each element in bloom and wilt will be a number between 1 and 365 inclusive, and wilt[i] will always be greater than bloom[i]. You must plant all of the flowers of the same type in a single row for appearance, and you also want to have the tallest flowers as far forward as possible. However, if a flower type is taller than another type, and both types can be out of the ground at the same time, the shorter flower must be planted in front of the taller flower to prevent blocking. A flower blooms in the morning, and wilts in the evening, so even if one flower is blooming on the same day another flower is wilting, one can block the other.

// You should return a int[] which contains the elements of height in the order you should plant your flowers to acheive the above goals. The front of the garden is represented by the first element in your return value, and is where you view the garden from. The elements of height will all be unique, so there will always be a well-defined ordering.

const getOrdering = (height = [], bloom = [], wilt = []) => {

    sortByHeight(height, bloom, wilt);
    transferring(height, bloom, wilt)
    return height;
}


const transferring = (height, bloom, wilt) => {
    let i = height.length - 1;
    // let transferPossibleVal = false;
    while (i > 0) {
        if (transferPossible(height, bloom, wilt, i)) {
            transferPossibleVal = true;
            [height[i - 1], height[i]] = [height[i], height[i - 1]];
            [bloom[i - 1], bloom[i]] = [bloom[i], bloom[i - 1]];
            [wilt[i - 1], wilt[i]] = [wilt[i], wilt[i - 1]];
            transferring(height, bloom, wilt);
        }
        i--;
    }
    // if (transferPossibleVal) transferring(height, bloom, wilt);
}

const transferPossible = (height, bloom, wilt, i) => {
    // if (i - 1 < 0) return false;
    const A = height[i] > height[i - 1];
    const B = bloom[i] > wilt[i - 1] || wilt[i] < bloom[i - 1]
    return A && B
}

const sortByHeight = (height, bloom, wilt) => {
    let i = 1;
    while (i < height.length) {
        let j = i - 1;
        while (j >= 0) {
            if (height[j] < height[i]) break;
            j--;
        }
        j++;
        const heightVal = height[i];
        const bloomVal = bloom[i];
        const wiltVal = wilt[i];
        for (let k = i - 1; k >= j; k--) {
            height[k + 1] = height[k];
            bloom[k + 1] = bloom[k];
            wilt[k + 1] = wilt[k];
        }
        height[j] = heightVal;
        bloom[j] = bloomVal;
        wilt[j] = wiltVal;
        i++;
    }
}




console.log(getOrdering(
    [5, 4, 3, 2, 1],
    [1, 1, 1, 1, 1],
    [365, 365, 365, 365, 365]
))  //[ 1, 2, 3, 4, 5 ]

console.log(getOrdering(
    [5, 4, 3, 2, 1],
    [1, 5, 10, 15, 20],
    [4, 9, 14, 19, 24]
))  //[ 5, 4, 3, 2, 1 ]

console.log(getOrdering(

    [5, 4, 3, 2, 1],
    [1, 5, 10, 15, 20],
    [5, 10, 15, 20, 25]
))  //[ 1, 2, 3, 4, 5 ]

console.log(getOrdering(
    [5, 4, 3, 2, 1],
    [1, 5, 10, 15, 20],
    [5, 10, 14, 20, 25]
))  //[ 3, 4, 5, 1, 2 ]

console.log(getOrdering(
    [1, 2, 3, 4, 5, 6],
    [1, 3, 1, 3, 1, 3],
    [2, 4, 2, 4, 2, 4]
)) //[ 2, 4, 6, 1, 3, 5 ]

console.log(getOrdering(
    [3, 2, 5, 4],
    [1, 2, 11, 10],
    [4, 3, 12, 13]
)) //[ 4, 5, 2, 3 ]