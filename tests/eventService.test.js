const { describe, test, expect } = require("bun:test");
const eventService = require("../src/services/eventService");

describe("Event Service", () => {

    test("getAllEvents should return an array", async () => {
        const events = await eventService.getAllEvents();

        expect(Array.isArray(events)).toBe(true);
    });

    test("getEventById should return null for invalid id", async () => {
        const event = await eventService.getEventById("invalid-id");

        expect(event).toBe(null);
    });

});