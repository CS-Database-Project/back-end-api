import { Router } from 'express';
import customerRegister from './register';
import customerLogin from './login';
import viewCustomer from './view';
import changeAccountStatus from './changeAccountStatus';
import updateCustomerDetails from './updateCustomerDeails';

const customerRouter = Router();


customerRouter.post('/register', customerRegister);
customerRouter.post('/login', customerLogin);
customerRouter.get('/view*?', viewCustomer);
customerRouter.put('/change-account-status', changeAccountStatus);
customerRouter.put('/update-details',updateCustomerDetails);

export default customerRouter;