import { inject, injectable } from 'inversify';
import { CouponI, CouponQueryI, UpdateCouponI } from '../models/coupon.model';
import { CouponServiceI } from './interfaces/coupon.interface';
import { TYPES } from '../const';
import { CouponRepositoryI } from '../repository/interfaces/coupon.interface';
import { AggregatePaginateResult } from 'mongoose';

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

    async updateCoupon(payload: UpdateCouponI, id: string): Promise<CouponI | null> {
        const coupon = await this.repo.findById(id);
        if (!coupon) throw new Error('Coupon could not found!');
        return this.repo.updateCoupon(payload, id);
    }

    async getAllCoupons(query: CouponQueryI): Promise<AggregatePaginateResult<CouponI>> {
        return await this.repo.getAllCoupons(query);
    }
}
