const floydWarshallSolver = (edges, n, start = 0, end = n - 1) => {
    const matrix = Array(n).fill().map(() => Array(n).fill(Number.POSITIVE_INFINITY));
    const next = Array(n).fill().map(() => Array(n).fill(null));

    for (let i = 0; i < n; i++) {
        matrix[i][i] = 0;
    }

    for (let edge of edges) {
        matrix[edge.from][edge.to] = edge.weight;
        next[edge.from][edge.to] = edge.to;
    }

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (matrix[i][k] + matrix[k][j] < matrix[i][j]) {
                    matrix[i][j] = matrix[i][k] + matrix[k][j];
                    next[i][j] = next[i][k];
                }
            }
        }
    }

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (matrix[i][k] + matrix[k][j] < matrix[i][j]) {
                    matrix[i][j] = Number.NEGATIVE_INFINITY;
                    next[i][j] = -1;
                }
            }
        }
    }

    let path = [];
    while (start != end) {
        if (start == -1) {
            path = "Infinite loop";
            break;
        } else if (start == null) {
            path = "Not possible";
            break;
        }
        path.push(start);
        start = next[start][end];
    }


    if (next[end][end] == -1) path = "Infinite loop";
    else if (Array.isArray(path)) path.push(end);

    console.log(path);

    return matrix;
}



class Edge {
    constructor(from, to, weight) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}

const edges = [];
edges.push(new Edge(0, 1, 2))
edges.push(new Edge(0, 2, 5))
edges.push(new Edge(0, 6, 10))
edges.push(new Edge(1, 2, 2))
edges.push(new Edge(1, 4, 11))
edges.push(new Edge(2, 6, 2))
edges.push(new Edge(6, 5, 11))
edges.push(new Edge(4, 5, 1))
edges.push(new Edge(5, 4, -2))


floydWarshallSolver(edges, 7).forEach(x => console.log(JSON.stringify(x, (_, val) => val == Number.POSITIVE_INFINITY ? "Infinity" : val == Number.NEGATIVE_INFINITY ? "-Infinity" : val)))
console.log();

floydWarshallSolver(edges, 7, 0, 2).forEach(x => console.log(JSON.stringify(x, (_, val) => val == Number.POSITIVE_INFINITY ? "Infinity" : val == Number.NEGATIVE_INFINITY ? "-Infinity" : val)))
console.log();

edges.push(new Edge(2, 2, -2))
floydWarshallSolver(edges, 7).forEach(x => console.log(JSON.stringify(x, (_, val) => val == Number.POSITIVE_INFINITY ? "Infinity" : val == Number.NEGATIVE_INFINITY ? "-Infinity" : val)))

