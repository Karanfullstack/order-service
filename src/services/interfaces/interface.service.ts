import { Customer } from '../../models/customer.model';
import { AddressPayload } from '../../repository/interfaces/interface.repo';

export interface CustomerServiceI {
    createCustomer(customer: Customer): Promise<Customer | null>;
    addAddress(payload: AddressPayload): Promise<Customer | null>;
}
