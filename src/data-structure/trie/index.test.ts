import { describe, expect, test } from "vitest";
import { Trie, Node } from "./index";

describe("The Node class", () => {
  test("should be able to be instantiated", () => {
    const node = new Node();

    expect(node).toBeDefined();
  });

  test("should be instantiated with the 'value' property `undefined` by default", () => {
    const node = new Node<number>();

    expect(node.value).toBe(undefined);
  });

  test("should be instantiated with the 'children' property empty by default", () => {
    const node = new Node<number>();

    expect(node.children).toBeDefined();
    expect(node.children).toBeTypeOf("object");
    expect(node.children.size).toBe(0);
  });

  test("should assign a string value in the 'value' property ", () => {
    const node = new Node<number>();
    node.value = 7;

    expect(node.value).toBe(7);
    expect(node.value).toBeTypeOf("number");
  });
});

describe("The Trie class", () => {
  test("should be able to be instantiated", () => {
    const trie = new Trie();

    expect(trie).toBeDefined();
  });

  test("should insert a word into the trie with a value using the 'insert' method", () => {
    const trie = new Trie<number>();
    trie.insert("one", 1);

    expect(trie.root.children.size).toBe(1);
    expect(trie.root.children.has("o")).toBe(true);
    expect(trie.root.children.get("o")?.value).toBe(undefined);
    expect(trie.root.children.get("o")?.children.has("n")).toBe(true);

    expect(trie.root.children.get("o")?.children.get("n")?.value).toBe(
      undefined
    );
    expect(
      trie.root.children.get("o")?.children.get("n")?.children.has("e")
    ).toBe(true);

    expect(
      trie.root.children.get("o")?.children.get("n")?.children.has("e")
    ).toBe(true);
    expect(
      trie.root.children.get("o")?.children.get("n")?.children.get("e")?.value
    ).toBe(1);
    expect(
      trie.root.children.get("o")?.children.get("n")?.children.get("e")
        ?.children.size
    ).toBe(0);
  });

  test("should return the value of a word inserted into the trie using the 'valueOf' method", () => {
    const trie = new Trie<number>();
    trie.insert("one", 1);

    expect(trie.valueOf("one")).toBe(1);
  });

  test("should return `undefined` if the word is not in the trie using the 'valueOf' method", () => {
    const trie = new Trie<number>();
    trie.insert("one", 1);

    expect(trie.valueOf("two")).toBe(undefined);
  });

  test("should return an array of existing words when uses the 'possibleWords' method with an existing prefix", () => {
    const trie = new Trie<number>();
    trie.insert("one", 1);
    trie.insert("two", 2);
    trie.insert("three", 3);

    expect(trie.possibleWords("on")).toEqual(["one"]);
    expect(trie.possibleWords("t")).toEqual(["two", "three"]);
    expect(trie.possibleWords("th")).toEqual(["three"]);
  });

  test("should return an empyt array when uses the 'possibleWords' method with an empty prefix", () => {
    const trie = new Trie<number>();
    trie.insert("one", 1);
    trie.insert("two", 2);
    trie.insert("three", 3);

    expect(trie.possibleWords("")).toEqual([]);
  });

  test("should return an empty array when uses the 'possibleWords' method with a non-existing prefix", () => {
    const trie = new Trie<number>();
    trie.insert("one", 1);
    trie.insert("two", 2);
    trie.insert("three", 3);

    expect(trie.possibleWords("f")).toEqual([]);
  });
});
