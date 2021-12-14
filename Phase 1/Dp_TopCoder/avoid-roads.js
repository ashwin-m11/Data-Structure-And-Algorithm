// https://community.topcoder.com/stat?c=problem_statement&pm=1889&rd=4709

// Problem contains images. Plugin users can view them in the applet.

// In the city, roads are arranged in a grid pattern. Each point on the grid represents a corner where two blocks meet. The points are connected by line segments which represent the various street blocks. Using the cartesian coordinate system, we can assign a pair of integers to each corner as shown below.





// You are standing at the corner with coordinates 0,0. Your destination is at corner width,height. You will return the number of distinct paths that lead to your destination. Each path must use exactly width+height blocks. In addition, the city has declared certain street blocks untraversable. These blocks may not be a part of any path. You will be given a String[] bad describing which blocks are bad. If (quotes for clarity) "a b c d" is an element of bad, it means the block from corner a,b to corner c,d is untraversable. For example, let's say
// width  = 6
// length = 6
// bad = {"0 0 0 1","6 6 5 6"}
// The picture below shows the grid, with untraversable blocks darkened in black. A sample path has been highlighted in red.






const numWays = (width, breadth, bad = []) => {
    const badValues = {};
    bad.forEach(badVal => {
        const points = badVal.split(" ");
        if (points[0] < points[2] || points[1] < points[3]) {
            const key = points[0] + "," + points[1];
            if (key in badValues) badValues[key].push(points[2], points[3])
            else badValues[key] = [points[2], points[3]]
        } else {
            const key = points[2] + "," + points[3]
            if (key in badValues) badValues[key].push(points[0], points[1])
            else badValues[key] = [points[0], points[1]]
        }
    })
    const memo = {};
    // console.log(badValues);
    const pathFinder = (i, j) => {
        const key = i.toString().concat(",", j);
        if (key in memo) return memo[key];
        if ((i == width && j == breadth)) return 1;
        if (i > width || j > breadth) return 0;
        if (key in badValues) {
            if (badValues[key].length == 4) {
                memo[key] = 0;
                return 0;
            }
            if (badValues[key][0] == i) {
                memo[key] = pathFinder(i + 1, j);
                return memo[key];
            }
            else {
                memo[key] = pathFinder(i, j + 1);
                return memo[key]
            }
        }
        memo[key] = pathFinder(i + 1, j) + pathFinder(i, j + 1);
        return memo[key];
    }

    return pathFinder(0, 0)
}

console.log(numWays(6, 6, ["0 0 0 1", "6 6 5 6"])); //252
console.log(numWays(1, 1, [])); //2
console.log(numWays(35, 31, [])); //6406484391866536000
console.log(numWays(2, 2, ["0 0 1 0", "1 2 2 2", "1 1 2 1"])); //0