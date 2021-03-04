import { model } from '../../model';
import { ERROR } from '../../model/ERROR';
import { EHandler,Handler, Request, Response } from '../../utilities/types';
import { inputValidator, body } from '../../utilities/validation/inputValidator';


const validator = inputValidator(
    body('customerId').exists().withMessage("Customer ID is required"),
    body('firstName').exists().withMessage("First Name is required"),
    body('lastName').exists().withMessage("First Name is required"),
    body('birthDate').exists().withMessage("Date is required"),
    body('email').exists().isEmail().withMessage("Valid email is required..."),
    body('phone').exists().withMessage("Phone number is required..."),
    body('address').exists().withMessage("Address is required..."),
    body('city').exists().withMessage("City is required..."),
    body('state').exists().withMessage("State is required..."),
);


const updateDetails:Handler = async(req: Request, res: Response) => {

    const{ responseGenerator } = res;
    const customerData = {...req.body};
    const error = await model.customer.customer.updateCustomerDetails(customerData);
    
    if(error === ERROR.NO_ERROR){
        return responseGenerator.status
                                .OK()
                                .data({...customerData,usertype:"Customer",activeStatus:true})
                                .message("Successfully Updated Customer...")
                                .send();
    }

    if(error === ERROR.NOT_FOUND){
        return responseGenerator.status
                                .NOT_FOUND()
                                .message("Customer doesn't exist...")
                                .send();
    }
    responseGenerator.prebuild().send();
}

export default [validator, updateDetails as EHandler]