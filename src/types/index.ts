export interface AuthRequest extends Request {
    auth: {
        id?: string;
        sub: string;
        role: string;
        jti: string;
        email: string;
        firstName: string;
        lastName: string;
        tenant: string;
    };
}

export interface AuthCookie {
    accessToken: string;
}
