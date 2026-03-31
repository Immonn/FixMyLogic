import assert from "assert";
import { Problem } from "../types";
import example from "./images/reverseLL.jpg";

// JS doesn't have a built in LinkedList class, so we'll create one
class LinkedList {
	value: number;
	next: LinkedList | null;

	constructor(value: number) {
		this.value = value;
		this.next = null;
	}

	reverse(): LinkedList {
		let current: LinkedList | null = this;
		let prev: LinkedList | null = null;
		while (current !== null) {
			const next = current.next as LinkedList;
			current.next = prev;
			prev = current;
			current = next;
		}
		return prev!;
	}
}

export const reverseLinkedListHandler = (fn: any) => {
	try {
		const tests = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3], [1]];
		const answers = [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [3, 2, 1], [1]];
		for (let i = 0; i < tests.length; i++) {
			const list = createLinkedList(tests[i]);
			const result = fn(list);
			assert.deepEqual(getListValues(result), answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Error from reverseLinkedListHandler: ", error);
		throw new Error(error);
	}
};

// it creates a linked list from an array
function createLinkedList(values: number[]): LinkedList {
	const head = new LinkedList(values[0]);
	let current = head;
	for (let i = 1; i < values.length; i++) {
		const node = new LinkedList(values[i]);
		current.next = node;
		current = node;
	}
	return head;
}

// it returns an array of values from a linked list
function getListValues(head: LinkedList): number[] {
	const values = [];
	let current: LinkedList | null = head;
	while (current !== null) {
		values.push(current.value);
		current = current.next;
	}
	return values;
}

const starterCodeReverseLinkedListJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function reverseLinkedList(head) {
  // Write your code here
};`;

export const reverseLinkedList: Problem = {
	id: "reverse-linked-list",
	title: "2. Reverse Linked List",
	problemStatement: `<p class='mt-3'>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>
	`,
	examples: [
		{
			id: 0,
			inputText: "head = [1,2,3,4,5]",
			outputText: "[5,4,3,2,1]",
			img: example.src,
		},
		{
			id: 1,
			inputText: "head = [1,2,3]",
			outputText: "[3,2,1]",
		},
		{
			id: 2,
			inputText: "head = [1]",
			outputText: "[1]",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the list is the range <code>[0, 5000]</code>.</li>
<li class='mt-2'><code>-5000 <= Node.val <= 5000</code></li>`,
	starterCode: starterCodeReverseLinkedListJS,
	handlerFunction: reverseLinkedListHandler,
	starterFunctionName: "function reverseLinkedList(",
	order: 2,
	starterCodePython: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseLinkedList(head):
    # Write your code here
    pass`,
	starterCodeCpp: `struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseLinkedList(ListNode* head) {
    // Write your code here
    return nullptr;
}`,
	starterCodeJava: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode reverseLinkedList(ListNode head) {
        // Write your code here
        return null;
    }
}`,
	pistonTestCases: {
		python: `import json

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def make_list(arr):
    head = None
    for v in reversed(arr):
        head = ListNode(v, head)
    return head

def list_vals(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    return res

{{USER_CODE}}

tests = [[1,2,3,4,5],[5,4,3,2,1],[1,2,3],[1]]
for arr in tests:
    res = reverseLinkedList(make_list(arr))
    print(json.dumps(list_vals(res)))`,
		cpp: `#include <iostream>
#include <vector>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* makeList(vector<int>& v) {
    ListNode* head = nullptr;
    for (int i = v.size()-1; i >= 0; i--) { auto* n = new ListNode(v[i]); n->next = head; head = n; }
    return head;
}

{{USER_CODE}}

int main() {
    vector<vector<int>> tests = {{1,2,3,4,5},{5,4,3,2,1},{1,2,3},{1}};
    for (auto& arr : tests) {
        ListNode* head = makeList(arr);
        ListNode* res = reverseLinkedList(head);
        cout << "[";
        bool first = true;
        while (res) { if (!first) cout << ","; cout << res->val; first = false; res = res->next; }
        cout << "]" << endl;
    }
    return 0;
}`,
		java: `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

{{USER_CODE}}

class Main {
    static ListNode makeList(int[] arr) {
        ListNode head = null;
        for (int i = arr.length - 1; i >= 0; i--) { ListNode n = new ListNode(arr[i]); n.next = head; head = n; }
        return head;
    }
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] tests = {{1,2,3,4,5},{5,4,3,2,1},{1,2,3},{1}};
        for (int[] arr : tests) {
            ListNode res = sol.reverseLinkedList(makeList(arr));
            StringBuilder sb = new StringBuilder("[");
            while (res != null) { sb.append(res.val); if (res.next != null) sb.append(","); res = res.next; }
            sb.append("]");
            System.out.println(sb.toString());
        }
    }
}`,
	},
};