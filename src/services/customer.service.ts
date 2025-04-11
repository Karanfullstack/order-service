import { inject, injectable } from 'inversify';
import { Customer } from '../models/customer.model';
import { CustomerServiceI } from './interfaces/interface.service';
import { TYPES } from '../const';
import { AddressPayload, CustomerRepositoryI } from '../repository/interfaces/interface.repo';

@injectable()
class CustomerService implements CustomerServiceI {
    // @ Create Customer
    constructor(@inject(TYPES.CustomerRepository) private repo: CustomerRepositoryI) {}
    async createCustomer(customer: Customer): Promise<Customer | null> {
        return this.repo.createCustomer(customer);
    }
    // @ Add new Adress to Customer
    async addAddress(payload: AddressPayload): Promise<Customer | null> {
        return this.repo.addAddress(payload);
    }
}

export default CustomerService;
