import { body, inputValidator,param } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';


/*
    STEP 1 - Validating Params
*/
const validator = inputValidator(
    param('productId').isUUID().withMessage("Product Id shoud be a valid UUID..."),
);


/*
    STEP 2 - Deleting a Product
*/
const deleteProduct: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const productId= req.params.productId;

    const result = await model.product.product.deleteProduct(productId);

    if(result === ERROR.NO_ERROR) {
    return responseGenerator.
                status.
                OK().
                data(productId).
                message("Product Successfully Deleted...").
                send();
    }

    if(result=== ERROR.NOT_FOUND) {
        return responseGenerator.
                    status.
                    NOT_FOUND().
                    message("There is NO PRODUCT for the given ID...").
                    send();
        }


    responseGenerator.prebuild().send();
}

export default [validator,deleteProduct as EHandler];