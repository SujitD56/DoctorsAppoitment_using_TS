"use strict";
// import { Request, Response } from 'express';
// import { userService } from '../services/index';
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const index_1 = require("../services/index");
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await index_1.userService.registerUser(username, email, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token } = await index_1.userService.loginUser(email, password);
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.login = login;
//# sourceMappingURL=userController.js.map