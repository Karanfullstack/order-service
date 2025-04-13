import { model, Schema } from 'mongoose';

export interface Address {
    text: string;
    isDefault: boolean;
}

export interface Customer {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    addresses?: Address[];
}

const AddressSchema = new Schema<Address>(
    {
        text: {
            type: String,
            required: true,
        },
        isDefault: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    { _id: false },
);

const customerSchema = new Schema<Customer>(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        addresses: [AddressSchema],
    },
    { timestamps: true },
);

const CustomerModel = model('Customer', customerSchema);

export default CustomerModel;
