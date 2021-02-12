import { body, inputValidator } from './../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from './../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { encryptPassword } from '../../utilities/passwordHasher';
import { Request, Response } from '../../utilities/types';


/*
    STEP 1 - Validating Inputs
*/
const validator = inputValidator(
    body('firstName').exists().withMessage("First Name is required..."),
    body('lastName').exists().withMessage("Last Name is required..."),
    body('birthDate').exists().withMessage("Birth date is required..."),
    body('phone').exists().withMessage("Phone Number is required..."),
    body('address').exists().withMessage("Address is required..."),
    body('city').exists().withMessage("City is required..."),
    body('state').exists().withMessage("State is required..."),
    body('username').exists().withMessage("Username is required..."),
    body('password').exists().withMessage("Password is required...")
);

/*
    STEP 2 - Registering Customer
*/

const registerCustomer:Handler = async(req: Request, res: Response) => {

    
    const { responseGenerator } =  res;
    const { firstName, lastName, birthDate, email, phone, address, city, state } = req.body;
    let { username, password } = req.body;

    const customerId = UUID();
    password = await encryptPassword(password);
    
    const customerData = {
        customerId,
        firstName,
        lastName,
        birthDate,
        email,
        phone,
        address,
        city,
        state
    };

    const customerAccountData = {
        customerId,
        username,
        password,
        activeStatus: true,
        usertype:"Customer"
    };

    const error = await model.customer.customer.addCustomerEntry(customerData, customerAccountData);
    if(error === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                message("Successfully Registered...").
                data(customerData).
                send();
    }
    if(error == ERROR.DUPLICATE_ENTRY){
        return responseGenerator.
                status.
                BAD_REQUEST().
                message("Customer Already Exists...").
                send();
    }
    
    responseGenerator.prebuild().send();

   
}

export default [validator, registerCustomer as EHandler];