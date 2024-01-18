export class Node<T> {
  value: T | undefined;
  children: Map<string, Node<T>>;

  constructor() {
    this.value = undefined;
    this.children = new Map();
  }
}

