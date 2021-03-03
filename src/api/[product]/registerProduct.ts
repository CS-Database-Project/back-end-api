import { body, inputValidator ,param} from '../../utilities/validation/inputValidator';
import { Handler, EHandler, NextFunction } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';
import { request } from 'express';


/*
    STEP 1 - Validating Inputs
*/

const validator = inputValidator(
    body('title').exists().withMessage("Title is required..."),
    body('sku').exists().withMessage("SKU is required..."),
    body('weight').exists().withMessage("Weight is required..."),
    body('description').exists().withMessage("Description is required...")
);


/*
    STEP 2 - Registering a Product
*/

const registerProduct = async (req:any, res: any, next: NextFunction)=>{

    const {responseGenerator} = res;
  
    const { title, sku, weight, description, variants, categories, customAttributes } = req.body;
    
    const productId = UUID();
    

    const productData={
        productId,
        title,
        sku,
        weight,
        description
    };

    const productVariants = JSON.parse(variants);
    const productCategories = JSON.parse(categories);
    const productCustomAttributes = JSON.parse(customAttributes);

    const error = await model.product.product.addProduct(productData,productVariants, productCategories,productCustomAttributes );
    if(error === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                message("Product Successfully Added...").
                data(productId).
                send();
    }
    if(error == ERROR.DUPLICATE_ENTRY){
        return responseGenerator.
                status.
                BAD_REQUEST().
                message("Product Already Exists...").
                send();
    }
    
    responseGenerator.prebuild().send();



}

export default [validator, registerProduct as EHandler];