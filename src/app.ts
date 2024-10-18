import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import logger from './config/logger';

const app = express();

app.get('/', async (req, res) => {
   res.send('health-check');
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
   logger.error(error.message);
   const statusCode = error.statusCode || 500;

   res.status(statusCode).json({
      errors: [
         {
            type: error.name,
            msg: error.message,
            path: '',
            location: '',
         },
      ],
   });
});

export default app;
