"use strict";

const express = require('express');
const router = express.Router();

//#region 1
// kth largest/smallest element
//Given an array and a number k where k is smaller than size of array, we need to find the k’th smallest element in the given array. 
//It is given that all array elements are distinct.
//https://www.geeksforgeeks.org/kth-smallestlargest-element-unsorted-array/

router.post("/kth-smallest-element-unsorted-array", async (req, res) => {
    try {
        let { arr, k } = req.body;
        const n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i);
            console.log(arr);
        }
        // for (let i = 1; i < n; i++) {
        //     buildHeap(arr, i);
        //     console.log(arr);
        // }
        console.log("--------------");
        for (let j = arr.length - 1; j > arr.length - k - 1; j--) {
            console.log(j);
            swap1(arr, 0, j);
            deleteHeapSort(arr, j);
            console.log(arr);
            console.log("------------");
        }
        return res.send({ n, arr, val: arr[n - k] });

    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

const heapify = (arr, n, i) => {
    let smallest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left <= n - 1 && arr[smallest] > arr[left]) {
        smallest = left;
    }
    if (right <= n - 1 && arr[smallest] > arr[right]) {
        smallest = right;
    }
    if (smallest !== i) {
        swap1(arr, smallest, i);
        heapify(arr, n, smallest);
    }
}

const buildHeap = (arr, i) => {
    if (i >= 0) {
        const parentNode = Math.floor((i - 1) / 2);
        if (arr[parentNode] < arr[i]) {
            swap1(arr, parentNode, i);
            buildHeap(arr, parentNode);
        }
    }
}

const deleteHeapSort = (arr, j) => {
    let minNode = 0;
    while (minNode < j) {
        const leftNode = minNode * 2 + 1;
        const rightNode = minNode * 2 + 2;
        let i = minNode;
        if (arr[minNode] > arr[leftNode] && leftNode < j) {
            minNode = leftNode;
        }
        if (arr[minNode] > arr[rightNode] && rightNode < j) {
            minNode = rightNode;
        }
        if (minNode !== i) {
            swap1(arr, i, minNode);
        } else {
            break;
        }
    }
}

const swap1 = (arr, a, b) => {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
//#endregion

//#region 2
// all kth largest element in any order
// Write an efficient program for printing k largest elements in an array. Elements in array can be in any order.
//For example, if given array is [1, 23, 12, 9, 30, 2, 50] and you are asked for the largest 3 elements i.e., k = 3 then your program should print 50, 30 and 23.
//https://www.geeksforgeeks.org/k-largestor-smallest-elements-in-an-array/

router.post("/k-largest-elements-in-an-array", async (req, res) => {
    try {
        let { arr, k } = req.body;
        const n = arr.length;
        let temp1 = arr.slice(0, k);
        let temp2 = arr.slice(k, n);
        // for (let i = 1; i < n; i++) {
        //     buildHeap(arr, i);
        //     console.log(arr);
        // }
        let min = findMin(temp1);
        while (true) {
            let i = min;
            const value = findGreaterThanElement(temp2, temp1[min]);
            if (value === false) break;
            temp1[min] = value;
            min = findMin(temp1);
        }
        return res.send({ temp1, temp2 });

    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

const swap2 = (arr, a, b) => {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

const findGreaterThanElement = (arr, val) => {
    let i = 0;
    let res = false;
    while (i < arr.length) {
        if (arr[i] > val) {
            res = arr[i];
            arr.splice(i, 1);
            break;
        }
        i++;
    }
    return res;
}

const findMin = (arr) => {
    const n = arr.length;
    let min = 0;
    let i = 1;
    while (i < n) {
        if (arr[min] > arr[i]) {
            min = i;
        }
        i++;
    }
    return min;
}
//#endregion

//#region 3
//k-th-largest-sum-contiguous-subarray
//https://www.geeksforgeeks.org/k-th-largest-sum-contiguous-subarray/
//Given an array of integers. Write a program to find the K-th largest sum of contiguous subarray within the array of numbers which has negative and positive numbers.
//Examples: 
// Input: a[] = {10, -10, 20, -40} 
//          k = 6
// Output: -10 
// Explanation: The 6th largest sum among 
// sum of all contiguous subarrays is -10.

// router.post("/k-th-largest-sum-contiguous-subarray", async (req, res) => {
//     try {
//         let { arr, k } = req.body;
//         let sumUptoElementArray = [arr[0]];
//         const n = arr.length
//         for (let i = 1; i < n; i++) {
//             sumUptoElementArray[i] = sumUptoElementArray[i - 1] + arr[i];
//         }
//         for (let j = 0; j < n ; j++) {
//             for (let i = 0; i < n; i++) {
//             // start adding the element till there are n entries in the element 
//             // for every addition, make sure Array is in min Heap

//             //after adding k elements, for next addition, check if the element is less than top element in the list. If so, just skip it, or else replace it with the new element
//             }
//             const element = arr[j];
//         }

//     } catch (err) {
//         return res.status(500).send({ error: `Some error occurred: ${err.message}` });
//     }
// })

const sumSubArray = (sumUptoElementArray, i, j) => {
    if (i === 0) return sumUptoElementArray[j];
    return sumUptoElementArray[j] - sumUptoElementArray[i - 1];
}

//#endregion

//#region 4
//https://www.geeksforgeeks.org/k-maximum-sum-combinations-two-arrays/
// Given two equally sized arrays (A, B) and N (size of both arrays). 
//A sum combination is made by adding one element from array A and another element of array B.
//Display the maximum K valid sum combinations from all the possible sum combinations. 

router.post("/k-maximum-sum-combinations-two-arrays", async (req, res) => {
    try {
        let { A, B, k } = req.body;
        let pq = [];
        let pair = [];
        let n = A.length;
        let response = [];
        pq.push({
            val: A[n - 1] + B[n - 1],
            Ai: n - 1,
            Bi: n - 1
        });
        pair.push({
            Ai: n - 1,
            Bi: n - 1
        });

        for (let q = 0; q < k; q++) {
            for (let m = Math.floor((pq.length) / 2) - 1; m >= 0; m--) {
                heapify2(pq, pq.length, m);
            }

            let temp = pq.splice(0, 1);
            response.push(temp);

            let i = temp[0].Ai;
            let j = temp[0].Bi;
            console.log("i:" + i);
            console.log("j:" + j);

            let sum = A[i - 1] + B[j];

            if (!pair.some((x) => {
                x.Ai === i - 1 && x.Bi === j
            })
            ) {

                pair.push({
                    Ai: i - 1,
                    Bi: j
                });
                pq.push({
                    val: sum,
                    Ai: i - 1,
                    Bi: j
                });
            }

            sum = A[i] + B[j - 1];
            if (!pair.some((x) => {
                x.Ai === i && x.Bi === j - 1
            })
            ) {
                pair.push({
                    Ai: i,
                    Bi: j - 1
                });
                pq.push({
                    val: sum,
                    Ai: i,
                    Bi: j - 1
                });
            }
            console.log(pq);
        }

        return res.send({ response });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});

const heapify2 = (arr, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left <= n - 1 && arr[largest].val < arr[left].val) {
        largest = left;
    }
    if (right <= n - 1 && arr[largest].val < arr[right].val) {
        largest = right;
    }
    if (largest !== i) {
        swap3(arr, largest, i);
        heapify2(arr, n, largest);
    }
}

const swap3 = (arr, a, b) => {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
//#endregion 

//#region 5
//kadane's Algorithm
router.post("/kadane", (req, res) => {
    try {
        let { arr } = req.body;
        let maxSum = arr[0];
        let maxSumSubArray = arr[0];
        let start = 0;
        let end = 0;
        for (let i = 1; i < arr.length; i++) {
            if (maxSumSubArray > 0) {
                maxSumSubArray = maxSumSubArray + arr[i];
            } else {
                maxSumSubArray = arr[i];
                start = maxSumSubArray > maxSum ? i : start;
            }
            if (maxSumSubArray > maxSum) {
                maxSum = maxSumSubArray;
                end = i;
            }
        }
        return res.send({ maxSum, start, end });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})
//#endregion

//#region 6
//Alternative to Kadane's Algorithm
//using Prefix sum
router.post("/prefixSum", (req, res) => {
    try {
        let { arr } = req.body;
        let prefixSum = [];
        prefixSum.push(arr[0]);
        for (let i = 1; i < arr.length; i++) {
            prefixSum[i] = prefixSum[i - 1] + arr[i];
        }
        let maxSum = prefixSum[0];
        let minPrefixSum = 0;
        let upperIndex = 0;
        let lowerIndex = 0;
        for (let i = 0; i < prefixSum.length; i++) {
            let tempMaxSum = maxSum;
            let tempminPrefixSum = minPrefixSum;
            maxSum = Math.max(maxSum, prefixSum[i] - minPrefixSum);
            minPrefixSum = Math.min(minPrefixSum, prefixSum[i]);
            if (tempMaxSum !== maxSum) upperIndex = i;
            if (tempminPrefixSum !== minPrefixSum) lowerIndex = i;
        }
        return res.send({ maxSum, upperIndex, lowerIndex });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})
//#endregion

//#region 7
//https://www.geeksforgeeks.org/k-maximum-sum-overlapping-contiguous-sub-arrays/
// K maximum sums of overlapping contiguous sub-arrays
// Difficulty Level : Hard
// Last Updated : 02 Oct, 2020
// Given an array of Integers and an Integer value k, find out k sub-arrays(may be overlapping), which have k maximum sums
router.post("/k-maximum-sum-overlapping-contiguous-sub-arrays", (req, res) => {
    try {
        let { arr, k } = req.body;
        let prefixSum = [];
        prefixSum.push(arr[0]);
        for (let i = 1; i < arr.length; i++) {
            prefixSum[i] = prefixSum[i - 1] + arr[i];
        }

        let minArr = [];
        let maxArr = [];

        // maxArr[0] = prefixSum[0];
        // maxArr[1] = Number.NEGATIVE_INFINITY;
        // if (prefixSum[0] > 0) { minArr.push(0); minArr.push(prefixSum[0]); }
        // if (prefixSum[0] <= 0) { minArr.push(prefixSum[0]); minArr.push(0); };
        // for (let i = 2; i < k ; i++) {
        //     minArr[i] = Number.POSITIVE_INFINITY;
        //     maxArr[i] = Number.NEGATIVE_INFINITY;
        // }

        for (let i = 0; i < k; i++) {
            minArr[i] = Number.POSITIVE_INFINITY;
            maxArr[i] = Number.NEGATIVE_INFINITY;
        }
        minArr[0] = 0;

        console.log(`prefixSum: ${prefixSum}
        `);
        console.log(`
        i: ${0}
        tempArr: ${[]}
        maxArr: ${maxArr}
        minArr: ${minArr} `)
        // for (let i = 1; i < prefixSum.length; i++) {
        for (let i = 0; i < prefixSum.length; i++) {
            let tempArr = [];
            for (let j = 0; j < k; j++) {
                tempArr.push(prefixSum[i] - minArr[j]);
            }
            findKMaxSum(maxArr, tempArr, k);
            findKMinimumMinValue(minArr, prefixSum[i], k);
            console.log(`
            i: ${i}
            tempArr: ${tempArr}
            maxArr: ${maxArr}
            minArr: ${minArr} `)
        }
        return res.send({ maxArr });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

const findKMaxSum = (maxArr, tempArr, k) => {
    let j = 0;
    for (let i = 0; i < k; i++) {
        if (tempArr[j] > maxArr[i]) {
            insertAndDelete(maxArr, tempArr[j], i);
            j++;
        }
    }
}


const findKMinimumMinValue = (minArr, val, k) => {

    let i = 0;
    while (i < k) {
        if (val < minArr[i]) {
            // console.log(`minArr: ${minArr}
            // val: ${val}`);
            insertAndDelete(minArr, val, i);
            // console.log(`minArr: ${minArr}
            // val: ${val}`);
            break;
        }
        i++;
    }
}

const insertAndDelete = (arr, val, i) => {
    for (let j = arr.length - 1; j > i; j--) {
        arr[j] = arr[j - 1];
    }
    arr[i] = val;
}
//#endregion

//#region 8
//https://www.geeksforgeeks.org/k-maximum-sums-non-overlapping-contiguous-sub-arrays/
//kadane's Algorithm for non-overlapping contiguous array
//Given an Array of Integers and an Integer value k, find out k non-overlapping sub-arrays which have k maximum sums.
// Examples:
// Input : arr1[] = {4, 1, 1, -1, -3, -5, 6, 2, -6, -2}, 
//              k = 3.
// Output : Maximum non-overlapping sub-array sum1: 8, 
//          starting index: 6, ending index: 7.

//          Maximum non-overlapping sub-array sum2: 6, 
//          starting index: 0, ending index: 2.

//          Maximum non-overlapping sub-array sum3: -1, 
//          starting index: 3, ending index: 3.

// Input : arr2 = {5, 1, 2, -6, 2, -1, 3, 1}, 
//            k = 2.
// Output : Maximum non-overlapping sub-array sum1: 8, 
//          starting index: 0, ending index: 2.

//          Maximum non-overlapping sub-array sum2: 5, 
//          starting index: 4, ending index: 7.

router.post("/k-maximum-sums-non-overlapping-contiguous-sub-arrays", (req, res) => {
    try {
        let { arr, k } = req.body;
        let kArray = [];
        let j = 0;
        while (j < k) {
            kArray.push(kadaneSubArray(arr));
            j++;
        }
        return res.send({ kArray: kArray.splice(0, k) });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

const kadaneSubArray = (arr) => {
    let maxSum = arr[0];
    let maxSumSubArray = arr[0];
    let start = 0;
    let end = 0;
    for (let i = 1; i < arr.length; i++) {
        console.log(
            `maxSumSubArray: ${maxSumSubArray}
        maxSum: ${maxSum}
        arr[${i}]: ${arr[i]}
        start:${start}
        end:${end}`);
        if (maxSumSubArray > 0) {
            maxSumSubArray = maxSumSubArray + arr[i];
        } else {
            maxSumSubArray = arr[i];
            start = maxSumSubArray >= maxSum ? i : start;
        }
        if (maxSumSubArray >= maxSum) {
            maxSum = maxSumSubArray;
            end = i;
        }
    }
    for (let m = start; m <= end; m++) {
        arr[m] = Number.NEGATIVE_INFINITY;
    }
    return ({ maxSum, start, end });
}
//#endregion

//#region 9
//https://www.geeksforgeeks.org/find-k-pairs-smallest-sums-two-arrays/
// Given two integer arrays arr1[] and arr2[] sorted in ascending order and an integer k. Find k pairs with smallest sums such that one element of a pair belongs to arr1[] and other element belongs to arr2[]
// Examples: 

// Input :  arr1[] = {1, 7, 11}
//          arr2[] = {2, 4, 6}
//          k = 3
// Output : [1, 2],
//          [1, 4],
//          [1, 6]
// Explanation: The first 3 pairs are returned 
// from the sequence [1, 2], [1, 4], [1, 6], 
// [7, 2], [7, 4], [11, 2], [7, 6], [11, 4], 
// [11, 6]

router.post("/find-k-pairs-smallest-sums-two-arrays", (req, res) => {
    try {
        let { arr1, arr2, k } = req.body;
        const n1 = arr1.length;
        const n2 = arr2.length;
        let index2 = [];
        let response = [];
        let i = 0;
        while (i < n1) {
            index2.push(0);
            i++;
        }
        while (k > 0) {
            let minSum = Number.POSITIVE_INFINITY;
            let minIndex = 0;
            for (let i = 0; i < n1; i++) {
                if (index2[i] < n2 && minSum > arr2[index2[i]] + arr1[i]) {
                    minSum = arr2[index2[i]] + arr1[i];
                    minIndex = i;
                }
            }
            response.push({ minSum, index1: minIndex, index2: index2[minIndex], output: [arr1[minIndex], arr2[index2[minIndex]]] });
            index2[minIndex]++;
            k--;
        }
        return res.send({ response });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

//#endregion

//#region 10
//https://www.geeksforgeeks.org/k-th-smallest-absolute-difference-two-elements-array/
// We are given an array of size n containing positive integers. 
// The absolute difference between values at indices i and j is |a[i] – a[j]|. 
// There are n*(n-1)/2 such pairs and we are asked to print the kth (1 <= k <= n*(n-1)/2) the smallest absolute difference among all these pairs.
router.post("/k-th-smallest-absolute-difference-two-elements-array", (req, res) => {
    try {
        let { arr, k } = req.body;
        const n = arr.length;
        mergeSort(arr, 0, n - 1);
        let diffArray = [];
        for (let i = 1; i < arr.length; i++) {
            diffArray[i - 1] = arr[i - 1] - arr[i];
        }
        let prefixSum = [];
        prefixSum.push(diffArray[0]);
        for (let i = 1; i < diffArray.length; i++) {
            prefixSum[i] = prefixSum[i - 1] + diffArray[i];
        }

        let minArr = [];
        let maxArr = [];

        // maxArr[0] = prefixSum[0];
        // maxArr[1] = Number.NEGATIVE_INFINITY;
        // if (prefixSum[0] > 0) { minArr.push(0); minArr.push(prefixSum[0]); }
        // if (prefixSum[0] <= 0) { minArr.push(prefixSum[0]); minArr.push(0); };
        // for (let i = 2; i < k ; i++) {
        //     minArr[i] = Number.POSITIVE_INFINITY;
        //     maxArr[i] = Number.NEGATIVE_INFINITY;
        // }

        for (let i = 0; i < k; i++) {
            minArr[i] = Number.POSITIVE_INFINITY;
            maxArr[i] = Number.NEGATIVE_INFINITY;
        }
        minArr[0] = 0;

        console.log(`prefixSum: ${prefixSum}
        `);
        console.log(`
        i: ${0}
        tempArr: ${[]}
        maxArr: ${maxArr}
        minArr: ${minArr} `)
        // for (let i = 1; i < prefixSum.length; i++) {
        for (let i = 0; i < prefixSum.length; i++) {
            let tempArr = [];
            for (let j = 0; j < k; j++) {
                tempArr.push(prefixSum[i] - minArr[j]);
            }
            findKMaxSum(maxArr, tempArr, k);
            findKMinimumMinValue(minArr, prefixSum[i], k);
            console.log(`
            i: ${i}
            tempArr: ${tempArr}
            maxArr: ${maxArr}
            minArr: ${minArr} `)
        }
        return res.send({ val: Math.abs(maxArr[maxArr.length - 1]) , maxArr});
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

const mergeSort = (arr, lb, ub) => {

    if (lb < ub) {
        const mid = Math.floor((lb + ub) / 2);
        mergeSort(arr, lb, mid);
        mergeSort(arr, mid + 1, ub);
        merge(arr, lb, mid, ub);
    }
}

const merge = (arr, lb, mid, ub) => {
    const b = [];
    let left = lb;
    let right = mid + 1;
    let i = 0
    while (left <= mid && right <= ub) {
        if (arr[left] < arr[right]) {
            b[i] = arr[left];
            i++;
            left++;
        } else {
            b[i] = arr[right];
            i++;
            right++;
        }
    }
    while (left <= mid) {
        b[i] = arr[left];
        i++;
        left++;
    }
    while (right <= ub) {
        b[i] = arr[right];
        i++;
        right++;
    }
    console.log(b);
    for (let j = 0; j < b.length; j++) {
        arr[lb + j] = b[j];
    }
}
//#endregion

//#region 11
//kadane's Algorithm
router.post("/kadane", (req, res) => {
    try {
        let { arr } = req.body;
        let maxSum = arr[0];
        let maxSumSubArray = arr[0];
        let start = 0;
        let end = 0;
        for (let i = 1; i < arr.length; i++) {
            if (maxSumSubArray > 0) {
                maxSumSubArray = maxSumSubArray + arr[i];
            } else {
                maxSumSubArray = arr[i];
                start = maxSumSubArray > maxSum ? i : start;
            }
            if (maxSumSubArray > maxSum) {
                maxSum = maxSumSubArray;
                end = i;
            }
        }
        return res.send({ maxSum, start, end });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})
//#endregion

module.exports = router;