import { Request, Response } from "express";
import { doctorService }from "../services/index";
import { successResponse, errorResponse } from "../utils/response";

export const signup = async (req: Request, res: Response) => {
    try {
      const doctorData = req.body;

      const newDoctor = await doctorService.signupDoctor(doctorData);
      const doctor = {
        name: newDoctor.name,
        email: newDoctor.email,
        phone: newDoctor.phone,
        specialty: newDoctor.specialty,
        yearsOfExperience: newDoctor.yearsOfExperience,
      }
      successResponse(res, doctor, "Doctor successfully registered")
    } catch (error: any) {
      errorResponse(res, error.message || "Internal server error", error.statusCode || 500);
    }
  };

