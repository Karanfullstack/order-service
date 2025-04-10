import { Request } from 'express';

export interface AuthRequest extends Request {
    body: {
        text: string;
    };
    params: {
        id: string;
    };
    auth: {
        id?: string;
        sub: string;
        role: string;
        jti: string;
        email: string;
        name: string;
        lastName: string;
        tenant: string;
    };
}

export interface AuthCookie {
    accessToken: string;
}
