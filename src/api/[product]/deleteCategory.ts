import { body, inputValidator } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';

const deleteCategory: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const categoryId= req.params.id;

    const result = await model.product.category.deleteCategory(categoryId);

    return responseGenerator.
                status.
                OK().
                message("Category Successfully Deleted...").
                send();

}

export default [deleteCategory as EHandler];