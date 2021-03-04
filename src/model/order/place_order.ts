import { find, query, transaction, update } from '../queryTool';
import { generateToken } from './../../utilities/token';
import { ERROR } from '../ERROR';
import { convertSnakeCase } from './../../utilities/snakeCase';

export interface OrderDetails{
    orderId:string,
    customerId:string,
    orderDate:Date,
    deliveryMethod:string,
    orderStatusId:string,
    comments:string,
    dispatchedDate:Date,
    paymentMethodId:string
}

export interface OrderItem{
    orderId:string,
    productId:string,
    productVariant:string,
    quantity:string,
    unitPrice:string
}

export interface ProductVariant{
    productId:string,
    variantName:string,
    unitPrice: string,
    countInStock: string
}

export class PlaceOrderModel{

    static orderDetailsTable = 'order_details'
    static orderItemTable = 'order_item'
    static productVariantTable = 'product_variant'


    static async addOrderDetails(orderDetailsData:OrderDetails, orderItemData:OrderItem[]){
        console.log(orderItemData);
        console.log(orderDetailsData);



            const query1 = `INSERT INTO ${this.orderDetailsTable}(order_id, customer_id, order_date, delivery_method, order_status_id, comments, dispatched_date, payment_method_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`;
            const args1= [orderDetailsData.orderId,
                orderDetailsData.customerId,
                orderDetailsData.orderDate,
                orderDetailsData.deliveryMethod,
                orderDetailsData.orderStatusId,
                orderDetailsData.comments,
                orderDetailsData.dispatchedDate,
                orderDetailsData.paymentMethodId];

            const [error1] = await query(query1,args1,false );

            for (let i =0; i< orderItemData.length; i++){
               // let orderItem = orderItemData[i] as orderItem;
                const query2 = `SELECT * FROM ${this.productVariantTable} WHERE product_id=$1 AND variant_name=$2;`;
                const [error2, data2] = await query(query2, [orderItemData[i].productId, orderItemData[i].productVariant], true);
                const TableData = data2 as ProductVariant[];

                /* const query5=`
                CREATE OR REPLACE FUNCTION get_total()
                  RETURNS trigger AS
                $$
                BEGIN
                        UPDATE order_item SET unit_price=NEW.quantity*NEW.unit_price
                        WHERE product_id=NEW.product_id AND order_id=NEW.order_id
                        ;
                 
                    RETURN NEW;
                END;
                $$
                LANGUAGE 'plpgsql';
                
                
                CREATE TRIGGER get_total
                  AFTER INSERT
                  ON order_item
                  FOR EACH ROW
                  EXECUTE PROCEDURE get_total();
                  
                  `;

                
                const [error5] = await query(query5,[],false ); */

                const query3 = `INSERT INTO ${this.orderItemTable}(order_id, product_id, product_variant, quantity, unit_price ) VALUES ($1,$2,$3,$4,$5);`;
                const args3= [orderItemData[i].orderId,
                    orderItemData[i].productId,
                    orderItemData[i].productVariant,
                    orderItemData[i].quantity,
                    orderItemData[i].unitPrice];

                const [error3] = await query(query3,args3,false );

                // const query6=`DROP TRIGGER get_total
                // ON order_item;`;

                // const[error6] = await query(query6,[],false);

                const new_stock_count = parseInt(TableData[0].countInStock) - parseInt(orderItemData[i].quantity);
                const stock_count = new_stock_count.toString();
                const query4 = `UPDATE ${this.productVariantTable} SET count_in_stock = $1 WHERE product_id = $2 AND variant_name = $3`;
                const [error4] = await query(query4,[stock_count,orderItemData[i].productId,orderItemData[i].productVariant ],false );

     
            }

                return [error1];

        
    }
}



