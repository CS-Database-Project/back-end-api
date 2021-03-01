import { Router } from 'express';
import userRegister from './register';
import userLogin from './login';
import viewUser from './view';
import changeAccountStatus from './changeAccountStatus';
import updateUserDetails from './updateUserDetails';
import changeUsername from './changeUsername';
import changePassword from './changePassword';
import makeAdmin from './makeAdmin';

const userRouter = Router();

userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);
userRouter.get('/view*?', viewUser);
userRouter.put('/change-account-status', changeAccountStatus);
userRouter.put('/update-details',updateUserDetails);
userRouter.put('/change-username',changeUsername);
userRouter.put('/change-password',changePassword);
userRouter.put('/make-admin', makeAdmin);



export default userRouter;