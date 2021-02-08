import { body, inputValidator } from './../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from './../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { encryptPassword } from '../../utilities/passwordHasher';


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
    STEP 1 - Registering Customer
*/

const registerCustomer:Handler = async(req, res) => {

    const { responseGenerator } = res;

    const { firstName, lastName, birthDate, phone, address, city, state } = req.body;
    let { username, password } = req.body;

    const customerId = UUID();
    password = await encryptPassword(password);
    const customerData = {
        customerId,
        firstName,
        lastName,
        birthDate,
        phone,
        address,
        city,
        state
    };

    const customerAccountData = {
        customerId,
        username,
        password,
        usertype:"Customer"
    };

    const error = await model.customer.customer.addCustomerEntry(customerData, customerAccountData);
    if(error === ERROR.NO_ERROR) responseGenerator.status.OK().message("Success...").send();
    responseGenerator.prebuild().send();
}

export default [validator, registerCustomer as EHandler];