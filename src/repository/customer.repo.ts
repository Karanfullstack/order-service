import { injectable } from 'inversify';
import CustomerModel, { Customer } from '../models/customer.model';
import { AddressPayload, CustomerRepositoryI } from './interfaces/interface.repo';

@injectable()
class CustomerRepository implements CustomerRepositoryI {
    async createCustomer(customer: Customer): Promise<Customer | null> {
        return CustomerModel.create(customer);
    }
    async addAddress(payload: AddressPayload): Promise<Customer | null> {
        return CustomerModel.findOneAndUpdate(
            { _id: payload._id, userId: payload.userId },
            {
                $push: {
                    addresses: {
                        address: payload.address,
                    },
                },
            },
            { new: true },
        );
    }
}

export default CustomerRepository;
