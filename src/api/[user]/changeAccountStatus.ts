import { model } from '../../model';
import { ERROR } from '../../model/ERROR';
import { Request, Response,Handler, EHandler } from '../../utilities/types';
import { inputValidator, body } from '../../utilities/validation/inputValidator';

/**
 * STEP 1
 *  Validate Inputs
 */

const validator = inputValidator(
    body("userId").exists().isUUID().withMessage("User Id must be valid..."),
    body("activeStatus").exists().isBoolean().withMessage("Active Status must be a boolean...")
);

/**
 * STEP 2
 *  Change Account Active Status of a User
 */

const changeAccountStatus:Handler = async(req:Request, res:Response) => {

    const { responseGenerator } = res;
    const { userId, activeStatus } = req.body;

    const error = await model.user.userAccount.changeAccountStatus(userId, activeStatus);

    if( error === ERROR.NO_ERROR){
        return responseGenerator.status.OK().
                                message("Successfully Changed...").
                                data({userId}).
                                send();
    }

    if(error === ERROR.NOT_FOUND){
        return responseGenerator.status.NOT_FOUND().
                                message("Customer doesn't exist...").
                                send();
    }

    responseGenerator.prebuild().send();
}





export default [validator, changeAccountStatus as EHandler];