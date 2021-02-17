import { ERROR } from '../ERROR';
import { find, insert } from '../queryTool';

export interface OrderItemNote{
    orderId:string,
    productId:string,
    productVariant:string,
    note:string
}

export class OrderItemNoteModel{

    static tableName = 'order_item_note';

    static async addOrderItemNote(OrderItemNote: OrderItemNote):Promise<[ERROR, OrderItemNote[]]>{
        const [error, data] = await insert(this.tableName, OrderItemNote);
        return [error as ERROR, data as OrderItemNote[]];
    }

    static async getOrderItemNote(OrderId: string):Promise<[ERROR, OrderItemNote[]]>{
        const [error, data] = await find(this.tableName,["*"], "order_id", OrderId);
        return [error as ERROR, data as OrderItemNote[]];
    }

}