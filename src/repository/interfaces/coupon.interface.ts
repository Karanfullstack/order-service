import type { CouponI } from '../../models/coupon.model';

export interface CouponRepositoryI {
    createCouponRepo(payload: CouponI): Promise<CouponI | null>;
    findByCode(code: string, tenantId: string): Promise<CouponI | null>;
}
