import { Container } from 'inversify';
import CustomerController from '../controllers/customer.controller';
import { TYPES } from '../const';
import { CustomerServiceI } from '../services/interfaces/customer.interface';
import CustomerService from '../services/customer.service';
import { CustomerRepositoryI } from '../repository/interfaces/customer.interface';
import CustomerRepository from '../repository/customer.repo';
import { CouponController } from '../controllers/coupon.controller';
import { CouponService } from '../services/coupon.service';
import { CouponRepository } from '../repository/coupon.repo';

const container = new Container();

// @ Controllers
container.bind<CustomerController>(TYPES.CustomerController).to(CustomerController);
container.bind<CouponController>(TYPES.CouponController).to(CouponController);

// @ Services
container.bind<CustomerServiceI>(TYPES.CustomerService).to(CustomerService);
container.bind<CouponService>(TYPES.CouponService).to(CouponService);

// @ Repository
container.bind<CustomerRepositoryI>(TYPES.CustomerRepository).to(CustomerRepository);
container.bind<CouponRepository>(TYPES.CouponRepository).to(CouponRepository);
export default container;
