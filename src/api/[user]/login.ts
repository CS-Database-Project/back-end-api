import { body, inputValidator } from './../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from './../../model/index';
import { ERROR } from '../../model/ERROR';
import { Request, Response, NextFunction } from '../../utilities/types';
import bcrypt from 'bcrypt';


/*
    STEP 1 - Validating Inputs
*/
const validator = inputValidator(
    body('username').exists().withMessage("Username is required..."),
    body('password').exists().withMessage("Password is required...")
);
/*
    STEP 2 - Validating User
*/
const validateUser:Handler = async(req: Request, res: Response, next: NextFunction) => {

    const { responseGenerator } = res;
    const { username, password } = req.body;

    const [error, data] = await model.user.userAccount.findByUsername(username);
    const accountData = data[0];
    if(error === ERROR.NO_ERROR){
        const { password: passwordInDb, activeStatus } = accountData;
        const validPassword = await bcrypt.compare(password, passwordInDb);
        if(!validPassword){
            responseGenerator.status.BAD_REQUEST().message("Invalid username or password").send();
            return;
        }

        if(!activeStatus){
            responseGenerator.status.UNAUTHORIZED().message("Your Account is disabled...").send();
            return;
        }

        req.body.userId = accountData.userId;
        next();
        return;
    }

    if(error === ERROR.NOT_FOUND){
        responseGenerator.status.BAD_REQUEST().message("Invalid username or password...").send();
        return;
    }
    responseGenerator.prebuild().send();
}

/*
    STEP 3 - Serve Token
*/
const serveToken: Handler = async(req: Request, res: Response) => {
    const { responseGenerator } = res;
    const { userId } = req.body;

    const [error, data] = await model.user.user.findByUserById(userId);
    const userData = data[0];
    if( error != ERROR.NO_ERROR){
        responseGenerator.prebuild().send();
        return;
    }

    const token = model.user.user.generateToken({...userData, usertype: 'Administrator' });

    responseGenerator.
        status.OK().
        message("Login successful...").
        data(userData).
        token(token).
        send();
}

export default [validator, validateUser as EHandler, serveToken as EHandler];
