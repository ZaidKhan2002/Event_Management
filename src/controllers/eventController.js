const eventService = require('../services/eventService');

const getAllEvents = async (req, res, next) => {
    try {
        const events = await eventService.getAllEvents();
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        next(error);
    }
};

const getEventById = async (req, res, next) => {
    try{
        const event = await eventService.getEventById(req.params.id);
        res.status(200).json({ success: true, data: event });
    }catch (error) {
        next(error);
    }
};

const createEvent = async (req, res, next) => {
    try {
        const newEvent = await eventService.createEvent({
            ...req.body,
            organizerId: req.user.id
        });
        res.status(201).json({ success: true, message: 'Event created successfully', data: newEvent });
    } catch (error) {
        next(error);
    }
};

const updateEvent = async (req, res, next) => {
    try {
        const updatedEvent = await eventService.updateEvent(req.params.id, req.body, req.user.id);
        res.status(200).json({ success: true, message: 'Event updated successfully', data: updatedEvent });
    } catch (error) {
        next(error);
    }
};

const deleteEvent = async (req, res, next) => {
    try {
        await eventService.deleteEvent(req.params.id, req.user.id);
        res.status(200).json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};