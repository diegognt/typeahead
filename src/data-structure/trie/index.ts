export class Node<T> {
  value: T | undefined;
  children: Map<string, Node<T>>;

  constructor() {
    this.value = undefined;
    this.children = new Map();
  }
}

export class Trie<T> {
  root: Node<T>;

  constructor() {
    this.root = new Node<T>();
  }

  insert(word: string, value: T): void {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (currentNode.children.has(char)) {
        currentNode = currentNode.children.get(char) as Node<T>;
      } else {
        const newNode = new Node<T>();
        currentNode.children.set(char, newNode);
        currentNode = newNode;
      }

      if (i === word.length - 1) {
        currentNode.value = value;
      }
    }
  }
}
