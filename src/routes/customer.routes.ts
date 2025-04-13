import { RequestHandler, Router } from 'express';
import CustomerController from '../controllers/customer.controller';
import authenticate from '../middleware/authenticate';
import { asyncWrapper } from '../utils/AsyncWrapper';
import container from '../config/inversify.config';
import { TYPES } from '../const';

const router = Router();
// @ Store for dependencies
const customerController = container.get<CustomerController>(TYPES.CustomerController);

// @Protected
// @ Create new Customer
router.get(
    '/',
    authenticate,
    asyncWrapper(customerController.get.bind(customerController) as unknown as RequestHandler),
);

// @Protected
// @ Add New Address to Customer
router.patch(
    '/address/:id',
    authenticate,
    asyncWrapper(
        customerController.addAddress.bind(customerController) as unknown as RequestHandler,
    ),
);

export default router;
