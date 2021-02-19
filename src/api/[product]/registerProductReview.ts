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
    body('customerId').exists().withMessage("Customer Id is required..."),
    body('rating').exists().withMessage("Rating is required..."),
    body('description').exists().withMessage("Description is required..."),
    param('productId').isUUID().withMessage("Product Id shoud be a valid UUID..."),

);


/*
    STEP 2 - Registering a Product Review
*/

const registerProductReview: Handler = async (req:Request, res: Response)=>{

    const {responseGenerator} = res;
    const {customerId,rating,description} = req.body;
    const productId = req.params.productId;

    const reviewId= UUID();

    const productReviewData = {
        reviewId,
        customerId,
        productId,
        rating,
        description
    }

    const error = await model.product.review.addProductReview(productReviewData);
    if(error === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                message("Product Review Successfully Added...").
                data(productReviewData).
                send();
    }
    if(error == ERROR.DUPLICATE_ENTRY){
        return responseGenerator.
                status.
                BAD_REQUEST().
                message("Product Review Already Exists...").
                send();
    }
    
    responseGenerator.prebuild().send();


}

export default [validator, registerProductReview as EHandler];