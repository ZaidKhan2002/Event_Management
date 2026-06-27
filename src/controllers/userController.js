const userService = require('../services/userService');

const registerUser = async (req, res, next) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({ success: true, message: 'User registered successfully', data: user });
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const result = await userService.loginUser(req.body);
        res.status(200).json({ success: true, message: 'Login successful', data: result });
    }catch (error) {
        next(error);
    }
}    

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers
}