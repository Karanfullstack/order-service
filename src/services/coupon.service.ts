import createHttpError from 'http-errors';
import { inject, injectable } from 'inversify';
import { AggregatePaginateResult } from 'mongoose';
import { TYPES } from '../const';
import { CouponI, CouponQueryI, UpdateCouponI } from '../models/coupon.model';
import { CouponRepositoryI } from '../repository/interfaces/coupon.interface';
import { validateDates } from '../utils/validateDate';
import { CouponServiceI } from './interfaces/coupon.interface';

@injectable()
export class CouponService implements CouponServiceI {
    constructor(@inject(TYPES.CouponRepository) private repo: CouponRepositoryI) {}

    async createCouponService(payload: CouponI): Promise<CouponI | null> {
        const coupon = await this.repo.findByCodeAndTenant(payload.code, payload.tenantId);

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
    async deleteCoupon(id: string): Promise<CouponI | null> {
        const coupon = await this.repo.findById(id);
        if (!coupon) throw createHttpError('404', 'Coupon not found');
        return await this.repo.deleteCoupon(id);
    }

    async verifyCoupone(code: string): Promise<CouponI> {
        const coupon = await this.repo.findByCode(code);
        if (!coupon) throw createHttpError(404, 'Coupon not found');

        if (validateDates(coupon.validUpTo)) {
            return { ...coupon, valid: true };
        } else {
            return { ...coupon, valid: false, discount: 0 };
        }
    }
}
