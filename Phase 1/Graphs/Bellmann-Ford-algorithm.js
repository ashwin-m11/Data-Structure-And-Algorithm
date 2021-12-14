const shortestPathBellmann = (edges, V, start) => {
    const distance = Array(V).fill(Number.POSITIVE_INFINITY);
    distance[start] = 0;
    for (let i = 0; i < V; i++) {
        for (const edge of edges) {
            if (distance[edge.from] + edge.weight < distance[edge.to]) distance[edge.to] = distance[edge.from] + edge.weight;
        }
    }
    
    for (let i = 0; i < V; i++) {
        for (const edge of edges) {
            if (distance[edge.from] + edge.weight < distance[edge.to]) distance[edge.to] = Number.NEGATIVE_INFINITY;
        }
    }


    return distance;
}



class Edge {
    constructor(from, to, weight) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}

const edges = [];
edges.push(new Edge(0, 1, 1))
edges.push(new Edge(1, 2, 1))
edges.push(new Edge(2, 4, 1))
edges.push(new Edge(4, 3, -3))
edges.push(new Edge(3, 2, 1))
edges.push(new Edge(1, 5, 4))
edges.push(new Edge(1, 6, 4))
edges.push(new Edge(5, 6, 5))
edges.push(new Edge(6, 7, 4))
edges.push(new Edge(5, 7, 3))


console.log(shortestPathBellmann(edges, 9, 0)) //[0, 1, -Infinite, -Infinite, -Infinity, 5, 5, 8, Infinite]
edges.push(new Edge(0, 0, -1))
console.log(shortestPathBellmann(edges, 9, 0)) //[-Infinite, -Infinite, -Infinite, -Infinite, -Infinity, -Infinite, -Infinite, -Infinite, Infinite]