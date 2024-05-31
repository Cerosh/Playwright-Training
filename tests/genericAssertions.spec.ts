import { test, expect } from "@playwright/test";

test("Generic assertion test example.", async () => {
  const value = { prop: 1 };
  const stringContaining = "Hello world!";
  expect(value).not.toEqual({});
  expect(value.prop).toBe(1);
  expect(stringContaining).toContain("Hello");
  expect(stringContaining).toEqual(expect.stringContaining("Hello"));
  expect([1, 2, 3]).toEqual(expect.arrayContaining([3, 1]));
  expect(stringContaining).toHaveLength(12);
});
