"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupDoctor = void 0;
const index_1 = require("../Model/index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const console_1 = require("console");
// Define the signupDoctor function as a constant and export it
const signupDoctor = async (doctorData) => {
    // Check if a doctor already exists with the same email
    const existingDoctor = await index_1.Doctor.findOne({ email: doctorData.email });
    if (existingDoctor) {
        throw (0, console_1.error)("Doctor already exists with this email");
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt_1.default.hash(doctorData.password, 10);
    // Create the doctor document
    const newDoctor = new index_1.Doctor({
        ...doctorData,
        password: hashedPassword,
    });
    // Save the doctor to the database
    await newDoctor.save();
    return newDoctor;
};
exports.signupDoctor = signupDoctor;
//# sourceMappingURL=doctorService.js.map