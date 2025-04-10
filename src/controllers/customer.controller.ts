import { Response } from 'express';
import logger from '../config/logger';
import { AuthRequest } from '../types';
import Customer from '../models/customer.model';

class CustomerController {
    async get(req: AuthRequest, res: Response) {
        const auth = req.auth;
        logger.info('AuthRequest', auth);
        const customer = await Customer.findOne({ email: auth.email });

        if (!customer) {
            const newCustomer = await Customer.create({
                userId: auth.sub,
                email: auth.email,
                firstName: auth.name,
                lastName: auth.lastName,
            });

            return res.json({ message: 'customer has been created', newCustomer });
        }

        logger.info('Customer', customer);
        res.json({ message: 'ok', customer });
    }
}

export default CustomerController;
