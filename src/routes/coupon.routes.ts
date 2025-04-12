import { RequestHandler, Router } from 'express';
import container from '../config/inversify.config';
import { CanAccess, TYPES } from '../const';
import { asyncWrapper } from '../utils/AsyncWrapper';
import authenticate from '../middleware/authenticate';
import { CouponController } from '../controllers/coupon.controller';
import { couponQueryValidator } from '../validators/coupon.query';
import { accessAuth } from '../middleware/access';
import { productAccess } from '../middleware/productAccess';

const router = Router();
// @ Dependencies Store
const couponCotorller = container.get<CouponController>(TYPES.CouponController);

// @ Protected
// @ Create New Coupon
router.post(
    '/',
    authenticate,
    accessAuth([CanAccess.ADMIN, CanAccess.MANAGER]) as RequestHandler,
    asyncWrapper(couponCotorller.create.bind(couponCotorller) as RequestHandler),
);
// @ Protected
// @ Update  Coupon
router.patch(
    '/:id',
    authenticate,
    accessAuth([CanAccess.ADMIN, CanAccess.MANAGER]) as RequestHandler,
    productAccess() as RequestHandler,
    asyncWrapper(couponCotorller.update.bind(couponCotorller) as RequestHandler),
);

// @ Protected
// @ Get All Coupons
router.get(
    '/',
    authenticate,
    accessAuth([CanAccess.ADMIN]) as RequestHandler,
    couponQueryValidator,
    asyncWrapper(couponCotorller.getCoupons.bind(couponCotorller) as RequestHandler),
);

// @ Protected
// @ Delete Coupon
router.delete(
    '/',
    authenticate,
    accessAuth([CanAccess.ADMIN, CanAccess.MANAGER]) as RequestHandler,
    productAccess() as RequestHandler,
    couponQueryValidator,
    asyncWrapper(couponCotorller.delete.bind(couponCotorller) as RequestHandler),
);
export default router;
