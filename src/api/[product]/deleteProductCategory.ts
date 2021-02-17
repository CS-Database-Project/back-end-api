import { body, inputValidator } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';

const deleteProductCategory: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const productCategoryId= req.params.id;

    const result = await model.product.productCategory.deleteProductCategory(productCategoryId);

    return responseGenerator.
                status.
                OK().
                message("Product Category Successfully Deleted...").
                send();

}

export default [deleteProductCategory as EHandler];