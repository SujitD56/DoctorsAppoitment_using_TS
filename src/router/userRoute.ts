// import { Router } from 'express';
// import { userControllers} from '../controller/index';

// const router = Router();

// router.route('/send-otp').post (userControllers.sendOtpController);
// router.route('/verify-otp').post (userControllers.verifyOtpController);

// export default router;

import express from 'express';
import { userControllers} from '../controller/index';

const router = express.Router();

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);

export default router;
