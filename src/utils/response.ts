import { Response } from "express";

export const successResponse = (res: Response, data: any, message: string) => {
  return res.status(200).json({ success: true, message, data });
};

export const errorResponse = (res: Response, error: any, message: string, statusCode = 500) => {
  return res.status(statusCode).json({ success: false, message, error });
};
