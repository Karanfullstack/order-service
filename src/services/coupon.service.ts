import { inject, injectable } from 'inversify';
import { CouponI } from '../models/coupon.model';
import { CouponServiceI } from './interfaces/coupon.interface';
import { TYPES } from '../const';
import { CouponRepositoryI } from '../repository/interfaces/coupon.interface';

@injectable()
export class CouponService implements CouponServiceI {
    constructor(@inject(TYPES.CouponRepository) private repo: CouponRepositoryI) {}

    async createCouponService(payload: CouponI): Promise<CouponI | null> {
        const coupon = await this.repo.findByCode(payload.code, payload.tenantId);

        if (coupon) {
            throw new Error('coupon is already exists');
        }
        return await this.repo.createCouponRepo(payload);
    }
}
