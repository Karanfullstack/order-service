import { AggregatePaginateResult } from 'mongoose';
import { CouponI, CouponQueryI, UpdateCouponI } from '../../models/coupon.model';

export interface CouponServiceI {
    createCouponService(payload: CouponI): Promise<CouponI | null>;
    updateCoupon(payload: UpdateCouponI, id: string): Promise<CouponI | null>;
    getAllCoupons(query: CouponQueryI): Promise<AggregatePaginateResult<CouponI>>;
}
