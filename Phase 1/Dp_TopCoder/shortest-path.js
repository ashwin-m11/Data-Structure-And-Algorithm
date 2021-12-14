//Given an undirected graph G having N (1<N<=1000) vertices and positive weights. Find the shortest path from vertex 1 to vertex N, or state that such path doesn’t exist.
//https://www.topcoder.com/thrive/articles/Dynamic%20Programming:%20From%20Novice%20to%20Advanced
//Dijkstra’s shortest path algorithm | Greedy Algo-7
// https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/




const shortestPath = (start, end, tree) => {

    //initialize objects
    let coveredArray = []
    let unCoveredArray = Array(tree.length).fill(true);

    //base condition
    coveredArray.push(start);
    unCoveredArray[start] = false;

    //Initialize solution
    let minSum = Number.POSITIVE_INFINITY;
    let solutionPath = []
    const memo = {};

    const pathFinder = (coveredArray = [], currentSum, unCoveredArray) => {x
        const positionCovered = coveredArray.length
        const currentPos = coveredArray[positionCovered - 1];
        if (currentPos == end) {
            if (currentSum < minSum) {
                minSum = currentSum
                solutionPath = coveredArray;
            }
            return;
        }
        const nextPath = tree[currentPos]
        for (let i = 0; i < nextPath.length; i++) {
            if (nextPath[i] !== 0 && unCoveredArray[i]) {
                const newUncoveredArray = [...unCoveredArray];
                newUncoveredArray[i] = false;
                pathFinder([...coveredArray, i], currentSum + nextPath[i], newUncoveredArray)
            }
        }

    }

    pathFinder(coveredArray, 0, unCoveredArray);
    console.log(minSum)
    return solutionPath;
}


console.log(shortestPath(0, 0, [[ 0, 4, 0, 0, 0, 0, 0, 8, 0 ],
    [ 4, 0, 8, 0, 0, 0, 0, 11, 0 ],
    [ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
    [ 0, 0, 7, 0, 9, 14, 0, 0, 0 ],
    [ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
    [ 0, 0, 4, 14, 10, 0, 2, 0, 0 ],
    [ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
    [ 8, 11, 0, 0, 0, 0, 1, 0, 7 ],
    [ 0, 0, 2, 0, 0, 0, 6, 7, 0 ]] ))