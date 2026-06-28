import { describe, expect, test } from "bun:test";

describe("Event Module", () => {
    test("Event title should not be empty", () => {
        const title = "Node.js Workshop";

        expect(title.length).toBeGreaterThan(0);
    });

    test("Participants array should be empty initially", () => {
        const event = {
            participants: []
        };

        expect(event.participants.length).toBe(0);
    });

    test("Event should have a location", () => {
        const event = {
            location: "Mumbai"
        };

        expect(event.location).toBe("Mumbai");
    });
});