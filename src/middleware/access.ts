import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types';
import createHttpError from 'http-errors';
import { CanAccess } from '../const';

const RoleTypeGuard = (role: any): role is CanAccess => {
    return Object.values(CanAccess).includes(role as CanAccess);
};

export const accessAuth = (roles: CanAccess[]) => {
    return (req: AuthRequest, _res: Response, next: NextFunction) => {
        const role = req.auth.role;
        if (!RoleTypeGuard(role) || !roles.includes(role)) {
            return next(createHttpError(403, "You don't have permission"));
        }
        return next();
    };
};
