// https://www.codechef.com/problems/SALARY

// Little chief has his own restaurant in the city. There are N workers there. 
// Each worker has his own salary. The salary of the i-th worker equals to Wi (i = 1, 2, ..., N). 
// Once, chief decided to equalize all workers, that is, he wants to make salaries of all workers to be equal. 
// But for this goal he can use only one operation: choose some worker and increase by 1 salary of each worker, except the salary of the chosen worker. 
// In other words, the chosen worker is the loser, who will be the only worker, whose salary will be not increased during this particular operation. 
// But loser-worker can be different for different operations, of course. Chief can use this operation as many times as he wants. But he is a busy man. 
// That's why he wants to minimize the total number of operations needed to equalize all workers. Your task is to find this number.


function equalize(n, W = []) {
    let minMoves = 0;
    W.sort((a, b) => a - b);
    if (n < 2) return 0;

    while (W[0] !== W[n - 1]) {
        let pointer = n - 1;
        let tourist = pointer - 1;
        W[n - 1]--;
        minMoves++;
        while (W[tourist] > W[pointer] && tourist >= 0) {
            [W[tourist], W[pointer]] = [W[pointer], W[tourist]];
            pointer = tourist;
            tourist = pointer - 1;
        }
    }
    return minMoves
}


console.log(equalize(5, [1, 2, 3, 6, 7]));
console.log(equalize(2, [41, 41]));