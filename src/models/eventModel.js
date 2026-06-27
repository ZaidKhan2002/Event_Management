const { v4: uuidv4 } = require('uuid');

const createEvent = ({ title, description, date, location, organizerId }) => ({
    id: uuidv4(),
    title,
    description,
    date,
    location,
    organizerId,
    participants: [],
    createdAt: new Date().toISOString()
})

module.exports = {
    createEvent
}  