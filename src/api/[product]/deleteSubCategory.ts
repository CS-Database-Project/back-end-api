import { body, inputValidator,param } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';

const validator = inputValidator(
    param('subCategoryId').isUUID().withMessage("SubCategory Id shoud be a valid UUID..."),
);

const deleteSubCategory: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const subCategoryId= req.params.subCategoryId;

    const result = await model.product.subCategory.deleteSubCategory(subCategoryId);

    if(result === ERROR.NO_ERROR) {
    return responseGenerator.
                status.
                OK().
                message("Sub Category Successfully Deleted...").
                send();
    }
    if(result === ERROR.NOT_FOUND) {
        return responseGenerator.
                    status.
                    NOT_FOUND().
                    message("Theere is NO PRODUCT for the given ID...").
                    send();
        }

    responseGenerator.prebuild().send();
}

export default [validator,deleteSubCategory as EHandler];