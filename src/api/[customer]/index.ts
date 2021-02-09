import { Router } from 'express';
import customerRegister from './register';
import customerLogin from './login';

const customerRouter = Router();


customerRouter.post('/register', customerRegister);
customerRouter.post('/login', customerLogin);


export default customerRouter;