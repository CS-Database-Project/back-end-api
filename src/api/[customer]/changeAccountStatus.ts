import { model } from '../../model';
import { ERROR } from '../../model/ERROR';
import { Request, Response,Handler, EHandler } from '../../utilities/types';
import { inputValidator, body } from '../../utilities/validation/inputValidator';

/**
 * STEP 1
 *  Validate Inputs
 */

const validator = inputValidator(
    body("customerId").exists().isUUID().withMessage("Customer Id must be valid..."),
    body("activeStatus").exists().isBoolean().withMessage("Active Status must be a boolean...")
);

/**
 * STEP 2
 *  Change Account Active Status of a Customer
 */

const changeAccountStatus:Handler = async(req:Request, res:Response) => {

    const { responseGenerator } = res;
    const { customerId, activeStatus } = req.body;

    const error = await model.customer.customerAccount.changeAccountStatus(customerId, activeStatus);

    if( error === ERROR.NO_ERROR){
        return responseGenerator.status.OK().
                                message("Successfully Changed...").
                                data({customerId}).
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