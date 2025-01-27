import { Router } from 'express';
import { userControllers} from '../controller/index';

const router = Router();

router.route('/send-otp').post (userControllers.sendOtpController);
router.route('/verify-otp').post (userControllers.verifyOtpController);

export default router;