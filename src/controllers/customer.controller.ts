import { NextFunction, Response } from 'express';
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

    async addAddress(req: AuthRequest, res: Response, _next: NextFunction) {
        const auth = req.auth;
        const _id = req.params.id;
        const addressText = req.body.text;

        const addAddress = await Customer.findOneAndUpdate(
            { _id, userId: auth.sub },
            {
                $push: {
                    addresses: {
                        text: addressText,
                    },
                },
            },
            { new: true },
        );
        if (!addAddress) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        return res.json({
            message: 'Address has been added',
            addAddress,
        });
    }
}

export default CustomerController;
