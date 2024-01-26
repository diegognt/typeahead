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

  /**
   * Inserts a word into the trie with a value.
   *
   * @param {string} word The word to insert into the trie.
   * @param {T} value
   */
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

  /**
   * Returns the value of the word if it exists in the trie.
   *
   * @param {string} word The word to search for in the trie.
   * @returns {T | undefined} The value of the word if it exists in the trie.
   */
  valueOf(word: string): T | undefined {
    return this.search(word)?.value;
  }

  /**
   * Returns the Node of the word if it exists in the trie.
   *
   * @param {string} word
   * @returns {}
   */
  private search(word: string): Node<T> | undefined {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (currentNode.children.has(char)) {
        currentNode = currentNode.children.get(char) as Node<T>;
      } else {
        return undefined;
      }
    }
    return currentNode;
  }

  /**
   * Returns a list of all the possible words in the trie that start with a particular prefix.
   *
   * @param {string} prefix The prefix to search for in the trie.
   * @returns {string[]} The list of words found.
   */
  possibleWords(prefix: string = ""): string[] {
    if (!prefix) return [];

    const currentNode = this.search(prefix) as Node<T>;

    if (!currentNode) return [];

    if (currentNode.value && currentNode.children.size === 0) {
      return [prefix];
    } else {
      return this.collectWords(currentNode, prefix);
    }
  }

  /**
   * Collects and returns a list of all the Trie's words starting from a particular Node.
   *
   * @param {Node<T> | undefined} node The Node to start collecting words from.
   * @param {string} word The word to start collecting words from.
   * @param {string[]} result The result array to store the words in.
   * @returns {string[]} The list of words found.
   */
  private collectWords(
    node: Node<T> | undefined = undefined,
    word = "",
    result: string[] = []
  ): string[] {
    const currentNode = node || this.root;

    currentNode.children.forEach((node: Node<T>, char: string) => {
      if (node.value && node.children.size === 0) {
        // Is a leaf Node
        result.push(`${word}${char}`);
      } else {
        this.collectWords(node, `${word}${char}`, result);
      }
    });

    return result;
  }
}
