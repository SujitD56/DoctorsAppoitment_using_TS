import { Doctor, IDoctor } from "../Model/index";
import bcrypt from "bcrypt";
import { error } from "console";


// Define the signupDoctor function as a constant and export it
export const signupDoctor = async (doctorData: Omit<IDoctor, '_id' | 'isActive'>) => {
  // Check if a doctor already exists with the same email
  const existingDoctor = await Doctor.findOne({ email: doctorData.email });
  if (existingDoctor) {
    throw error("Doctor already exists with this email");
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(doctorData.password, 10);

  // Create the doctor document
  const newDoctor = new Doctor({
    ...doctorData,
    password: hashedPassword,
  });

  // Save the doctor to the database
  await newDoctor.save();
  return newDoctor;
};