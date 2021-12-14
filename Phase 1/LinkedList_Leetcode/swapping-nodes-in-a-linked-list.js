// https://leetcode.com/problems/swapping-nodes-in-a-linked-list/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var swapNodes = function (head, k) {
    var currentPointer = head;
    let currentKthNode = head;
    let traversedNode = 1
    while (traversedNode < k) {
        currentKthNode = currentKthNode.next;
        traversedNode++;
    }
    let kPosFromBeginning = currentKthNode;
    while (currentKthNode.next) {
        currentKthNode = currentKthNode.next;
        currentPointer = currentPointer.next;
    }
    let kPosFromEnd = currentPointer;

    [kPosFromBeginning.val, kPosFromEnd.val] = [kPosFromEnd.val, kPosFromBeginning.val]
    return head;
};