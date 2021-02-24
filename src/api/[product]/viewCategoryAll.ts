import { body, inputValidator } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';

/*
    STEP 1 - View Products
*/

const viewCategory: Handler = async (req:Request, res: Response)=>{

    const {responseGenerator} = res;

    const [error, data] = await model.product.category.getAllCategories();
    if(error === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                data(data).
                send();
    }

    if(error === ERROR.NOT_FOUND){
        return responseGenerator.
                status.
                OK().
                message("No Categories Found").
                data({}).
                send();
    }
    
    responseGenerator.prebuild().send();


}

export default [viewCategory as EHandler];