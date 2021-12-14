class BridgesAndArticulation {

    #n
    #ids
    #lowLink
    #visited
    #id = 0

    constructor(n, adjacencyList) {
        this.#n = n;
        this.#ids = [];
        this.#lowLink = [];
        this.#visited = Array(n).fill(false);
        this.adjacencyList = adjacencyList;
    }

    findBridges() {
        let bridges = [];
        for (let i = 0; i < this.#n; i++) {
            if (!this.#visited[i])
                this.dfsBridge(i, bridges, -1)
        }
        return bridges;
    }


    dfsBridge(at, bridges, parent) {

        this.#lowLink[at] = this.#id;
        this.#ids[at] = this.#id;
        this.#id++;
        this.#visited[at] = true;

        const toList = this.adjacencyList[at];
        for (const to of toList) {
            if (to == parent) continue;
            if (!this.#visited[to]) {
                this.dfsBridge(to, bridges, at);
                this.#lowLink[at] = Math.min(this.#lowLink[at], this.#lowLink[to]);
                if (this.#ids[at] < this.#lowLink[to]) { bridges.push({ at, to }); } //this will work because id once fixed are constant and at this point, lowLink[to] has minimum possible value already
            }
            else this.#lowLink[at] = Math.min(this.#lowLink[at], this.#ids[to]);
        }
    }

    findArticulationPoints() {
        let articulationPoints = Array(this.#n).fill(false);
        let outEdgeCount;
        for (let i = 0; i < this.#n; i++) {
            if (!this.#visited[i]) {
                outEdgeCount = { count: 0 };
                this.dfsArticulation(i, -1, i, articulationPoints, outEdgeCount);
                articulationPoints[i] = outEdgeCount > 1
            }
        }
        return articulationPoints;
    }



    dfsArticulation(at, parent, root, articulationPoints, outEdgeCount) {
        if (parent == root) outEdgeCount.count++;
        this.#lowLink[at] = this.#id;
        this.#ids[at] = this.#id;
        this.#id++;
        this.#visited[at] = true;

        const toList = this.adjacencyList[at];
        for (const to of toList) {
            if (to == parent) continue;
            if (!this.#visited[to]) {
                this.dfsArticulation(to, at, root, articulationPoints, outEdgeCount);
                this.#lowLink[at] = Math.min(this.#lowLink[at], this.#lowLink[to]);
                if (this.#ids[at] <= this.#lowLink[to]) { articulationPoints[at] = true }
            }
            else this.#lowLink[at] = Math.min(this.#lowLink[at], this.#ids[to]);
        }
    }
}

adjacencyList = [];
adjacencyList[8] = [1, 2];
adjacencyList[1] = [7, 4, 8, 2];
adjacencyList[2] = [8, 1];
adjacencyList[3] = [4, 6];
adjacencyList[4] = [1, 3, 5];
adjacencyList[5] = [4, 6];
adjacencyList[6] = [5, 3];
adjacencyList[7] = [1, 0];
adjacencyList[0] = [7];

const bridges = new BridgesAndArticulation(9, adjacencyList)
const articulations = new BridgesAndArticulation(9, adjacencyList)

console.log(bridges.findBridges())
console.log(articulations.findArticulationPoints())