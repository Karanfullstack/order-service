import { param, query } from 'express-validator';
import { isValidObjectId } from 'mongoose';

export const couponQueryValidator = [
    query('title').optional().isString().withMessage('title must be a string'),
    query('code').optional().isString().withMessage('code must be a string'),
    query('tenantId').optional().isString().withMessage('tenantId must be a string'),

    query('discount')
        .optional()
        .custom((value) => {
            if (value) {
                if (isNaN(Number(value))) {
                    return false;
                }
                return true;
            }
        }),
    query('page')
        .optional()
        .custom((value) => {
            if (value) {
                if (isNaN(Number(value))) {
                    return false;
                }
                if (Number(value) > 100) {
                    return false;
                }
                return true;
            }
        }),

    query('limit')
        .optional()
        .custom((value) => {
            if (value) {
                if (isNaN(Number(value))) {
                    return false;
                }
                if (Number(value) > 100) {
                    return false;
                }
                return true;
            }
        }),
];

export const CouponParamsValidator = [
    param('id')
        .isString()
        .withMessage('Params must be a string value')
        .custom((value) => {
            const isvalid = isValidObjectId(value);
            if (!isvalid) throw new Error('Params is not a valid object id');
            return true;
        }),
];
