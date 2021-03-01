import { Router } from 'express';
import placeOrder from './placeOrder';
import orderItemNote from './orderItemNote';
import addCourier from './addCourier';
import deleteCourier from './deleteCourier';
import updateOrderStatus from './updateOrderStatus';
import viewOrder from './viewOrder';


const orderRouter = Router();

orderRouter.post('/placeOrder',placeOrder);
orderRouter.post('/order-item-note',orderItemNote);
orderRouter.post('/add-courier', addCourier);
orderRouter.put('/update-order-status/:orderId', updateOrderStatus);
orderRouter.get('/view-order*?', viewOrder);
orderRouter.delete('/delete-courier/:courierId', deleteCourier);


export default orderRouter;