// https://www.spoj.com/problems/STPAR/
// For sure, the love mobiles will roll again on this summer's street parade. Each year, the organisers decide on a fixed order for the decorated trucks. Experience taught them to keep free a side street to be able to bring the trucks into order.

// The side street is so narrow that no two cars can pass each other. Thus, the love mobile that enters the side street last must necessarily leave the side street first. Because the trucks and the ravers move up closely, a truck cannot drive back and re-enter the side street or the approach street.

// You are given the order in which the love mobiles arrive. Write a program that decides if the love mobiles can be brought into the order that the organisers want them to be.

class PriorityStack {

    #order;
    #vals;

    constructor(order) {
        this.#vals = [];
        this.#order = order //0 represents ascending ,1 represents descending
    }

    insert(val) {
        const statement1 = this.#order;
        const statement2 = val < this.#vals[this.#vals.length - 1];
        if (this.#vals.length == 0 || ((statement1 || !statement2) && (!statement1 || statement2))) {
            this.#vals.push(val);
            return true
        } else return false
    }

    canInsert(val) {
        const statement1 = this.#order;
        const statement2 = val < this.#vals[this.#vals.length - 1];
        return (this.#vals.length == 0 || ((statement1 || !statement2) && (!statement1 || statement2)))
    }

    remove() {
        return this.#vals.pop();
    }

    get length() {
        return this.#vals.length;
    }

    get val() {
        return [...this.#vals];
    }

}


function reorder(trucks) {

    if (trucks.length == 1) return "yes";

    let sideStreet = new PriorityStack(1);
    let rightMainStreet = new PriorityStack(0);
    let pointer = trucks.length - 1;
    while (pointer >= 0) {
        console.log(rightMainStreet.val.reverse());
        while (!rightMainStreet.insert(trucks[pointer])) {
            sideStreet.insert(rightMainStreet.remove())
            console.log(rightMainStreet.val.reverse());
        }
        while (sideStreet.length > 0) {
            rightMainStreet.insert(sideStreet.remove())
            console.log(rightMainStreet.val.reverse());
        }
        pointer--;
    }
    return rightMainStreet.val.reverse();
}

// console.log(reorder([5, 1, 2, 4, 3]))



function reorderOptimised(trucks) {

    if (trucks.length == 1) return "yes";

    let sideStreet = new PriorityStack(1);
    let rightMainStreet = new PriorityStack(0);
    let pointer = trucks.length - 1;
    while (pointer >= 0) {
        while (!rightMainStreet.canInsert(trucks[pointer])) sideStreet.insert(rightMainStreet.remove());
        while (!sideStreet.canInsert(trucks[pointer])) rightMainStreet.insert(sideStreet.remove());
        rightMainStreet.insert(trucks[pointer]);
        pointer--;
    }

    while (sideStreet.length > 0) rightMainStreet.insert(sideStreet.remove());

    return rightMainStreet.val.reverse();
}


console.log(reorderOptimised([5, 1, 2, 4, 3]))
