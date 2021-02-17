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
    body('mainCategoryId').exists().withMessage("Category Name is required..."),
    body('subCategoryName').exists().withMessage("Category Name is required...")
);


/*
    STEP 2 - Registering a Sub Category
*/

const registerSubCategory: Handler = async (req:Request, res: Response)=>{

    const {responseGenerator} = res;
    const {mainCategoryId,subCategoryName} = req.body;

    const subCategoryId = UUID();

    const subCategoryData={
        subCategoryId,
        mainCategoryId,
        subCategoryName
    }


    const error = await model.product.subCategory.addSubCategory(subCategoryData);
    if(error === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                message("Sub Category Successfully Added...").
                data(subCategoryData).
                send();
    }
    if(error == ERROR.DUPLICATE_ENTRY){
        return responseGenerator.
                status.
                BAD_REQUEST().
                message("Sub Category Already Exists...").
                send();
    }
    
    responseGenerator.prebuild().send();


}

export default [validator, registerSubCategory as EHandler];