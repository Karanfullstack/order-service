import { injectable } from 'inversify';
import CouponModel, { CouponI } from '../models/coupon.model';
import { CouponRepositoryI } from './interfaces/coupon.interface';
import logger from '../config/logger';

@injectable()
export class CouponRepository implements CouponRepositoryI {
    async createCouponRepo(payload: CouponI): Promise<CouponI | null> {
        const coupon = await CouponModel.create(payload);
        logger.info('Coupon Repo', coupon);
        return coupon;
    }
    async findByCode(code: string, tenantId: string): Promise<CouponI | null> {
        return await CouponModel.findOne({ tenantId, code });
    }
}
