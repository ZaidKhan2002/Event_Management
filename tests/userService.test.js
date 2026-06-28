const { describe, test, expect } = require("bun:test");
const userService = require("../src/services/userService");

describe("User Service", () => {

    test("getAllUsers should return an array", async () => {
        const users = await userService.getAllUsers();

        expect(Array.isArray(users)).toBe(true);
    });

    test("findUserByEmail should return null for unknown email", async () => {
        const user = await userService.findUserByEmail("unknown@test.com");

        expect(user).toBe(null);
    });

    test("findUserById should return null for invalid id", async () => {
        const user = await userService.findUserById("invalid-id");

        expect(user).toBe(null);
    });

});