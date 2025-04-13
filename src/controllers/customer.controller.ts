import { NextFunction, Response } from 'express';
import logger from '../config/logger';
import { CustomerRequest } from '../types';
import CustomerModel from '../models/customer.model';
import { inject } from 'inversify';
import { TYPES } from '../const';
import { CustomerServiceI } from '../services/interfaces/customer.interface';
import { AddressPayload } from '../repository/interfaces/customer.interface';

class CustomerController {
    constructor(@inject(TYPES.CustomerService) private service: CustomerServiceI) {}

    // @ Create Customer Controller
    async get(req: CustomerRequest, res: Response) {
        const auth = req.auth;

        logger.info('AuthRequest', auth);

        const customer = await CustomerModel.findOne({ email: auth.email }).lean();

        const customerData = {
            userId: auth.sub,
            email: auth.email,
            firstName: auth.name,
            lastName: auth.lastName,
        };

        logger.info('Receiving Body', customerData);

        if (!customer) {
            logger.info('New Customer creating', customer);
            const newCustomer = await this.service.createCustomer(customerData);
            return res.json({ message: 'customer has been created', newCustomer });
        }

        logger.info('Customer is already created', customer);

        res.json({ message: 'ok', customer });
    }

    // @ Add Address Controller
    async addAddress(req: CustomerRequest, res: Response, _next: NextFunction) {
        const auth = req.auth;
        const _id = req.params.id;
        const address = req.body.text;

        const payload: AddressPayload = { userId: auth.sub, _id, address };

        logger.info('Address Payload', payload);

        const addAddress = await this.service.addAddress(payload);

        if (!addAddress) {
            logger.error('Address has not been added', 'Customer not found');
            return res.status(404).json({ message: 'Customer not found' });
        }

        logger.info('Address has been added', addAddress);

        return res.json({
            message: 'Address has been added',
            addAddress,
        });
    }
}

export default CustomerController;
