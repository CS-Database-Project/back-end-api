import { body, inputValidator ,param} from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';


/*
    STEP 1 - Validating Inputs
*/

const validator = inputValidator(
    body('title').exists().withMessage("Title is required..."),
    body('sku').exists().withMessage("SKU is required..."),
    body('weight').exists().withMessage("Weight is required..."),
    body('description').exists().withMessage("Description is required..."),
    body('variantName').exists().withMessage("Variant Name is required..."),
    body('unitPrice').exists().withMessage("Unit Price is required..."),
    body('countInStock').exists().withMessage("Count in stock  is required...")


);


/*
    STEP 2 - Registering a Product
*/

const registerProduct: Handler = async (req:Request, res: Response)=>{

    const {responseGenerator} = res;
    const {title,sku,weight,description,variantName,unitPrice,countInStock} = req.body;

    const productId = UUID();

    const productData={
        productId,
        title,
        sku,
        weight,
        description
    }

    const productVariantData = {
        productId,
        variantName,
        unitPrice,
        countInStock

    }

    const error = await model.product.product.addProduct(productData,productVariantData);
    if(error === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                message("Product Successfully Added...").
                data(productData).
                send();
    }
    if(error == ERROR.DUPLICATE_ENTRY){
        return responseGenerator.
                status.
                BAD_REQUEST().
                message("Product Already Exists...").
                send();
    }
    
    responseGenerator.prebuild().send();


}

export default [validator, registerProduct as EHandler];