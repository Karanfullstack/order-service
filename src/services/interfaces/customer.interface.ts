import { Customer } from '../../models/customer.model';
import { AddressPayload } from '../../repository/interfaces/customer.interface';

export interface CustomerServiceI {
    createCustomer(customer: Customer): Promise<Customer | null>;
    addAddress(payload: AddressPayload): Promise<Customer | null>;
}
