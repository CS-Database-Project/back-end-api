import { body, inputValidator ,param,query} from '../../utilities/validation/inputValidator';
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
    param('productId').isUUID().withMessage("Product Id shoud be a valid UUID...")
);

/*
    STEP 2 - Updating a Product
*/

const updateProduct: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const {title,sku,weight,description} = req.body;
    const productId = req.params.productId;

    const productData={
        productId,
        title,
        sku,
        weight,
        description
    }

    const result = await model.product.product.updateProduct(productData,productId);

    if(result[0] === ERROR.NO_ERROR) {
    return responseGenerator.
                status.
                OK().
                data(result[1]).
                message("Product Successfully Updated...").
                send();
    }

    if(result[0] === ERROR.NOT_FOUND) {
        return responseGenerator.
                    status.
                    NOT_FOUND().
                    message("There is NO PRODUCT for the given ID...").
                    send();
        }


    responseGenerator.prebuild().send();

}

export default [validator,updateProduct as EHandler];