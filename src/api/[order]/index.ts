import { Router } from 'express';
import placeOrder from './placeOrder';
import orderItemNote from './orderItemNote';
import addCourier from './addCourier';
import deleteCourier from './deleteCourier';
import updateOrderStatus from './updateOrderStatus';
import viewOrder from './viewOrder';


const orderRouter = Router();

orderRouter.post('/placeOrder',placeOrder);
orderRouter.post('/orderItemNote',orderItemNote);
orderRouter.put('/updateOrder/:id', updateOrderStatus);
orderRouter.get('/viewOrder*?', viewOrder);
orderRouter.post('/addCourier', addCourier);
orderRouter.delete('/deleteCourier/:id', deleteCourier);







export default orderRouter;