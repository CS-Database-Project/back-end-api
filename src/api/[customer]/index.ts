import { Router } from 'express';
import customerRegister from './register';

const customerRouter = Router();


customerRouter.post('/register', customerRegister);


export default customerRouter;