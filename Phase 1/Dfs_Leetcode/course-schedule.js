// https://leetcode.com/problems/course-schedule/
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.



// Example 1:

// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take. 
// To take course 1 you should have finished course 0. So it is possible.
// Example 2:

// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take. 
// To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

// var canFinish = function (numCourses, prerequisites) {
//     var visited = Array(numCourses).fill(false);
//     const adjacencyList = Array(numCourses).fill().map(() => []);

//     for (const prerequisite of prerequisites) {
//         adjacencyList[prerequisite[1]].push(prerequisite[0])
//     }
//     // console.log(adjacencyList);

//     for (let at = 0; at < numCourses; at++) {
//         if (!visited[at]) {
//             const visitedCurrentCycle = Array(numCourses).fill(false);
//             if (!dfs(visited, at, adjacencyList, visitedCurrentCycle)) return false;
//             console.log("---------------");
//         }
//     }
//     return true;
// };

// function dfs(visited, at, adjacencyList, visitedCurrentCycle) {
//     var graph = new Map();
//     var graph = new Set();

//     // console.log("HERE", visited, at, visitedCurrentCycle);

//     // base case
//     if (visitedCurrentCycle[at]) return false;

//     visitedCurrentCycle[at] = true;
//     // console.log("HERE1", visited, at, visitedCurrentCycle);
//     for (const nextElem of adjacencyList[at]) {
//         if (!visited[nextElem]) {
//             if (!dfs(visited, nextElem, adjacencyList, visitedCurrentCycle)) return false;
//         }
//     }

//     visited[at] = true;
//     return true;
// }


//dfs
var canFinish = function (numCourses, prerequisites) {
    var courseMap = {}
    for (const [course, preReqCourse] of prerequisites) {
        if (preReqCourse in courseMap) courseMap[preReqCourse].push(course);
        else courseMap[preReqCourse] = [course]
    }
    const visited = Array(numCourses);
    for (let i = 0; i < numCourses; i++) {
        if (courseMap[i] && !dfs(courseMap, visited, i)) return false;
    }
    return true;
};

function dfs(courseMap, visited, course) {

    if (visited[course] == 1) return true;
    if (visited[course] == 2) return false;

    visited[course] = 2;
    if (courseMap[course]) {
        for (const nextCourse of courseMap[course]) {
            if (!dfs(courseMap, visited, nextCourse)) return false;
        }
    }

    visited[course] = 1;
    return true;

}


//topologicalSort
var canFinish1 = function (numCourses, prerequisites) {

    var courseMap = {}
    var preReqCount = Array(numCourses).fill(0);
    var courseLeft = numCourses;

    for (const [course, preReqCourse] of prerequisites) {
        if (preReqCourse in courseMap) courseMap[preReqCourse].push(course);
        else courseMap[preReqCourse] = [course]
        preReqCount[course]++;
    }

    var queue = [];

    for (let course = 0; course < numCourses; course++) {
        if (preReqCount[course] == 0) {
            courseLeft--;
            queue.push(course)
        }
    }

    while (queue.length > 0) {
        const course = queue.shift();
        if (course in courseMap) {
            for (const nextCourse of courseMap[course]) {
                preReqCount[nextCourse]--;
                if (preReqCount[nextCourse] == 0) {
                    queue.push(nextCourse);
                    courseLeft--;
                }
            }
        }
    }

    return courseLeft == 0;
}



console.log(canFinish(2, [[1, 0]])) //true
console.log(canFinish(2, [[1, 0], [0, 1]])) //false
console.log(canFinish(5, [[1, 4], [2, 4], [3, 1], [3, 2]])) //false


console.log(canFinish1(2, [[1, 0]])) //true
console.log(canFinish1(2, [[1, 0], [0, 1]])) //false
console.log(canFinish1(5, [[1, 4], [2, 4], [3, 1], [3, 2]])) //false