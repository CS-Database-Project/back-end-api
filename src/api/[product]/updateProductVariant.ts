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
    body('variantName').exists().withMessage("Variant Name is required..."),
    body('unitPrice').exists().withMessage("Unit Price is required..."),
    body('countInStock').exists().withMessage("Count in stock  is required...")
    
);

/*
    STEP 2 - Updating a Product Variant
*/

const updateProductVariant: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const {variantName,unitPrice,countInStock} = req.body;
    const variant = req.params.id;

    const productVariantData={
        variantName,
        unitPrice,
        countInStock
    }

    const error = await model.product.productVariant.updateProductVariant(productVariantData,variant);

    return responseGenerator.
                status.
                OK().
                message("Product Variant Successfully Updated...").
                send();

}

export default [validator,updateProductVariant as EHandler];