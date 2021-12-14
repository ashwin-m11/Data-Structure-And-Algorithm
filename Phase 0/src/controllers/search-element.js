"use strict";

const express = require('express');
const router = express.Router();

//#region findPivot
router.post("/findPivot", async (req, res) => {
    try {
        let { arr } = req.body;
        return res.send({ pivot: findPivot(arr, 0, arr.length - 1) });

    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});

const findPivot = (arr, low, high) => {
    if (high === low) return low;
    const mid = Math.floor((high + low) / 2);

    if (high > mid && arr[mid] > arr[mid + 1]) return mid;
    if (low < mid && arr[mid - 1] > arr[mid]) return mid - 1;
    if (arr[low] > arr[mid]) return findPivot(arr, low, mid - 1);
    return findPivot(arr, mid + 1, high);

}
//#endregion

//#region find index of an element in a sorted array but rotated by an offset
router.post("/searchElement", async (req, res) => {
    try {
        let { arr, key } = req.body;
        return res.send({ index: searchElement(arr, 0, arr.length - 1, key) });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});

const searchElement = (arr, low, high, key) => {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === key) return mid;
    if (arr[low] < arr[mid - 1]) {
        if (key >= arr[low] && key <= arr[mid - 1]) {
            return searchElement(arr, low, mid - 1, key);
        }
        return searchElement(arr, mid + 1, high, key);
    } else if (key >= arr[mid + 1] && key <= arr[high]) {
        return searchElement(arr, mid + 1, high, key);
    } else {
        return searchElement(arr, low, mid - 1, key);
    }
}
//#endregion

//#region Consider an array of distinct numbers sorted in increasing order. The array has been rotated (clockwise) k number of times. Given such an array, find the value of k.
router.post("find", async (req, res) => {
    try {
        let { arr } = req.body;
        return res.send({ index: getIndex(arr, 0, arr.length - 1) });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});

const getIndex = (arr, low, high) => {

    if (high === low) return low;
    if (high < low) return 0;
    const mid = Math.floor((low + high) / 2);
    if (high > mid && arr[mid] > arr[mid + 1]) return mid + 1;
    if (low < mid && arr[mid] < arr[mid - 1]) return mid;
    if (arr[mid] < arr[high]) return getIndex(arr, low, mid - 1)
    return getIndex(arr, mid + 1, high);
}
//#endregion

//#region Find element at given index after a number of rotations
//An array consisting of N integers is given. There are several Right Circular Rotations of range[L..R] that we perform. After performing these rotations, we need to find element at a given index.

router.post("", async (req, res) => {
    try {
        const { arr, ranges } = req.body;
        let index = req.body.index;
        for (let i = ranges.length - 1; i >= 0; i--) {
            index = indexManipulation(ranges[i][0], ranges[i][1], index);
            console.log(index);
            console.log("1..");

        }
        const value = arr[index];
        return res.send({ value });
    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});

const indexManipulation = (low, high, key) => {
    if (low <= key && key <= high) {
        if (key === low) key = high;
        else key = key - 1;
        console.log("2..");
    }
    console.log("3..");
    return key;
}
//#endregion

module.exports = router;