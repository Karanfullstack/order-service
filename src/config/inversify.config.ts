import { Container } from 'inversify';
import CustomerController from '../controllers/customer.controller';
import { TYPES } from '../const';
import { CustomerServiceI } from '../services/interfaces/interface.service';
import CustomerService from '../services/customer.service';
import { CustomerRepositoryI } from '../repository/interfaces/interface.repo';
import CustomerRepository from '../repository/customer.repo';

const container = new Container();

// @ Controllers
container.bind<CustomerController>(TYPES.CustomerController).to(CustomerController);

// @ Services
container.bind<CustomerServiceI>(TYPES.CustomerService).to(CustomerService);

// @ Repository
container.bind<CustomerRepositoryI>(TYPES.CustomerRepository).to(CustomerRepository);

export default container;
