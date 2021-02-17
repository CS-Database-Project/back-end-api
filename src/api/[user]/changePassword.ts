import { model } from '../../model';
import { ERROR } from '../../model/ERROR';
import { Handler, EHandler, Request, Response, NextFunction } from '../../utilities/types';
import { body, inputValidator } from './../../utilities/validation/inputValidator';
import bcrypt from 'bcrypt';
import { encryptPassword } from '../../utilities/passwordHasher';


const validator = inputValidator(
    body('username').exists().withMessage("Username is required..."),
    body('oldPassword').exists().withMessage("Old Password is required..."),
    body("newPassword").exists().withMessage("New Password is required...")
);


const validateOldPassword:Handler = async (req: Request, res: Response, next: NextFunction) => {

    const { responseGenerator } = res;

    const { username, oldPassword } = req.body;

    const [error, data] = await model.user.userAccount.findByUsername(username);
    const accountData = data[0];
    if(error === ERROR.NO_ERROR){
        const { password: passwordInDb } = accountData;
        const validPassword = await bcrypt.compare(oldPassword, passwordInDb);
        if(!validPassword){
            responseGenerator.status.BAD_REQUEST().message("Invalid password").send();
            return;
        }

        next();
        return;
    }

    if(error === ERROR.NOT_FOUND){
        responseGenerator.status.BAD_REQUEST().message("Invalid username...").send();
        return;
    }
    responseGenerator.prebuild().send();

}


const changePassword:Handler = async(req: Request, res: Response) => {

    const { responseGenerator } = res;
    const { username, newPassword } = req.body;

    const hashed = await encryptPassword(newPassword);

    const [error,data] = await model.user.userAccount.updatePassword(hashed, username);

    if( error != ERROR.NO_ERROR){
        responseGenerator.prebuild().send();
        return;
    }

    responseGenerator.status.OK().message("Successfully changed password...").send();

}



export default [validator, validateOldPassword as EHandler, changePassword as EHandler];