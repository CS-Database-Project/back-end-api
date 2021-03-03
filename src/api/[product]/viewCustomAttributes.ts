import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { Request, Response } from '../../utilities/types';

/*
    STEP 1 - View Products
*/

const viewCustomAttributes: Handler = async (req:Request, res: Response) =>{

    const {responseGenerator} = res;

    const [error, data] = await model.product.customAtrribute.getAllCustomAttributes();
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
                message("No Custom Attributes Found").
                data([]).
                send();
    }
    
    responseGenerator.prebuild().send();


}

export default [viewCustomAttributes as EHandler];



