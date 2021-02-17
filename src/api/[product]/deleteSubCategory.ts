import { body, inputValidator } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';

const deleteSubCategory: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const subCategoryId= req.params.id;

    const result = await model.product.subCategory.deleteSubCategory(subCategoryId);

    return responseGenerator.
                status.
                OK().
                message("Sub Category Successfully Deleted...").
                send();

}

export default [deleteSubCategory as EHandler];