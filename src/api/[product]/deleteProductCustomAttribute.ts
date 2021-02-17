import { body, inputValidator } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';

const deleteProductCustomAttribute: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const customAttributeId= req.params.id;

    const result = await model.product.productCustomAttribute.deleteProductCustomAttribute(customAttributeId);

    return responseGenerator.
                status.
                OK().
                message("Product Custom Attribute Successfully Deleted...").
                send();

}

export default [deleteProductCustomAttribute as EHandler];