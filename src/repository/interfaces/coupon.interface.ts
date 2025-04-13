import { AggregatePaginateResult } from 'mongoose';
import type { CouponI, CouponQueryI, UpdateCouponI } from '../../models/coupon.model';

export interface CouponRepositoryI {
    createCouponRepo(payload: CouponI): Promise<CouponI | null>;
    updateCoupon(payload: UpdateCouponI, id: string): Promise<CouponI | null>;
    findByCodeAndTenant(code: string, tenantId: string): Promise<CouponI | null>;
    findById(id: string): Promise<CouponI | null>;
    getAllCoupons(query: CouponQueryI): Promise<AggregatePaginateResult<CouponI>>;
    deleteCoupon(id: string): Promise<CouponI | null>;
    findByCode(code: string): Promise<CouponI | null>;
}
