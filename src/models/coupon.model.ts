import { model, Schema } from 'mongoose';

export interface CouponI {
    title: string;
    code: string;
    discount: number;
    validUpTo: Date;
    tenantId: string;
}

const couponSchema = new Schema<CouponI>(
    {
        title: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        validUpTo: {
            type: Date,
            required: true,
        },
        tenantId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const CouponModel = model('Coupon', couponSchema);
export default CouponModel;
