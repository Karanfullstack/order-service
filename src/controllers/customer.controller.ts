import { Request, Response } from 'express';

class CustomerController {
    async get(req: Request, res: Response) {
        res.json({ message: 'ok' });
    }
}

export default CustomerController;
