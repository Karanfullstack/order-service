import { CouponI } from '../../models/coupon.model';

export interface CouponServiceI {
    createCouponService(payload: CouponI): Promise<CouponI | null>;
}
