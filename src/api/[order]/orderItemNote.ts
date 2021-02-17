import { body, inputValidator } from './../../utilities/validation/inputValidator';
import { model } from '../../model';
import { ERROR } from '../../model/ERROR';
import { Request, Response, Handler, EHandler } from '../../utilities/types';


const orderItemNote:Handler = async(req: Request, res: Response) => {
    const { responseGenerator } = res;
    const { orderId, productId, productVariant, note } = req.body;

    const orderNoteData= {
        orderId,
        productId,
        productVariant,
        note
    };

    const [error, data] = await model.order.orderItemNote.addOrderItemNote(orderNoteData);
    const noteData = data[0];
    if( error != ERROR.NO_ERROR){
        responseGenerator.prebuild().send();
        return;
    }

    responseGenerator.
    status.OK().
    message("Order Note successful...").
    data(noteData).
    send();

}

export default [orderItemNote as EHandler];