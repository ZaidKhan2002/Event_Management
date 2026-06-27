const { createEvent: createEventModel } = require("../models/eventModel");
const { readJSON, writeJSON } = require("../utils/fileStore");
const AppError = require("../utils/AppError");

const FILE = "events.json";

const getAllEvents = async () => {
    return await readJSON(FILE);
};

const getEventById = async (id) => {
    const events = await readJSON(FILE);
    if(!events) throw new AppError("No events found.", 404);
    return events.find(event => event.id === id) || null;
};

const createEvent = async ({
    title,
    description,
    date,
    location,
    organizerId,
}) => {
    const events = await readJSON(FILE);

    const newEvent = createEventModel({
        title,
        description,
        date,
        location,
        organizerId,
    });

    events.push(newEvent);

    await writeJSON(FILE, events);

    return newEvent;
};

const updateEvent = async (id, updatedData, organizerId) => {
    const events = await readJSON(FILE);

    const eventIndex = events.findIndex(event => event.id === id);

    if (eventIndex === -1) {
        throw new AppError("Event not found.", 404);
    }

    const existingEvent = events[eventIndex];
   
    if (existingEvent.organizerId !== organizerId) {
        throw new AppError(
            "You are not authorized to update this event.",
            403
        );
    }

    const updatedEvent = {
        ...existingEvent,
        title: updatedData.title ?? existingEvent.title,
        description: updatedData.description ?? existingEvent.description,
        date: updatedData.date ?? existingEvent.date,
        location: updatedData.location ?? existingEvent.location,
    };

    events[eventIndex] = updatedEvent;

    await writeJSON(FILE, events);

    return updatedEvent;
};


const deleteEvent = async (id, organizerId) => {
    const events = await readJSON(FILE);

    const eventIndex = events.findIndex(event => event.id === id);

    if (eventIndex === -1) {
        throw new AppError("Event not found.", 404);
    }

    if (events[eventIndex].organizerId !== organizerId) {
        throw new AppError(
            "You are not authorized to delete this event.",
            403
        );
    }

    const deletedEvent = events.splice(eventIndex, 1)[0];

    await writeJSON(FILE, events);

    return deletedEvent;
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};