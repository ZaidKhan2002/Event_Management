const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { createUser } = require('../models/userModel');
const { readJSON, writeJSON  } = require('../utils/fileStore'); 
const AppError = require('../utils/AppError');

const FILE = 'users.json';

const getAllUsers = async () => readJSON(FILE);

const findUserByEmail = async (email) => {
    const users = await readJSON(FILE);
    return users.find((u) => u.email === email.toLowerCase().trim() || null);
}

const findUserById = async (id) => {
    const users = await readJSON(FILE);
    return users.find((u) => u.id === id) || null;
}

const registerUser = async ({ name, email, password, role }) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) throw new AppError('Email already in use', 400);

    const passwordHash = await bcrypt.hash(password, 10);
    const user = createUser({ name, email, passwordHash, role });

    const users = await readJSON(FILE);
    users.push(user);
    await writeJSON(FILE, users);

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
}

const loginUser = async ({ email, password }) => {
    const user = await findUserByEmail(email);
    if (!user) throw new AppError('Invalid email or password', 401);
    
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new AppError('Invalid email or password', 401);

    const token = jwt.sign({
         id: user.id, name: user.name,
        email: user.email,
        role: user.role
    }, 
    config.jwt.secret, 
    { expiresIn: config.jwt.expiresIn });

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, token };
}

module.exports = {
    getAllUsers,
    findUserByEmail,
    findUserById,
    registerUser,
    loginUser
}