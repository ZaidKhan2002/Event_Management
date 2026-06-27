const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticate, authorize } = require('../middleware/auth');
const { validateCreateEvent, validateUpdateEvent } = require("../middleware/validator");

router.get("/events", authenticate, eventController.getAllEvents);

router.get("/events/:id", authenticate, eventController.getEventById);

router.post(
    "/events",
    authenticate,
    authorize(["organizer"]),
    validateCreateEvent,
    eventController.createEvent
);

router.put(
    "/events/:id",
    authenticate,
    authorize(["organizer"]),
    validateUpdateEvent,
    eventController.updateEvent
);

router.delete(
    "/events/:id",
    authenticate,
    authorize(["organizer"]),
    eventController.deleteEvent
);

module.exports = router;