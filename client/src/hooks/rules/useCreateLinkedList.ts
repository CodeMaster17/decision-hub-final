interface formData {
  property: string;
  operator: string;
  value: string;
}

class Node {
  data: formData;
  next: Node | null;

  constructor(data: formData) {
    this.data = data;
    this.next = null;
  }
}

export function useCreateLinkedList(arr: formData[]): Node | null {
  if (!arr || arr.length === 0) {
    return null;
  }

  let head = new Node(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    let newNode = new Node(arr[i]);
    current.next = newNode;
    current = newNode;
  }

  return head;
}
