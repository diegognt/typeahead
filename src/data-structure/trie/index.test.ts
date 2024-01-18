import { describe, expect, test } from "vitest";
import { Trie, Node } from "./index";

describe("The Node class", () => {
  test("should be able to be instantiated", () => {
    const node = new Node();

    expect(node).toBeDefined();
  });

  test("should be instantiated with the 'value' property `undefined` by default", () => {
    const node = new Node<Number>();

    expect(node.value).toBe(undefined);
  });

  test("should be instantiated with the 'children' property empty by default", () => {
    const node = new Node<Number>();

    expect(node.children).toBeDefined();
    expect(node.children).toBeTypeOf("object");
    expect(node.children.size).toBe(0);
  });

  test("should assign a string value in the 'value' property ", () => {
    const node = new Node<Number>();
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
});
