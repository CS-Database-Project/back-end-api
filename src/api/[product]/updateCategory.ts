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
    body('name').exists().withMessage("Category Name is required..."),
);


/*
    STEP 2 - Updating a Category
*/

const updateCategory: Handler = async (req:Request, res: Response)=>{

    const {responseGenerator} = res;
    const {name} = req.body;

    const categoryId=req.params.categoryId;

    const categoryData={
        name
    }


    const result = await model.product.category.updateCategory(categoryData,categoryId);
    if(result[0] === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                message("Category Successfully Updated...").
                data(categoryData).
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

export default [validator, updateCategory as EHandler];