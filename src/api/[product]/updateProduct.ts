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
    body('title').exists().withMessage("Title is required..."),
    body('sku').exists().withMessage("SKU is required..."),
    body('weight').exists().withMessage("Weight is required..."),
    body('description').exists().withMessage("Description is required..."),
    
);

/*
    STEP 2 - Updating a Product
*/

const updateProduct: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const {title,sku,weight,description} = req.body;
    const productId = req.params.id;

    const productData={
        productId,
        title,
        sku,
        weight,
        description
    }

    const error = await model.product.product.updateProduct(productData,productId);

    return responseGenerator.
                status.
                OK().
                message("Product Successfully Updated...").
                send();

}

export default [validator,updateProduct as EHandler];