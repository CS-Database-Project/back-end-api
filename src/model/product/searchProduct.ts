import { ERROR } from '../ERROR';
import { query } from '../queryTool';

export interface Product{
   productId:string,
   title: string,
   unitPrice: DoubleRange

}

export interface Variants{
    price: DoubleRange
}

export class ProductSearchModel{

    static productTable = 'product';
    static variantTable = 'product_variant';

    static async findProduct(keyWord: string, startPrice: DoubleRange, endPrice: DoubleRange):Promise<[ERROR, Product[]]>{
      //  const statement = `SELECT * FROM ${this.tableName} WHERE title LIKE ${keyWord}`;
        const statement = `SELECT DISTINCT p.product_id, p.title, v.unit_price FROM ${this.productTable} p LEFT OUTER JOIN ${this.variantTable} v USING(product_id) WHERE title LIKE ${keyWord}`;
        const args = [keyWord];
        const [error, data] = await query(statement, args, true);
        return [error as ERROR, data as Product[]];
    }

}