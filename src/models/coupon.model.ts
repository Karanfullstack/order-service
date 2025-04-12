import { AggregatePaginateModel, model, Schema } from 'mongoose';
import paginate from 'mongoose-aggregate-paginate-v2';

export interface CouponI {
    title: string | RegExp;
    code: string;
    discount: number;
    validUpTo: Date;
    tenantId: string;
}
export type UpdateCouponI = Partial<CouponI>;
export type CouponQueryI = Partial<CouponI> & { page?: number; limit?: number };

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

couponSchema.plugin(paginate);
const CouponModel = model<CouponI, AggregatePaginateModel<CouponI>>('Coupon', couponSchema);
export default CouponModel;
