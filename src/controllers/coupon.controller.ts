import { inject } from 'inversify';
import { TYPES } from '../const';
import { CouponServiceI } from '../services/interfaces/coupon.interface';
import { NextFunction, Response } from 'express';
import { AuthRequest, CouponRequest, UpdateCouponRequest } from '../types';
import logger from '../config/logger';
import { matchedData, validationResult } from 'express-validator';
import { CouponQueryI, UpdateCouponI } from '../models/coupon.model';
import createHttpError from 'http-errors';
import { convertIntoIso } from '../utils/validateDate';

export class CouponController {
    constructor(@inject(TYPES.CouponService) private service: CouponServiceI) {}

    // @ Create Coupon Controller
    async create(req: CouponRequest, res: Response, _next: NextFunction) {
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
        const toIsoDates = convertIntoIso(payload.validUpTo as Date);
        logger.info('ISO Date Request', toIsoDates);

        const updatePayload: UpdateCouponI = { ...payload, validUpTo: toIsoDates };
        const updatedCoupon = await this.service.updateCoupon(updatePayload, id);
        logger.info('Coupon Updated', updatedCoupon);
        res.json({ success: true, updatedCoupon });
    }

    async getCoupons(req: AuthRequest, res: Response, _next: NextFunction) {
        const validation: CouponQueryI = matchedData(req, { onlyValidData: true });
        logger.info('Requesting Query', validation);
        logger.info('Auth Requesting', req.auth);
        const coupons = await this.service.getAllCoupons(validation);
        logger.info('Coupons Fetched', coupons);
        res.json({ success: true, coupons });
    }

    async delete(req: AuthRequest, res: Response, next: NextFunction) {
        const id = req.params.id;
        logger.info('Requesting Coupon Id', id);
        const validation = validationResult(req);

        if (!validation.isEmpty()) {
            logger.error('Validation Error', validation.array()[0].msg);
            return next(createHttpError(400, validation.array()[0].msg as string));
        }

        const deletedCoupon = await this.service.deleteCoupon(id);
        logger.info('Coupon has been deleted', deletedCoupon);
        res.json({ success: true, deletedCoupon });
    }
    async verify(req: CouponRequest, res: Response, _next: NextFunction) {
        const code = req.body.code;
        logger.info('Requesting Code', code);
        const coupon = await this.service.verifyCoupone(code);
        logger.info('Veryfied Coupon Result:', coupon);
        res.json({ success: coupon.valid, coupon });
    }
}
