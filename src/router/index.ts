import { Router } from "express";
const router = Router();

import userRoute from './userRoute';
import doctorRoute from './doctroRoute';


router.use('/doctor', doctorRoute);
router.use('/users', userRoute);

export default router;
