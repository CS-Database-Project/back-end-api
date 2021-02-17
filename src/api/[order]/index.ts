import { Router } from 'express';
import addCourier from './addCourier';
import deleteCourier from './deleteCourier';
import updateOrderStatus from './updateOrderStatus';
import viewOrder from './viewOrder';

const orderRouter = Router();

orderRouter.put('/updateOrder/:id', updateOrderStatus);
orderRouter.get('/viewOrder*?', viewOrder);
orderRouter.post('/addCourier', addCourier);
orderRouter.delete('/deleteCourier/:id', deleteCourier);


export default orderRouter;