import { body, inputValidator,param } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';


/*
    STEP 1 - Validating Inputs
*/

const validator = inputValidator(
    body('customAttributeId').exists().withMessage("Name is required..."),
    body('value').exists().withMessage("Data Type is required..."),
    param('productId').isUUID().withMessage("Product Id shoud be a valid UUID...")

);


/*
    STEP 2 - Registering a Product Custom Attribute
*/

const registerProductCustomAttribute: Handler = async (req:Request, res: Response)=>{

    const {responseGenerator} = res;
    const {value,customAttributeId} = req.body;

    const productId=req.params.productId;

    const productCustomAttributeData = {
        productId,
        customAttributeId,
        value
    }
    
    

    const error = await model.product.productCustomAttribute.addProductCustomAttribute(productCustomAttributeData);
    if(error === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                message("Product Custom Attribute Successfully Added...").
                data(productCustomAttributeData).
                send();
    }
    if(error == ERROR.DUPLICATE_ENTRY){
        return responseGenerator.
                status.
                BAD_REQUEST().
                message("Product Custom Attribute Already Exists...").
                send();
    }
    
    responseGenerator.prebuild().send();


}

export default [validator, registerProductCustomAttribute as EHandler];