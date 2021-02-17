import { Router } from 'express';
import userRegister from './register';
import userLogin from './login';

const userRouter = Router();

userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);



export default userRouter;