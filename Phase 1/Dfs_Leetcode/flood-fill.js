// https://leetcode.com/problems/flood-fill/

// An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

// You are also given three integers sr, sc, and newColor. You should perform a flood fill on the image starting from the pixel image[sr][sc].

// To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with newColor.

// Return the modified image after performing the flood fill.

// Example 1:


// Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2
// Output: [[2,2,2],[2,2,0],[2,0,1]]
// Explanation: From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
// Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.


var floodFill = function (image, sr, sc, newColor) {
    dfs(image, sr, sc, newColor, image[sr][sc], image.length, image[0].length,);
    return image;
}


function dfs(image, sr, sc, newColor, oldColor, m, n) {
    if (image[sr][sc] == newColor) return;
    image[sr][sc] = newColor;
    if (sr + 1 < m && image[sr + 1][sc] == oldColor) dfs(image, sr + 1, sc, newColor, oldColor, m, n);
    if (sr > 0 && image[sr - 1][sc] == oldColor) dfs(image, sr - 1, sc, newColor, oldColor, m, n);
    if (sc + 1 < n && image[sr][sc + 1] == oldColor) dfs(image, sr, sc + 1, newColor, oldColor, m, n);
    if (sc > 0 && image[sr][sc - 1] == oldColor) dfs(image, sr, sc - 1, newColor, oldColor, m, n);
}


console.log(floodFill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2))