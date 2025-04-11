import { inject } from 'inversify';
import { TYPES } from '../const';
import { CouponServiceI } from '../services/interfaces/coupon.interface';
import { NextFunction, Response } from 'express';
import { CouponRequest } from '../types';
import logger from '../config/logger';

export class CouponController {
    constructor(@inject(TYPES.CouponService) private service: CouponServiceI) {}

    async createCoupon(req: CouponRequest, res: Response, _next: NextFunction) {
        const payload = req.body;
        logger.info('Payload Requesting', payload);

        const coupon = await this.service.createCouponService(payload);
        logger.info('Coupon Created', coupon);
        res.json({ success: true, coupon });
    }
}
