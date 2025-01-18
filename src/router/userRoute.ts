import {Router} from "express";
const router = Router();

import { userController } from "../controller/index";

router.route("/userSignup").post( userController.userSignUp) ;
router.route("/getProfile/:id").get(userController.getUserProfilebyid);
router.route("/profiles").get(userController.getUsersController)

export default router;
