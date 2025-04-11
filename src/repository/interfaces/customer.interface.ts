import { Customer } from '../../models/customer.model';

export type AddressPayload = {
    userId: string;
    _id: string;
    address: string;
};

export interface CustomerRepositoryI {
    createCustomer(customer: Customer): Promise<Customer | null>;
    addAddress(payload: AddressPayload): Promise<Customer | null>;
}
