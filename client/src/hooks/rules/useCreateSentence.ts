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

// Function to create a sentence by concatenating the data in the linked list
export function useCreateSentenceFromLinkedList(head: Node | null): string {
  let current = head;
  let sentence = '';

  while (current !== null) {
    const { property, operator, value } = current.data;

    sentence += `The ${property} is ${operator} ${value}`;

    if (current.next !== null) {
      sentence += ', ';
    }

    current = current.next;
  }

  return sentence;
}
