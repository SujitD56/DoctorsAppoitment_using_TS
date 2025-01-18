import { Router } from "express";
const router = Router();

import doctorRoute from './doctroRoute';
import userRoute from './userRoute'

router.use("/doctor",doctorRoute)
router.use("/user", userRoute)

export default router;
