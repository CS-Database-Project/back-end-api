import { Router } from 'express';
import productSearch from './view';


const productRouter = Router();

//productRouter.post("/view", productSearch);
productRouter.get("/view", productSearch);



export default productRouter;