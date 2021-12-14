const shortestPathOptimized = (start, adjacencyMatrix, n) => {
    const minDistance = Array(n).fill(Number.POSITIVE_INFINITY);
    const nodePosDict = Array(n).fill(null);
    const pq = new PriorityQueueOptimized();
    pq.update(new Elem1(start, 0), nodePosDict)

    while (pq.length > 0) {
        const elem = pq.poll(nodePosDict);
        const edges = adjacencyMatrix[elem.vertice];

        if (minDistance[elem.vertice] > elem.distance) {
            minDistance[elem.vertice] = elem.distance;
            for (const key in edges) {
                const newDist = elem.distance + edges[key];
                if (nodePosDict[key] == null || pq.heap[nodePosDict[key]].distance > newDist) {
                    if (edges[key] > 0) pq.update(new Elem1(Number(key), elem.distance + edges[key]), nodePosDict)
                }
            }
        }
    }

    return minDistance;
}

class PriorityQueueOptimized {
    //minHeap
    heap;

    constructor() {
        this.heap = [];
    }

    update(elem, nodePosDict) {
        minHeapUpdate(this.heap, elem, nodePosDict);
    }

    poll(nodePosDict) {
        return minHeapPoll1(this.heap, nodePosDict)
    }

    get length() {
        return this.heap.length;
    }
}

class Elem1 {
    vertice
    distance
    constructor(vertice, distance) {
        this.vertice = vertice;
        this.distance = distance;
    }
}


function minHeapUpdate(heap, elem, nodePosDict) {
    // console.log("minHeapUpdate");
    check(heap, nodePosDict)
    let heapLength = heap.length - 1;
    if (nodePosDict[elem.vertice] == null) {
        heapLength++;
        heap.push(new Elem1(elem.vertice, elem.distance))
        nodePosDict[elem.vertice] = heapLength;
    } else {
        heap[nodePosDict[elem.vertice]].distance = elem.distance;
    }

    let updatedIndex = nodePosDict[elem.vertice];
    let parentIndex = Math.ceil(updatedIndex / 2 - 1);


    // if (parentIndex >= 0 && heap[parentIndex].distance > heap[updatedIndex].distance) {
    // bubbleUp(updatedIndex, heap, nodePosDict);
    // } else {
    //     swimDown(updatedIndex, heap, nodePosDict)
    // }

    bubbleUp(updatedIndex, heap, nodePosDict);

    check(heap, nodePosDict);
    // console.log("minHeapUpdateEnd");
    // console.log();

}

function minHeapPoll1(heap, nodePosDict) {
    // console.log("minHeapPoll1");
    check(heap, nodePosDict);
    let heapLength = heap.length - 1;

    if (heapLength > 0) [nodePosDict[heap[0].vertice], nodePosDict[heap[heapLength].vertice]] = [null, 0]
    else nodePosDict[heap[0].vertice] = null;

    interchange(heap, 0, heapLength);
    const popValue = heap.pop();
    heapLength--;
    let updatedIndex = 0;
    swimDown(updatedIndex, heap, nodePosDict)
    check(heap, nodePosDict);
    // console.log("minHeapPollEnd");
    // console.log();

    return popValue;
}

function bubbleUp(updatedIndex, heap, nodePosDict) {
    // console.log("bubbleUp");
    check(heap, nodePosDict);
    let parentIndex = Math.ceil(updatedIndex / 2 - 1);
    while (parentIndex >= 0 && heap[parentIndex].distance > heap[updatedIndex].distance) {
        interchange(nodePosDict, heap[parentIndex].vertice, heap[updatedIndex].vertice);
        interchange(heap, parentIndex, updatedIndex);
        updatedIndex = parentIndex;
        parentIndex = Math.ceil(updatedIndex / 2 - 1);
        check(heap, nodePosDict);
    }
    check(heap, nodePosDict);
    // console.log("bubbleUpEnd");
    // console.log();

}

function swimDown(updatedIndex, heap, nodePosDict) {
    // console.log("swimDown");
    check(heap, nodePosDict);
    let leftChildIndex = updatedIndex * 2 + 1;
    let rightChildIndex = updatedIndex * 2 + 2;
    while (true) {
        if (heap[leftChildIndex] != undefined && heap[updatedIndex].distance > heap[leftChildIndex].distance && (heap[rightChildIndex] == undefined || heap[leftChildIndex].distance < heap[rightChildIndex].distance)) {
            interchange(nodePosDict, heap[updatedIndex].vertice, heap[leftChildIndex].vertice)
            interchange(heap, updatedIndex, leftChildIndex);
            updatedIndex = leftChildIndex;
        } else if (heap[rightChildIndex] != undefined && heap[updatedIndex].distance > heap[rightChildIndex].distance) {
            interchange(nodePosDict, heap[updatedIndex].vertice, heap[rightChildIndex].vertice)
            interchange(heap, updatedIndex, rightChildIndex)
            updatedIndex = rightChildIndex;
        } else {
            break;
        }
        leftChildIndex = updatedIndex * 2 + 1;
        rightChildIndex = updatedIndex * 2 + 2;
    }
    check(heap, nodePosDict);
    // console.log("swimDownEnd");
    // console.log();


}


function check(heap, nodePosDict) {
    // console.log(JSON.stringify(heap), JSON.stringify(nodePosDict));
    if (nodePosDict.filter(x => x != null).length != heap.length) {
        // console.log("STOPPPP------")
        throw ("Stoppp");
    }

}


function interchange(arr, A, B) {
    [arr[A], arr[B]] = [arr[B], arr[A]]
    // C();
}


console.log(shortestPathOptimized(0, [[0, 4, 0, 0, 0, 0, 0, 8, 0],
[4, 0, 8, 0, 0, 0, 0, 11, 0],
[0, 8, 0, 7, 0, 4, 0, 0, 2],
[0, 0, 7, 0, 9, 14, 0, 0, 0],
[0, 0, 0, 9, 0, 10, 0, 0, 0],
[0, 0, 4, 14, 10, 0, 2, 0, 0],
[0, 0, 0, 0, 0, 2, 0, 1, 6],
[8, 11, 0, 0, 0, 0, 1, 0, 7],
[0, 0, 2, 0, 0, 0, 6, 7, 0]], 9)); //[  0, 4, 12, 19, 21, 11, 9,  8, 14]