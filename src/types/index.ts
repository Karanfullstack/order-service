import { Request } from 'express';
import { CouponI, UpdateCouponI } from '../models/coupon.model';

export interface CustomerRequest extends AuthRequest {
    body: {
        text: string;
    };
}

export interface CouponRequest extends AuthRequest {
    body: CouponI;
}
export interface UpdateCouponRequest extends AuthRequest {
    body: UpdateCouponI;
}

export interface AuthRequest extends Request {
    params: {
        id: string;
    };
    auth: Auth;
}

export interface Auth {
    id?: string;
    sub: string;
    role: string;
    jti: string;
    email: string;
    name: string;
    lastName: string;
    tenant: string;
}
export interface AuthCookie {
    accessToken: string;
}
