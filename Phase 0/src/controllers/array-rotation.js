"use strict";

const express = require('express');
const router = express.Router();

router.post("/temp", async (req, res) => {
    try {
        let { arr, d } = req.body;
        const n = arr.length;
        while (d >= n) {
            d = d % n;
            console.log(d);
        }

        //arr.slice returns new array thus increasing space complexity

        //#region  OK
        // space Complexity is propotional to 2n
        // const array = d === 0 ? arr : arr.slice(d, n).concat(arr.slice(0, d)); 
        // return res.send({ array });
        //#endregion

        //#region GOOD
        // space Complexity is propotional to n
        // if (d !== 0) arr = arr.slice(d, n).concat(arr.slice(0, d));
        // return res.send({ arr });
        //#endregion

        //#region BETTER
        // space Complexity is propotional to d
        // if (d !== 0) {
        //     const temp = arr.splice(0, d);
        //     arr = arr.concat(temp);
        // }
        // return res.send({ arr });
        //#endregion

        //#region without using any inbuilt functions
        // space Complexity is propotional to d
        //time complexity s proportional to n 
        if (d !== 0) {
            const temp = [];
            const n = arr.length
            for (let index = 0; index < n; index++) {
                if (index < d) {
                    temp.push(arr[index]);
                }
                if (index < n - d) {
                    arr[index] = index + d <= n ? arr[index + d] : arr[index + d - n];
                } else {
                    arr[index] = temp[index - (n - d)]; //storing value of temp in arr back!
                }
            }
        }
        return res.send({ arr });
        //#endregion


    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});


router.post("/pivot", async (req, res) => {
    try {
        let { arr } = req.body;


        return res.send({ pivot: findPivot(arr, 0, arr.length - 1) });
        //#endregion


    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});

const findPivot = (arr, low, high) => {
    if (high === low) return low;
    const mid = Math.floor((hig + low) / 2);

    if (arr[mid] > arr[mid + 1]) return mid;
    if (arr[mid - 1] > arr[mid]) return mid - 1;
    if (arr[low] >= arr[mid]) return findPivot(arr, low, mid - 1);
    return findPivot(arr, mid + 1, high);

}

module.exports = router;
