import { inject, injectable } from 'inversify';
import { Customer } from '../models/customer.model';
import { CustomerServiceI } from './interfaces/customer.interface';
import { TYPES } from '../const';
import { AddressPayload, CustomerRepositoryI } from '../repository/interfaces/customer.interface';

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
