import { Router } from 'express';
import placeOrder from './placeOrder';
import orderItemNote from './orderItemNote';


const orderRouter = Router();

orderRouter.post('/placeOrder',placeOrder);
orderRouter.post('/orderItemNote',orderItemNote);





export default orderRouter;