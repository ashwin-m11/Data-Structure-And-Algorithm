// https://community.topcoder.com/tc?module=ProblemDetail&rd=4705&pm=1166

// You have been given a list of jewelry items that must be split amongst two people: Frank and Bob. Frank likes very expensive jewelry. Bob doesn't care how expensive the jewelry is, as long as he gets a lot of jewelry. Based on these criteria you have devised the following policy:
// 1) Each piece of jewelry given to Frank must be valued greater than or equal to each piece of jewelry given to Bob. In other words, Frank's least expensive piece of jewelry must be valued greater than or equal to Bob's most expensive piece of jewelry.
// 2) The total value of the jewelry given to Frank must exactly equal the total value of the jewelry given to Bob.
// 3) There can be pieces of jewelry given to neither Bob nor Frank.
// 4) Frank and Bob must each get at least 1 piece of jewelry.
// Given the value of each piece, you will determine the number of different ways you can allocate the jewelry to Bob and Frank following the above policy. For example:
// 	values = {1,2,5,3,4,5}
// Valid allocations are:
//   Bob       		Frank
//   1,2		         3
//   1,3        		 4
//   1,4		         5  (first 5)
//   1,4         		 5  (second 5)
//   2,3 		         5  (first 5)
//   2,3         		 5  (second 5)
//    5  (first 5)		 5  (second 5)
//    5  (second 5)	 5  (first 5)
// 1,2,3,4       		5,5
// Note that each '5' is a different piece of jewelry and needs to be accounted for separately. There are 9 legal ways of allocating the jewelry to Bob and Frank given the policy, so your method would return 9.

const jewelry = (jewels = [], countMemo = { val: 0 }) => {

    jewels.sort((a, b) => a - b);

    const optimize = (sumBob, countBob, maxPosBob, sumFrank, countFrank, minPosFrank) => {
        if (maxPosBob >= minPosFrank) return;
        if (countBob < countFrank) return;
        if (sumBob == sumFrank) {
            countMemo["val"] += jewels[maxPosBob] == jewels[minPosFrank] ? 2 : 1;
            jewelry([...jewels.slice(maxPosBob + 1, minPosFrank)], countMemo)
        }
        else if (sumBob > sumFrank) {
            for (let i = maxPosBob + 1; i < minPosFrank; i++) {
                optimize(sumBob, countBob, maxPosBob, sumFrank + jewels[i], countFrank + 1, i)
            }
        } else {
            for (let i = maxPosBob + 1; i < minPosFrank; i++) {
                optimize(sumBob + jewels[i], countBob + 1, i, sumFrank, countFrank, minPosFrank)
            }
        }
    }

    for (let i = 0; i < jewels.length - 1; i++) {
        for (let j = i + 1; j <= jewels.length - 1; j++) {
            optimize(jewels[i], 1, i, jewels[j], 1, j)
        }
    }

    return countMemo;
}


// const countValForDuplication = (duplicationCount, factorialMemo) => {
//     const halfValue = Math.floor(duplicationCount / 2);
//     if (halfValue == 0) return 1;
//     // console.log(halfValue);
//     let sum = 1;
//     for (let i = 1; i <= halfValue; i++) {
//         let value = factorialMemo[duplicationCount] / factorialMemo[i]
//         // console.log(value)
//         value = value / factorialMemo[i];
//         // console.log(value)
//         value = value / factorialMemo[duplicationCount - 2 * i]
//         // console.log(value);
//         // console.log();
//         sum += value;
//     }
//     return sum;
// }


console.log(jewelry([1, 2, 5, 3, 4, 5])) //9

// console.log(jewelry([1000, 1000, 1000, 1000, 1000,
//     1000, 1000, 1000, 1000, 1000,
//     1000, 1000, 1000, 1000, 1000,
//     1000, 1000, 1000, 1000, 1000,
//     1000, 1000, 1000, 1000, 1000,
//     1000, 1000, 1000, 1000, 1000])) //18252025766940

console.log(jewelry([1, 2, 3, 4, 5])) //4

console.log(jewelry([7, 7, 8, 9, 10, 11, 1, 2, 2, 3, 4, 5, 6])) //607

console.log(jewelry([123, 217, 661, 678, 796, 964, 54, 111, 417, 526, 917, 923])) //0
