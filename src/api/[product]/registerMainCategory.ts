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
    STEP 2 - Registering a Category
*/

const registerCategory: Handler = async (req:Request, res: Response)=>{

    const {responseGenerator} = res;
    const {name} = req.body;

    const mainCategoryId = UUID();

    const mainCategoryData={
        mainCategoryId,
        name
    }


    const error = await model.product.category.addCategory(mainCategoryData);
    if(error === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                message("Category Successfully Added...").
                data({category: {categoryId: mainCategoryId, name}, subCategories: []}).
                send();
    }
    if(error == ERROR.DUPLICATE_ENTRY){
        return responseGenerator.
                status.
                BAD_REQUEST().
                message("Category Already Exists...").
                send();
    }
    
    responseGenerator.prebuild().send();


}

export default [validator, registerCategory as EHandler];