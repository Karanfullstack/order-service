import { injectable } from 'inversify';
import CouponModel, { CouponI, CouponQueryI, UpdateCouponI } from '../models/coupon.model';
import { CouponRepositoryI } from './interfaces/coupon.interface';
import logger from '../config/logger';
import { AggregatePaginateResult } from 'mongoose';

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

    async findById(id: string): Promise<CouponI | null> {
        return await CouponModel.findById(id);
    }
    async updateCoupon(payload: UpdateCouponI, id: string): Promise<CouponI | null> {
        return await CouponModel.findOneAndUpdate(
            { _id: id },
            { $set: { ...payload } },
            { new: true },
        );
    }
    async getAllCoupons(query: CouponQueryI): Promise<AggregatePaginateResult<CouponI>> {
        const filter: CouponQueryI = {};

        if (query.tenantId) {
            filter.tenantId = query.tenantId;
        }
        if (query.title) {
            filter.title = query.title ? new RegExp(query.title, 'i') : undefined;
        }

        const page = query.page || 1;
        const limit = query.limit || 4;

        const aggrigate = CouponModel.aggregate([
            {
                $match: filter,
            },
        ]);
        return await CouponModel.aggregatePaginate(aggrigate, { page, limit });
    }
}
