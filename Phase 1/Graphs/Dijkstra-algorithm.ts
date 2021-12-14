const shortestPath = (start, adjacencyMatrix, n) => {
    const minDistance = Array(n).fill(Number.POSITIVE_INFINITY);
    const pq = new PriorityQueue();
    pq.insert(new Elem(start, 0))

    while (pq.length > 0) {
        const elem = pq.poll();
        // console.log(elem);
        const edges = adjacencyMatrix[elem.vertice];
        // console.log(edges);
        if (minDistance[elem.vertice] > elem.distance) {
            minDistance[elem.vertice] = elem.distance;
            for (const key in edges) {
                if (edges[key] > 0) pq.insert(new Elem(Number(key), elem.distance + edges[key]))
            }
        }
    }

    return minDistance;
}

class PriorityQueue {
    //minHeap
    heap

    constructor() {
        this.heap = [];
    }

    insert(elem) {
        minHeapInsert(this.heap, elem);
    }

    poll() {
        return minHeapPoll(this.heap)
    }

    get length() {
        return this.heap.length;
    }
}

class Elem {
    vertice
    distance
    constructor(vertice, distance) {
        this.vertice = vertice;
        this.distance = distance;
    }
}


function minHeapInsert(heap, elem) {
    heap.push(new Elem(elem.vertice, elem.distance))
    let insertedIndex = heap.length - 1;
    let parentIndex = Math.ceil(insertedIndex / 2 - 1);
    while (parentIndex >= 0 && heap[parentIndex].distance > heap[insertedIndex].distance) {
        [heap[parentIndex], heap[insertedIndex]] = [heap[insertedIndex], heap[parentIndex]]
        insertedIndex = parentIndex;
        parentIndex = Math.ceil(insertedIndex / 2 - 1);
    }
}

function minHeapPoll(heap) {
    let heapLength = heap.length - 1;
    [heap[0], heap[heapLength]] = [heap[heapLength], heap[0]]
    const popValue = heap.pop();
    heapLength--;
    let leftChildIndex = 1;
    let rightChildIndex = 2;
    let parentIndex = 0;
    while (leftChildIndex < heapLength && rightChildIndex <= heapLength) {
        if (heap[parentIndex].distance > heap[leftChildIndex].distance && heap[leftChildIndex].distance < heap[rightChildIndex].distance) {
            [heap[parentIndex], heap[leftChildIndex]] = [heap[leftChildIndex], heap[parentIndex]];
            parentIndex = leftChildIndex;
        } else if (heap[parentIndex].distance > heap[rightChildIndex].distance) {
            [heap[parentIndex], heap[rightChildIndex]] = [heap[rightChildIndex], heap[parentIndex]]
            parentIndex = rightChildIndex;

        } else {
            break;
        }
        leftChildIndex = parentIndex * 2 + 1;
        rightChildIndex = parentIndex * 2 + 2;
    }
    return popValue;
}


console.log(shortestPath(0, [[0, 4, 0, 0, 0, 0, 0, 8, 0],
[4, 0, 8, 0, 0, 0, 0, 11, 0],
[0, 8, 0, 7, 0, 4, 0, 0, 2],
[0, 0, 7, 0, 9, 14, 0, 0, 0],
[0, 0, 0, 9, 0, 10, 0, 0, 0],
[0, 0, 4, 14, 10, 0, 2, 0, 0],
[0, 0, 0, 0, 0, 2, 0, 1, 6],
[8, 11, 0, 0, 0, 0, 1, 0, 7],
[0, 0, 2, 0, 0, 0, 6, 7, 0]], 9)); //[  0, 4, 12, 19, 21, 11, 9,  8, 14]