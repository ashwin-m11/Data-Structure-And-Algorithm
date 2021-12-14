/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
var duplicateZeros = function (arr) {
    let count = 0;
    let tourist = 0;
    let length = arr.length;
    while (tourist + count <= length) {
        if (arr[tourist++] == 0) count++;
    }
    tourist--;
    let val = Number.POSITIVE_INFINITY
    while (count > 0) {
        console.log(arr, tourist, count);
        const val = arr[tourist];
        if (val == 0) {
            arr[tourist + count] = val;
            count--;
        }
        arr[tourist + count] = val;
        tourist--;
    }
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
    arr.splice(length)
    return arr;

};

console.log(duplicateZeros([1, 0, 2, 3, 0, 4, 5, 0]))
// console.log(duplicateZeros([1, 5, 2, 0, 6, 8, 0, 6, 0]))
// console.log(duplicateZeros([0, 1, 7, 6, 0, 2, 0, 7]))