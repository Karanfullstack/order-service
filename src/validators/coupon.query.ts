import { query } from 'express-validator';

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
