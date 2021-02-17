import { body, inputValidator } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';

/*
    STEP 1 - View Product Reviews
*/

const viewProductReview: Handler = async (req:Request, res: Response)=>{

    const {responseGenerator} = res;

    const result = await model.product.review.viewProductReview();
    if(result[0] === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                data(result[1]).
                send();
    }
    
    responseGenerator.prebuild().send();


}

export default [viewProductReview as EHandler];