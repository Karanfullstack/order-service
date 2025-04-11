import { RequestHandler, Router } from 'express';
import container from '../config/inversify.config';
import { TYPES } from '../const';
import { asyncWrapper } from '../utils/AsyncWrapper';
import authenticate from '../middleware/authenticate';
import { CouponController } from '../controllers/coupon.controller';

const router = Router();
// @ Dependencies Store
const couponCotorller = container.get<CouponController>(TYPES.CouponController);

// @ Protected
// @ Create New Coupon

router.post(
    '/',
    authenticate,
    asyncWrapper(couponCotorller.createCoupon.bind(couponCotorller) as RequestHandler),
);

export default router;
