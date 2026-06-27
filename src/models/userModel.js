const { v4: uuidv4 } = require('uuid');

const createUser = ({ name, email, passwordHash, role }) => ({
    id: uuidv4(),
    name,
    email,
    passwordHash,
    role,
    createdAt: new Date().toISOString()
})

module.exports = {
    createUser
}   