import { Router } from 'express';
import customerRegister from './register';
import customerLogin from './login';
import viewCustomer from './view';

const customerRouter = Router();


customerRouter.post('/register', customerRegister);
customerRouter.post('/login', customerLogin);
customerRouter.get('/view*?', viewCustomer);

export default customerRouter;