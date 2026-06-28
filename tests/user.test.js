import { describe, expect, test } from "bun:test";

describe("User Module", () => {
    test("Role should be organizer", () => {
        const role = "organizer";

        expect(role).toBe("organizer");
    });

    test("Email should contain @", () => {
        const email = "zaid@gmail.com";

        expect(email.includes("@")).toBe(true);
    });

    test("Password length should be at least 6", () => {
        const password = "Password123";

        expect(password.length).toBeGreaterThanOrEqual(6);
    });
});