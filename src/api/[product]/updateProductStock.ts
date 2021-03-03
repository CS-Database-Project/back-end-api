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
    body('productId').isUUID().withMessage("Product Id shoud be a valid UUID...")
    
);

/*
    STEP 2 - Updating a Product Variant
*/

const updateProductStock: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const {variantName,unitPrice,countInStock, productId} = req.body;
    //const variant = req.params.variant;

    const productVariantData={
        productId,
        variantName,
        unitPrice,
        countInStock
    }


    const result = await model.product.productVariant.updateProductStock(productVariantData);

    if(result[0] === ERROR.NO_ERROR) {
    return responseGenerator.
                status.
                OK().
                data(productVariantData).
                message("Product Variant Successfully Updated...").
                send();
    }
    
    if(result[0] === ERROR.NOT_FOUND) {
        return responseGenerator.
                    status.
                    NOT_FOUND().
                    message("Theere is NO PRODUCT for the given ID...").
                    send();
        }

    responseGenerator.prebuild().send();
}

export default [validator,updateProductStock as EHandler];