import { RequestHandler, Router } from 'express';
import CustomerController from '../controllers/customer.controller';
import authenticate from '../middleware/authenticate';
import { asyncWrapper } from '../utils/AsyncWrapper';

const router = Router();
const customerController = new CustomerController();
router.get(
    '/',
    authenticate,
    asyncWrapper(customerController.get.bind(customerController) as unknown as RequestHandler),
);

router.patch(
    '/address/:id',
    authenticate,
    asyncWrapper(
        customerController.addAddress.bind(customerController) as unknown as RequestHandler,
    ),
);

export default router;
