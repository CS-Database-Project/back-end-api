import { body, inputValidator } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';


/*
    STEP 1 - Validating Inputs
*/

const validator = inputValidator(
    body('name').exists().withMessage("Name is required..."),
    body('dataType').exists().withMessage("Data Type is required...")

);


/*
    STEP 2 - Registering a Custom Attribute
*/

const registerCustomAttribute: Handler = async (req:Request, res: Response)=>{

    const {responseGenerator} = res;
    const {name,dataType} = req.body;

    const customAttributeId= UUID();

    const customAttributeData = {
        customAttributeId,
        name,
        dataType
    }
    

    const error = await model.product.customAtrribute.addCustomAttribute(customAttributeData);
    if(error === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                message("Custom Attribute Successfully Added...").
                data(customAttributeData).
                send();
    }
    if(error == ERROR.DUPLICATE_ENTRY){
        return responseGenerator.
                status.
                BAD_REQUEST().
                message("Custom Attribute Already Exists...").
                send();
    }
    
    responseGenerator.prebuild().send();


}

export default [validator, registerCustomAttribute as EHandler];