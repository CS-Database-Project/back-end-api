import { Router } from 'express';
import customerRegister from './register';
import customerLogin from './login';
import viewCustomer from './view';
import changeAccountStatus from './changeAccountStatus';
import updateCustomerDetails from './updateCustomerDeails';
import changeUsername from './changeUsername';
import changePassword from './changePassword';

const customerRouter = Router();


customerRouter.post('/register', customerRegister);
customerRouter.post('/login', customerLogin);
customerRouter.get('/view*?', viewCustomer);
customerRouter.put('/change-account-status', changeAccountStatus);
customerRouter.put('/update-details',updateCustomerDetails);
customerRouter.put('/change-username',changeUsername);
customerRouter.put('/change-password',changePassword);

export default customerRouter;