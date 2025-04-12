import { inject } from 'inversify';
import { TYPES } from '../const';
import { CouponServiceI } from '../services/interfaces/coupon.interface';
import { NextFunction, Response } from 'express';
import { AuthRequest, CouponRequest, UpdateCouponRequest } from '../types';
import logger from '../config/logger';
import { matchedData } from 'express-validator';
import { CouponQueryI } from '../models/coupon.model';

export class CouponController {
    constructor(@inject(TYPES.CouponService) private service: CouponServiceI) {}

    // @ Create Coupon Controller
    async createCoupon(req: CouponRequest, res: Response, _next: NextFunction) {
        const payload = req.body;
        logger.info('Payload Requesting', payload);

        const coupon = await this.service.createCouponService(payload);
        logger.info('Coupon Created', coupon);
        res.json({ success: true, coupon });
    }
    async update(req: UpdateCouponRequest, res: Response, _next: NextFunction) {
        const id = req.params.id;
        const auth = req.auth;
        const payload = req.body;
        logger.info('Requesting Id', id);
        logger.info('Requesting Auth', auth);
        logger.info('Requesting Body', payload);

        const updatedCoupon = await this.service.updateCoupon(payload, id);
        logger.info('Coupon Updated', updatedCoupon);
        res.json({ success: true, updatedCoupon });
    }

    async allCoupons(req: AuthRequest, res: Response, _next: NextFunction) {
        const validation: CouponQueryI = matchedData(req, { onlyValidData: true });
        logger.info('Requesting Query', validation);
        const coupons = await this.service.getAllCoupons(validation);
        logger.info('Coupons Fetched', coupons);
        res.json({ success: true, coupons });
    }
}
