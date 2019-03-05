class LinkedList {
    constructor() {
        this.start = null;
    }
}
class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next  = next;
    }
}
let list = new LinkedList();
let prev = null;
for (let letter of "abcdefghijklmnopqrstuvwxyz") {
    let node = new LinkedListNode(letter);

    if (prev) {
        let predecessor  = prev;
        predecessor.next = node;
    } else {
        list.start = node;
    }

    prev = node;
}

//console.log(`list:`, list.start.next.next);
