import { body, inputValidator } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';

const deleteProductVariant: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const variant= req.params.id;

    const result = await model.product.productVariant.deleteProductVariant(variant);

    return responseGenerator.
                status.
                OK().
                message("Product Successfully Deleted...").
                send();

}

export default [deleteProductVariant as EHandler];