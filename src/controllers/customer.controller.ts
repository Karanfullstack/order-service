import { Response } from 'express';
import logger from '../config/logger';
import { AuthRequest } from '../types';

class CustomerController {
    async get(req: AuthRequest, res: Response) {
        logger.info('AuthRequest', req.auth);
        res.json({ message: 'ok' });
    }
}

export default CustomerController;
