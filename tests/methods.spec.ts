import { expect, test } from "@playwright/test";
import { describe } from "node:test";

describe("Examples of API methods", () => {
  test("Example of a GET method", async ({ request }) => {
    const APIResponse = await request.get("https://reqres.in/api/users", {
      params: {
        page: 2,
      },
    });
    await expect(APIResponse).toBeOK();
    expect(APIResponse.status()).toBe(200);
    expect(await APIResponse.json()).toHaveProperty("page", 2);
  });

  test("Example of a POST method", async ({ request }) => {
    const APIResponse = await request.post("https://reqres.in/api/users", {
      data: {
        name: "Cerosh Jacob",
        job: "Software Engineer",
      },
    });
    expect(APIResponse.status()).toBe(201);
    const expectedKeys = new Set(["name", "job", "id", "createdAt"]);
    const actualKeys = new Set(Object.keys(await APIResponse.json()));
    expect([...expectedKeys].every((key) => actualKeys.has(key))).toBe(true);
  });

  test("Example of a PUT method", async ({ request }) => {
    const APIResponse = await request.post("https://reqres.in/api/users", {
      data: {
        name: "Cerosh Jacob",
        job: "Software Engineer",
      },
    });
    expect(APIResponse.status()).toBe(201);
    const responseBody = await APIResponse.json();
    const { id } = responseBody;
    const POSTAPIResponse = await request.put(
      `https://reqres.in/api/users/${id}`,
      {
        data: {
          name: "Rohan",
          job: "Student",
        },
      },
    );
    expect(POSTAPIResponse.status()).toBe(200);
    expect(await POSTAPIResponse.json()).toHaveProperty("updatedAt");
  });

  test("Example of a DELETE method", async ({ request }) => {
    const APIResponse = await request.post("https://reqres.in/api/users", {
      data: {
        name: "Cerosh Jacob",
        job: "Software Engineer",
      },
    });
    expect(APIResponse.status()).toBe(201);
    const responseBody = await APIResponse.json();
    const { id } = responseBody;
    const DELETEAPIResponse = await request.delete(
      `https://reqres.in/api/users/${id}`,
    );
    expect(DELETEAPIResponse.status()).toBe(204);
    const getAPIResponse = await request.get(
      `https://reqres.in/api/users/${id}`,
    );
    expect(await getAPIResponse.json()).not.toHaveProperty("name");
  });
});
