import {Router} from "express";
const router = Router();

import {doctorController} from '../controller/index'

router.route("/signup").post( doctorController.signup);



export default router