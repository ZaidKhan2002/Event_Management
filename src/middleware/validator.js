const AppError = require('../utils/AppError');

const validateUser = (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || name.trim().length < 3) {
        return next(new AppError("'name' must be at least 3 characters.", 400));
    }

    if (!email || !email.includes("@")) {
        return next(new AppError("Please provide a valid email.", 400));
    }

    if (!password || password.length < 6) {
        return next(new AppError("'password' must be at least 6 characters.", 400));
    }

    const allowedRoles = ["organizer", "attendee"];

    if (!role || !allowedRoles.includes(role.toLowerCase().trim())) {
        return next(
            new AppError("Role must be either 'organizer' or 'attendee'.", 400)
        );
    }

    next();
};

const validateCreateEvent = (req, res, next) => {
    const { title, description, date, location } = req.body;

    if (!title || title.trim().length < 5) {
        return next(
            new AppError("'title' must be at least 5 characters.", 400)
        );
    }

    if (!description || description.trim().length < 10) {
        return next(
            new AppError("'description' must be at least 10 characters.", 400)
        );
    }

    if (!date || isNaN(Date.parse(date))) {
        return next(new AppError("Please provide a valid event date.", 400));
    }

    if (new Date(date) < new Date()) {
        return next(
            new AppError("Event date cannot be in the past.", 400)
        );
    }

    if (!location || location.trim().length < 3) {
        return next(
            new AppError("'location' must be at least 3 characters.", 400)
        );
    }

    next();
};

const validateUpdateEvent = (req, res, next) => {
    const { title, description, date, location } = req.body;

    if (title !== undefined && title.trim().length < 5) {
        return next(
            new AppError("'title' must be at least 5 characters.", 400)
        );
    }

    if (description !== undefined && description.trim().length < 10) {
        return next(
            new AppError("'description' must be at least 10 characters.", 400)
        );
    }

    if (date !== undefined) {
        if (isNaN(Date.parse(date))) {
            return next(
                new AppError("Please provide a valid event date.", 400)
            );
        }

        if (new Date(date) < new Date()) {
            return next(
                new AppError("Event date cannot be in the past.", 400)
            );
        }
    }

    if (location !== undefined && location.trim().length < 3) {
        return next(
            new AppError("'location' must be at least 3 characters.", 400)
        );
    }

    next();
};

module.exports = { validateUser, validateCreateEvent, validateUpdateEvent };