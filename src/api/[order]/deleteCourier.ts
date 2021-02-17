import { model } from "../../model";
import { Handler, EHandler} from "../../utilities/types";
import {Request, Response} from "../../utilities/types";


const deleteCourier: Handler = async (req:Request , res:Response)=>{

    const{responseGenerator}=res;
    const courierId=req.params.id;

    const result = await model.order.courier.deleteCourier(courierId);

    return responseGenerator.
                status.
                OK().
                message("Courier Successfully Deleted...").
                send();
}

export default [deleteCourier as EHandler];
