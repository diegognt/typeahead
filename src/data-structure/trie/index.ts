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
}
