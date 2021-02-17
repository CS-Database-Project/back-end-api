import { body, inputValidator } from './../../utilities/validation/inputValidator';
import { model } from '../../model';
import { ERROR } from '../../model/ERROR';
import { Request, Response, Handler, EHandler } from '../../utilities/types';


const validator = inputValidator(
    body('keyWord').exists().withMessage("Keywords are required...")
);

const searchResult:Handler = async(req: Request, res: Response) => {
    const { responseGenerator } = res;
    const { startPrice, endPrice, keyWord } = req.body;
    //console.log(keyWord);

    const [error, data] = await model.product.search.findProduct(keyWord, startPrice, endPrice);
    const productData = data[0];
    if( error === ERROR.NOT_FOUND){
        return responseGenerator.
        status.
        BAD_REQUEST().
        message("NO Search Result").
        send();
    }

    responseGenerator.
    status.OK().
    message(`${keyWord} ` + "Search successful...").
    data(productData).
    send();

}

export default [validator, searchResult as EHandler];