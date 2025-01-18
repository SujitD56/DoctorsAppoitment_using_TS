import mongoose, { Schema, Document } from "mongoose";

interface IDoctor extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  specialty: string;
  yearsOfExperience: number;
  isActive: boolean;
}

const doctorSchema = new Schema<IDoctor>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Doctor = mongoose.model<IDoctor>('doctors', doctorSchema);
export  { Doctor, IDoctor };