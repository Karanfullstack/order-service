export const TYPES = {
    // @ Customer
    CustomerController: Symbol.for('CustomerController'),
    CustomerService: Symbol.for('CustomerService'),
    CustomerRepository: Symbol.for('CustomerRepository'),

    // @ Coupon
    CouponController: Symbol.for('CouponController'),
    CouponService: Symbol.for('CouponService'),
    CouponRepository: Symbol.for('CouponRespository'),
};

export enum CanAccess {
    ADMIN = 'admin',
    MANAGER = 'manager',
}
