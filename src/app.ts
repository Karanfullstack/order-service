import express from 'express';
import { globalError } from './common/errorHandler';
import customerRouter from './routes/customer.routes';
import couponRouter from './routes/coupon.routes';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.send('health-check');
});

// routes
app.use('/customer', customerRouter);
app.use('/coupon', couponRouter);

// global error handler
app.use(globalError);
export default app;
