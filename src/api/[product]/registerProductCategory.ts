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
    body('categoryId').exists().withMessage("Category Id is required..."),
    param('productId').isUUID().withMessage("Product Id shoud be a valid UUID...")
);


/*
    STEP 2 - Registering a Product Category
*/

const registerProductCategory: Handler = async (req:Request, res: Response)=>{

    const {responseGenerator} = res;
    const {categoryId} = req.body;
    const productId = req.params.productId;

    const productCategoryData = {
        productId,
        categoryId
    }

    const error = await model.product.productCategory.addProductCategory(productCategoryData);
    if(error === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                message("Product Category Successfully Added...").
                data(productCategoryData).
                send();
    }
    if(error == ERROR.DUPLICATE_ENTRY){
        return responseGenerator.
                status.
                BAD_REQUEST().
                message("Product Category Already Exists...").
                send();
    }
    
    responseGenerator.prebuild().send();


}

export default [validator, registerProductCategory as EHandler];