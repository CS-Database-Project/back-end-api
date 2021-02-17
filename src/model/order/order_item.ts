import { ERROR } from '../ERROR';
import {insert ,find} from '../queryTool';

export interface OrderItem{
    orderId:string,
    productId:string,
    productVariant:string,
    quantity:number,
    unitPrice:number,
}

export class OrderItemModel{

    static tableName = 'order_item';

    static async addOrderItem(orderItemData: OrderItem):Promise<[ERROR, OrderItem[]]>{
        const [error, data] = await insert(this.tableName, orderItemData);
        return [error as ERROR, data as OrderItem[]];
    }

    static async getOrderItem(orderId: string):Promise<[ERROR, OrderItem[]]>{
        const [error, data] = await find(this.tableName,["*"], "order_id", orderId);
        return [error as ERROR, data as OrderItem[]];
    }

    /* static async addOrderItemEntry(orderItemData : OrderItem){
        const query = "INSERT INTO orderItem(order_id,product_id,product_variant,quantity,unit_price) VALUES ($1,$2,$3,$4,$5)";
        const args = [orderItemData.orderId,
                      orderItemData.productId,
                      orderItemData.productVariant,
                      orderItemData.quantity,
                      orderItemData.unitPrice];
    } */
    

}