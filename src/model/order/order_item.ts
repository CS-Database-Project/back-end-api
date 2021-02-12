import {query} from '../queryTool';

export interface OrderItem{
    orderId:string,
    productId:string,
    productVariant:string,
    quantity:number,
    unitPrice:number,
}

export class OrderItemModel{

    static async addOrderItemEntry(orderItemData : OrderItem){
        const query = "INSERT INTO orderItem(order_id,product_id,product_variant,quantity,unit_price) VALUES ($1,$2,$3,$4,$5)";
        const args = [orderItemData.orderId,
                      orderItemData.productId,
                      orderItemData.productVariant,
                      orderItemData.quantity,
                      orderItemData.unitPrice];
    }
    

}