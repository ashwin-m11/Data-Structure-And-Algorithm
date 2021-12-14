"use strict";

const express = require('express');
const router = express.Router();

//#region 1
//https://www.geeksforgeeks.org/mos-algorithm-query-square-root-decomposition-set-1-introduction/
// Let us consider the following problem to understand MO’s Algorithm.
// We are given an array and a set of query ranges, we are required to find the sum of every query range.

// Example: 

// Input:  arr[]   = {1, 1, 2, 1, 3, 4, 5, 2, 8};
//         query[] = [0, 4], [1, 3] [2, 4]
// Output: Sum of arr[] elements in range [0, 4] is 8
//         Sum of arr[] elements in range [1, 3] is 4  
//         Sum of arr[] elements in range [2, 4] is 6

router.use('/MOAlgorithm', async (req, res) => {
    try {
        let { arr, rangeQuery } = req.body;
        const n = arr.length;
        const sqrtN = Math.floor(Math.sqrt(n));
        const updatedRangeQueryIndex = [0];
        for (let i = 1; i < rangeQuery.length; i++) {
            compare(i, rangeQuery, sqrtN, updatedRangeQueryIndex);
        }
        let valuesComputed = [];
        valuesComputed[updatedRangeQueryIndex[0]] = 0;
        let [left, right] = rangeQuery[updatedRangeQueryIndex[0]]
        for (let index = left; index <= right; index++) {
            valuesComputed[updatedRangeQueryIndex[0]] = valuesComputed[updatedRangeQueryIndex[0]] + arr[index];
        }
        for (let i = 1; i < updatedRangeQueryIndex.length; i++) {
            const [lNew, rNew] = rangeQuery[updatedRangeQueryIndex[i]];
            const [lOld, rOld] = rangeQuery[updatedRangeQueryIndex[i - 1]];
            valuesComputed[updatedRangeQueryIndex[i]] = getNewValue(lNew, rNew, lOld, rOld, arr, valuesComputed[updatedRangeQueryIndex[i - 1]]);
            console.log(valuesComputed);
        }

        return res.send({ updatedRangeQueryIndex, valuesComputed });

    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

const getNewValue = (lNew, rNew, lOld, rOld, arr, val) => {
    while (lOld > lNew) {
        lOld--;
        val = val + arr[lOld];
        console.log(`
        Here1
        lOld: ${lOld}
        val: ${val}
        lNew: ${lNew}`);
    }
    while (rOld < rNew) {
        rOld++;
        val = val + arr[rOld];
        console.log(`
        Here2
        rOld: ${rOld}
        val: ${val}
        rNew: ${rNew}`);
    }
    while (lOld < lNew) {
        val = val - arr[lOld];
        lOld++;
        console.log(`
        Here3
        lOld: ${lOld}
        val: ${val}
        lNew: ${lNew}`);
    }
    while (rOld > rNew) {
        val = val - arr[rOld];
        rOld--;
        console.log(`
        Here2
        rOld: ${rOld}
        val: ${val}
        rNew: ${rNew}`);
    }
    return val;
}
const compare = (i, rangeQuery, sqrtN, updatedRangeQueryIndex) => {
    if (i >= rangeQuery.length) return -1;
    const [left, right] = rangeQuery[i];
    let j = 0;
    console.log(`updatedRangeQueryIndex: ${updatedRangeQueryIndex}
    i: ${i}
    sqrtN: ${sqrtN}`);
    while (j < i) {
        const [l, r] = rangeQuery[updatedRangeQueryIndex[j]];
        console.log(`lCheck: ${Math.floor(l / sqrtN)}`);
        console.log(`leftCheck: ${Math.floor(left / sqrtN)}`);
        console.log(`r: ${r}`);
        console.log(`j: ${j}`);
        console.log(`right: ${right}`);
        console.log(`leftCheck: ${Math.floor(left / sqrtN)}`);
        if (Math.floor(l / sqrtN) > Math.floor(left / sqrtN)) {
            console.log("I am here1");
            const len = updatedRangeQueryIndex.length;
            for (let k = len - 1; k >= j; k--) {
                console.log(`k: ${k}`);
                updatedRangeQueryIndex[k + 1] = updatedRangeQueryIndex[k];
            }
            updatedRangeQueryIndex[j] = i;
            console.log(`updatedRangeQueryIndex: ${updatedRangeQueryIndex}`);
            j++;
            break;
        } else if (Math.floor(l / sqrtN) === Math.floor(left / sqrtN)) {
            if (r > right) {
                console.log("I am here2");
                const len = updatedRangeQueryIndex.length;
                for (let k = len - 1; k >= j; k--) {
                    console.log(`k: ${k}`);
                    updatedRangeQueryIndex[k + 1] = updatedRangeQueryIndex[k];
                }
                updatedRangeQueryIndex[j] = i;
                console.log(`updatedRangeQueryIndex: ${updatedRangeQueryIndex}`);
                j++;
                break;
            }
        } else if (j === i - 1) {
            updatedRangeQueryIndex[i] = i;
        }
        j++;
    }

    console.log(`updatedRangeQueryIndex: ${updatedRangeQueryIndex}
     
    `);

}

module.exports = router;
