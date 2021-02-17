import { Handler, EHandler, Request, Response, NextFunction } from '../../utilities/types';
import { inputValidator, body } from '../../utilities/validation/inputValidator';
import { ERROR } from '../../model/ERROR';
import { model } from '../../model';

/**
 * STEP 1
 *  Validate Inputs
 */

const validator = inputValidator(
    body('oldUsername').exists().withMessage("Old Username is required"),
    body('newUsername').exists().withMessage("New Username is required...")
);


/**
 * STEP 2
 *  Update Username
 */

const updateUsername: Handler = async(req: Request, res: Response, next:NextFunction) => {

    const { responseGenerator } = res;
    const { oldUsername, newUsername } = req.body;

    const [error,data] = await model.customer.customerAccount.updateUsername(oldUsername, newUsername);
    if(error === ERROR.NO_ERROR){
        return responseGenerator.status.OK().
                                    data(data).
                                    message("Username successfully changed...").send();
    }
    if(error === ERROR.NOT_FOUND){
        return responseGenerator.status.NOT_FOUND().message("Username doesn't exist").send();
    }

    responseGenerator.prebuild().send();
}

export default [validator, updateUsername as EHandler];