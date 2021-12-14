//https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/

const solveMaze = (maze) => {
    let sol = maze.map(x => {
        return x.map(y => 0)
    })
    console.log(maze);
    if (solveMazeUtil(sol, 0, 0, maze, 0, [], { count: 0 })) return sol;
    return null;
}


const solveMazeUtil = (sol, i, j, maze, step, memo = [], k) => {
    // console.log(i, j, isSafe(sol, i, j, maze))
    const key = i.toString().concat(",", j);
    if (memo.includes(key)) {console.log(key) ; return false;}
    k["count"]++;
    console.log(k);
    if (!isSafe(sol, i, j, maze)) {
        memo.push(key);
        return false;
    }
    step++;
    sol[i][j] = step;
    if (i == maze.length - 1 && j == maze[maze.length - 1].length - 1) return true
    if (solveMazeUtil(sol, i + 1, j, maze, step, memo, k)) return true;
    if (solveMazeUtil(sol, i, j + 1, maze, step, memo, k)) return true;
    if (solveMazeUtil(sol, i - 1, j, maze, step, memo, k)) return true;
    if (solveMazeUtil(sol, i, j - 1, maze, step, memo, k)) return true;
    step--;
    sol[i][j] = 0;
    
    memo.push(key);
    return false;
}


const isSafe = (sol, i, j, maze) => {
    if (maze[i] && maze[i][j] == 1 && sol[i][j] == 0) return true;
    return false;
}


console.log(solveMaze([
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 1]]))

console.log(solveMaze([
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1]]))

console.log(solveMaze([
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1]]))

console.log(solveMaze([
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1],
    [0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1]]))