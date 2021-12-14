"use strict";

const express = require('express');
const router = express.Router();

//#region bubbleSort
router.post("/bubbleSort", async (req, res) => {
    try {
        let { arr } = req.body;
        for (let i = 0; i < arr.length; i++) {
            let maxValue = arr[0];
            let indexMaxValue = 0;
            for (let j = 1; j < arr.length - i; j++) {
                if (arr[j] > maxValue) {
                    maxValue = arr[j];
                    indexMaxValue = j;
                }
            }
            const temp = arr[indexMaxValue];
            arr[indexMaxValue] = arr[arr.length - i - 1];
            arr[arr.length - i - 1] = temp;
            console.log("i: " + i);
            console.log("arr.length - 1-i: " + (arr.length - i - 1))
            console.log("maxValue: " + maxValue);
            console.log("indexMaxValue: " + indexMaxValue);
            console.log("arr: " + arr);
            console.log();
        }
        return res.send({ arr });

    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});
//#endregion

//#region insertionSort
router.post("/insertionSort", async (req, res) => {
    try {
        let { arr } = req.body;
        const n = arr.length;
        for (let i = 1; i < n; i++) {
            const temp = arr[i];
            let j = i;
            while (j >= 0) {
                j--;
                if (arr[j] > temp) {
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return res.send({ n, arr });

    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});
//#endregion

//#region selectionSort
router.post("/selectionSort", async (req, res) => {
    try {
        let { arr } = req.body;
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            let min = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[min]) {
                    min = j;
                }
            }
            if (min !== i) {
                const temp = arr[i];
                arr[i] = arr[min];
                arr[min] = temp;
            }
        }
        return res.send({ n, arr });

    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});
//#endregion

//#region quickSort
router.post("/quickSort", async (req, res) => {
    try {
        let { arr } = req.body;
        const n = arr.length;
        quickSort(arr, 0, n - 1);
        return res.send({ n, arr });

    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});

const quickSort = (arr, lb, ub) => {

    if (lb < ub) {
        const pivot = arr[lb];
        let l = lb;
        let r = ub;
        while (l < r) {
            // await sleep(100);
            console.log(`arr[${l}]: ${arr[l]}`);
            console.log(`arr[${r}]: ${arr[r]}`);
            console.log(`pivot: ${pivot}`);
            while (arr[l] < pivot) {
                l++;
                console.log(l);
            }
            while (arr[r] >= pivot) {
                r--;
                console.log(arr[r] >= pivot);
            }
            console.log("I am here ------");
            console.log(l < r);
            if (l < r) {
                console.log(arr);
                swap(arr, l, r);
                console.log(arr);
            }
        }
        console.log(arr);
        if (r >= 0) {   // r goes to negative in one case and then quickSort(arr, r + 1, ub); keeps running   
            swap(arr, lb, r);
            quickSort(arr, lb, r - 1);
            quickSort(arr, r + 1, ub);
        }
    }
}
const swap = (arr, a, b) => {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
//#endregion

//#region mergeSort
router.post("/mergeSort", async (req, res) => {
    try {
        let { arr } = req.body;
        const n = arr.length;
        mergeSort(arr, 0, n - 1);
        return res.send({ n, arr });

    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
});

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

//#region heapsort
router.post("/heapSort", async (req, res) => {
    try {
        let { arr } = req.body;
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
        for (let j = arr.length - 1; j > 0; j--) {
            console.log(j);
            swap1(arr, 0, j);
            deleteHeapSort(arr, j);     
            console.log(arr);
            console.log("------------");
        }
        return res.send({ n, arr });

    } catch (err) {
        return res.status(500).send({ error: `Some error occurred: ${err.message}` });
    }
})

const heapify = (arr, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left <= n - 1 && arr[largest] < arr[left]) {
        largest = left;
    }
    if (right <= n - 1 && arr[largest] < arr[right]) {
        largest = right;
    }
    if (largest !== i) {
        swap1(arr, largest, i);
        heapify(arr, n, largest);
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
    let maxNode = 0;
    while (maxNode < j) {
        const leftNode = maxNode * 2 + 1;
        const rightNode = maxNode * 2 + 2;
        let i = maxNode;
        if (arr[maxNode] < arr[leftNode] && leftNode < j) {
            maxNode = leftNode;
        }
        if (arr[maxNode] < arr[rightNode] && rightNode < j) {
            maxNode = rightNode;
        }
        if (maxNode !== i) {
            swap1(arr, i, maxNode);
        } else {
            break;
        }
    }
}

const swap1 = (arr, a, b) => {
    [arr[a], arr[b]] = [arr[b], arr[a]];
}
//#endregion

module.exports = router;