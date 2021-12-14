"use strict";

const express = require('express');
const router = express.Router();

//#region 1 
//Given an array of elements of length N, ranging from 0 to N – 1. All elements may not be present in the array. 
//If the element is not present then there will be -1 present in the array. Rearrange the array such that A[i] = i and if i is not present, display -1 at that place.
router.post("", async (req, res) => {
    try {
        let { arr } = req.body;
        const n = arr.length;

        for (let i = 0; i < arr.length; i++) {
            rearrange(arr, i, n);
        }
        return res.send({ arr });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});

const rearrange = (arr, i, n) => {
    if (arr[i] > n || arr[i] < 0) {
        arr[i] = -1
    } else if (arr[i] === i) {
        return -1;
    } else if (arr[i] === i && arr[arr[i]] > n || arr[arr[i]] < 0) {
        arr[i] = -1;
        arr[arr[i]] = arr[i];
    } else {
        rearrange(arr, arr[i], n)
    }
}
//#endregion

//#region 2

//An array contains both positive and negative numbers in random order. 
//Rearrange the array elements so that positive and negative numbers are placed alternatively. Number of positive and negative numbers need not be equal.
//If there are more positive numbers they appear at the end of the array. If there are more negative numbers, they too appear in the end of the array.
//For example, if the input array is [-1, 2, -3, 4, 5, 6, -7, 8, 9], then the output should be [9, -7, 8, -3, 5, -1, 2, 4, 6]

router.post("/positiveNegative", async (req, res) => {
    try {
        let { arr } = req.body;
        let p = -1;
        for (let i = 0; i < arr.length; i++) {
            let temp = 0;
            if (arr[i] < 0) {
                p++;
                temp = arr[i];
                arr[i] = arr[p];
                arr[p] = temp;
            }
        }
        if (p === -1) return res.send({ arr });
        let pos = p;
        console.log('arr:' + arr);
        for (let i = 1; i < arr.length; i = i + 2) {
            pos++;
            console.log('i:' + i);
            console.log('pos:' + pos);
            if (pos >= arr.length || i >= pos) {
                console.log("I am here1");
                break;
            }
            let temp = arr[i];
            arr[i] = arr[pos];
            arr[pos] = temp;
            console.log("I am here2");

            console.log('arr:' + arr);
            console.log();
        }
        return res.send({ arr });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})
//#endregion

//#region 3

//An array contains both positive and negative numbers in random order. 
//Rearrange the array elements so that positive and negative numbers are placed alternatively. Number of positive and negative numbers need not be equal.
//If there are more positive numbers they appear at the end of the array. If there are more negative numbers, they too appear in the end of the array.
//For example, if the input array is [-1, 2, -3, 4, 5, 6, -7, 8, 9], then the output should be [9, -7, 8, -3, 5, -1, 2, 4, 6]

router.post("/positiveNegative", async (req, res) => {
    try {
        let { arr } = req.body;
        let p = -1;
        for (let i = 0; i < arr.length; i++) {
            let temp = 0;
            if (arr[i] < 0) {
                p++;
                temp = arr[i];
                arr[i] = arr[p];
                arr[p] = temp;
            }
        }
        if (p === -1) return res.send({ arr });
        let pos = p;
        console.log('arr:' + arr);
        for (let i = 1; i < arr.length; i = i + 2) {
            pos++;
            console.log('i:' + i);
            console.log('pos:' + pos);
            if (pos >= arr.length || i >= pos) {
                console.log("I am here1");
                break;
            }
            let temp = arr[i];
            arr[i] = arr[pos];
            arr[pos] = temp;
            console.log("I am here2");

            console.log('arr:' + arr);
            console.log();
        }
        return res.send({ arr });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})
//#endregion

//#region 4
//Rearrange the array elements so that positive and negative numbers are placed alternatively. Number of positive and negative numbers need not be equal.
//If there are more positive numbers they appear at the end of the array. If there are more negative numbers, they too appear in the end of the array.
//For example, if the input array is [-1, 2, -3, 4, 5, 6, -7, 8, 9], then the output should be [9, -7, 8, -3, 5, -1, 2, 4, 6]

router.post("/positiveNegativeInOrder", async (req, res) => {
    try {
        let { arr } = req.body;
        let p = -1;
        let i = -1;
        let cond1 = true;
        while (cond1) {
            i++;
            if (i % 2 == 0 && arr[i] > 0) {
                let j = i;
                let cond2 = true;
                while (cond2) {
                    j++;
                    if (arr[j] < 0) {
                        rightRotateSubArray(arr, i, j);
                        cond2 = false;
                    } else if (j >= arr.length) {
                        cond2 = false;
                        cond1 = false;
                    }
                }
            } else if (i % 2 == 1 && arr[i] < 0) {
                let j = i;
                let cond2 = true;
                while (cond2) {
                    j++;
                    if (arr[j] > 0) {
                        rightRotateSubArray(arr, i, j);
                        cond2 = false;
                    } else if (j >= arr.length) {
                        cond2 = false;
                        cond1 = false;
                    }
                }
            }
        }

        return res.send({ arr });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

const rightRotateSubArray = (arr, low, high) => {
    const temp = arr[high];
    for (let index = high; index > low; index--) {
        arr[index] = arr[index - 1];
    }
    arr[low] = temp;
}
//#endregion

//#region 5
//Given two integer arrays of same size, “arr[]” and “index[]”, reorder elements in “arr[]” according to given index array. It is not allowed to given array arr’s length.

// Example: 
// Input:  arr[]   = [10, 11, 12];
//         index[] = [1, 0, 2];
// Output: arr[]   = [11, 10, 12]
//         index[] = [0,  1,  2] 

// Input:  arr[]   = [50, 40, 70, 60, 90]
//         index[] = [3,  0,  4,  1,  2]
// Output: arr[]   = [40, 60, 90, 50, 70]
//         index[] = [0,  1,  2,  3,   4] 

router.post("/reorderBasedOnGivenIndex", async (req, res) => {
    try {
        let { arr, index } = req.body;
        let j = 0;
        for (let i = 0; i < arr.length; i++) {
            while (j++ >= 0 && index[i] !== i) {
                const tempArr = arr[index[i]];
                const tempInd = index[index[i]];
                arr[index[i]] = arr[i];
                index[index[i]] = index[i];
                arr[i] = tempArr;
                index[i] = tempInd;
            }
        }
        return res.send({ arr, index, j });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

const rightRotateSubArray1 = (arr, low, high) => {
    const temp = arr[high];
    for (let index = high; index > low; index--) {
        arr[index] = arr[index - 1];
    }
    arr[low] = temp;
}
//#endregion

//#region 6
//https://www.geeksforgeeks.org/rearrange-positive-and-negative-numbers/
//Given an array of positive and negative numbers, arrange them such that all negative integers appear before all the positive integers in the array 
//without using any additional data structure like hash table, arrays, etc. The order of appearance should be maintained.

//Examples:  
// Input:  [12 11 -13 -5 6 -7 5 -3 -6]
// Output: [-13 -5 -7 -3 -6 12 11 6 5]

router.post("/rearrange-positive-and-negative-numbers", async (req, res) => {
    try {
        let { arr } = req.body;
        rearrangePosNeg(arr, 0, arr.length - 1);
        return res.send({ arr });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

const rearrangePosNeg = (arr, l, r) => {
    if (l < r) {
        let m = Math.floor((l + r) / 2);
        rearrangePosNeg(arr, l, m);
        rearrangePosNeg(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

const merge = (arr, low, mid, high) => {
    let i = low;
    let j = mid + 1;
    while (arr[i] <= 0 && i <= mid) i++;
    while (arr[j] <= 0 && j <= high) j++;
    console.log(arr);
    reverse(arr, i, mid);
    console.log(arr);
    reverse(arr, mid + 1, j - 1);
    console.log(arr);
    reverse(arr, i, j - 1);
}

const reverse = (arr, low, high) => {
    console.log("low: " + low)
    console.log("high: " + high)
    console.log("1- " + arr);
    while (low < high) {
        const temp = arr[low];
        arr[low] = arr[high];
        arr[high] = temp;
        high--;
        low++;
    }
    console.log("2- " + arr);
}
//#endregion

//#region 7
//https://www.geeksforgeeks.org/given-an-array-of-numbers-arrange-the-numbers-to-form-the-biggest-number/
//Given an array of numbers, arrange them in a way that yields the largest value.
// For example, if the given numbers are {54, 546, 548, 60}, the arrangement 6054854654 gives the largest value.
//And if the given numbers are {1, 34, 3, 98, 9, 76, 45, 4}, then the arrangement 998764543431 gives the largest value.

router.post("/given-an-array-of-numbers-arrange-the-numbers-to-form-the-biggest-number", async (req, res) => {
    try {
        let { arr } = req.body;
        for (let i = 1; i < arr.length; i++) {
            checkCondition(arr, i);
        }
        return res.send({ arr });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

const checkCondition = (arr, high) => {
    const tempArray = arr.slice(0, high + 1);
    let maxValSubArray = tempArray.join("");
    let positionForMaxValue = high;
    for (let j = high - 1; j >= 0; j--) {
        const jValue = tempArray[j];
        tempArray[j] = tempArray[j + 1];
        tempArray[j + 1] = jValue;
        const joinValue = tempArray.join("");
        if (joinValue > maxValSubArray) {
            positionForMaxValue = j;
            maxValSubArray = joinValue;
        }
    }
    if (positionForMaxValue !== high) {
        console.log("arr: " + arr + ", maxValSubArray: " + maxValSubArray + ", positionForMaxValue: " + positionForMaxValue);
        rightRotateSubArray2(arr, positionForMaxValue, high);
    }
}

const rightRotateSubArray2 = (arr, low, high) => {
    const temp = arr[high];
    for (let index = high; index > low; index--) {
        arr[index] = arr[index - 1];
    }
    arr[low] = temp;
}

// const rightRotateSubArrayByKey = (arr, low, high, key) => {
//     if (key !== 0) {
//         reverse1(arr, low, high - key);
//         reverse1(arr, high - key + 1, high);
//         reverse1(arr, low, high);
//     }
// }

// const reverse1 = (arr, low, high) => {
//     console.log("low: " + low)
//     console.log("high: " + high)
//     console.log("1- " + arr);
//     while (low < high) {
//         const temp = arr[low];
//         arr[low] = arr[high];
//         arr[high] = temp;
//         high--;
//         low++;
//     }
//     console.log("2- " + arr);
// }
//#endregion

//#region 8
//https://www.geeksforgeeks.org/rearrange-array-arrj-becomes-arri-j/
//Given an array of size n where all elements are distinct and in range from 0 to n-1, change contents of arr[] so that arr[i] = j is changed to arr[j] = i. 

// Example 
// Input: arr[]  = {1, 3, 0, 2};
// Output: arr[] = {2, 0, 3, 1};

router.post("/rearrange-array-arrj-becomes-arri", async (req, res) => {
    try {
        let { arr } = req.body;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] >= 0) {
                let curr_pos = arr[i];
                let curr_value = i;
                while (arr[curr_pos] >= 0) {
                    const next_pos = arr[curr_pos];
                    arr[curr_pos] = -1 * (curr_value + 1);
                    curr_value = curr_pos;
                    curr_pos = next_pos;
                }
            }
        }
        for (let i = 0; i < arr.length; i++) {
            arr[i] = -1 * arr[i] - 1;
        }
        return res.send({ arr });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

router.post("/rearrange-array-arrj-becomes-arri1", async (req, res) => {
    try {
        let { arr } = req.body;
        const n = arr.length;
        for (let i = 0; i < arr.length; i++) {
            const oldValue = arr[arr[i] % n];
            const newValue = i;
            arr[arr[i] % n] = newValue * n + oldValue;
        }
        for (let i = 0; i < arr.length; i++) {
            arr[i] = Math.floor(arr[i] / n);
        }
        return res.send({ arr });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})
//#endregion

//#region9
//rearrange-array-maximum-minimum-form-set-2-o1-extra-space
//https://www.geeksforgeeks.org/rearrange-array-maximum-minimum-form-set-2-o1-extra-space/
//Given a sorted array of positive integers,
//rearrange the array alternately i.e first element should be the maximum value, second minimum value, third-second max, fourth-second min and so on. 

router.post("/rearrange-array-maximum-minimum-form-set-2-o1-extra-space", async (req, res) => {
    try {
        let { arr } = req.body;
        const max_val = arr[arr.length - 1] + 1;
        let flag = true;
        let j = arr.length - 1;
        let i = 0;
        let k = 0;
        while (k < arr.length) {
            let newValue = 0;
            let oldValue = arr[k];
            if (flag) {
                newValue = arr[j] % max_val;
                j--;
            } else {
                newValue = arr[i] % max_val;
                i++;
            }
            arr[k] = newValue * max_val + oldValue;
            flag = !flag;
            k++;
        }
        for (let i = 0; i < arr.length; i++) {
            arr[i] = Math.floor(arr[i] / max_val);
        }
        return res.send({ arr });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

//#endregion


router.post("/salaryPLUS1", async (req, res) => {
    try {
        let { arr } = req.body;
        let j = 0;
        while (arr[0] < arr[arr.length - 1]) {
            j++;
            for (let i = 0; i < arr.length - 1; i++) {
                arr[i]++;
            }
            console.log(arr.toString());
            let n = arr.length - 1
            while (arr[n] < arr[n - 1] && n > 0) {
                const temp = arr[n];
                arr[n] = arr[n - 1];
                arr[n - 1] = temp;
                n--;
            }
            console.log(`${arr.toString()}   ${n === arr.length - 1}  ${j}`  );
            console.log("");
        }
        return res.send({ arr, j });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

module.exports = router;
