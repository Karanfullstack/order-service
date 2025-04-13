import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types';
import createHttpError from 'http-errors';
import CouponModel from '../models/coupon.model';

export const productAccess = () => {
    return async (req: AuthRequest, _res: Response, next: NextFunction) => {
        const tenant = req.auth.tenant;
        const role = req.auth.role;
        if (role !== 'admin') {
            const coupon = await CouponModel.findOne({ tenantId: tenant });
            if (!coupon) {
                return next(
                    createHttpError(403, "You dont' have permission to access this product!"),
                );
            }
        }
        return next();
    };
};
