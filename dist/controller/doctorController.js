"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const index_1 = require("../services/index");
const response_1 = require("../utils/response");
const signup = async (req, res) => {
    try {
        const doctorData = req.body;
        const newDoctor = await index_1.doctorService.signupDoctor(doctorData);
        const doctor = {
            name: newDoctor.name,
            email: newDoctor.email,
            phone: newDoctor.phone,
            specialty: newDoctor.specialty,
            yearsOfExperience: newDoctor.yearsOfExperience,
        };
        (0, response_1.successResponse)(res, doctor, "Doctor successfully registered");
    }
    catch (error) {
        (0, response_1.errorResponse)(res, error.message || "Internal server error", error.statusCode || 500);
    }
};
exports.signup = signup;
//# sourceMappingURL=doctorController.js.map