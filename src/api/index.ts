import { Router } from "express";
import { responseBuilder } from './../utilities/response/index';
import customerRouter from './[customer]/index';
import orderRouter from './[order]/index';
import paymentRouter from './[payment]/index';
import productRouter from './[product]/index';
import userRouter from './[user]/index';

const apiRouter = Router();
apiRouter.use(responseBuilder);

//Routes
apiRouter.use('/customer', customerRouter);
apiRouter.use('/order', orderRouter);
apiRouter.use('/payment', paymentRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;