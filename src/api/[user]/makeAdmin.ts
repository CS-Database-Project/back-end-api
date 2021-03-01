import { Handler, EHandler, Request, Response, NextFunction } from '../../utilities/types';
import { inputValidator, body } from '../../utilities/validation/inputValidator';
import { ERROR } from '../../model/ERROR';
import { model } from '../../model';

/**
 * STEP 1
 *  Validate Inputs
 */

const validator = inputValidator(
    body('userId').exists().withMessage("User is required")
);


/**
 * STEP 2
 *  Change Usertype to Administrator
 */

const makeAdmin: Handler = async(req: Request, res: Response, next:NextFunction) => {

    const { responseGenerator } = res;
    const { userId } = req.body;

    const error = await model
                            .user
                            .userAccount
                            .updateUsertype(userId, "Administrator");
    
     if(error === ERROR.NO_ERROR){
        return responseGenerator.status
                                .OK()
                                .data({userId})
                                .message("Successfully Changed Usertype to Admin")
                                .send();
    }

    if(error === ERROR.NOT_FOUND){
        return responseGenerator.status
                                .NOT_FOUND()
                                .message("User doesn't exist...")
                                .send();
    }
    responseGenerator.prebuild().send();
    
}

export default [validator, makeAdmin as EHandler];