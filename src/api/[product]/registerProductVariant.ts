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
    body('variantName').exists().withMessage("Variant Name is required..."),
    body('unitPrice').exists().withMessage("Unit Price is required..."),
    body('countInStock').exists().withMessage("Count in stock  is required..."),
    param('productId').isUUID().withMessage("Product Id shoud be a valid UUID...")

);


/*
    STEP 2 - Registering a Product
*/

const registerProductVariant: Handler = async (req:Request, res: Response)=>{

    const {responseGenerator} = res;
    const {variantName,unitPrice,countInStock} = req.body;
    const productId = req.params.productId;

    const productVariantData = {
        productId,
        variantName,
        unitPrice,
        countInStock

    }

    const error = await model.product.productVariant.addProductVariant(productVariantData);
    if(error === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                message("Product Variant Successfully Added...").
                data(productVariantData).
                send();
    }
    if(error == ERROR.DUPLICATE_ENTRY){
        return responseGenerator.
                status.
                BAD_REQUEST().
                message("Product Variant Already Exists...").
                send();
    }
    
    responseGenerator.prebuild().send();


}

export default [validator, registerProductVariant as EHandler];