import { find, query, transaction } from '../queryTool';
import { ERROR } from '../ERROR';


export interface ProductVariant{
    productId:string,
    variant_name:string,
    unit_price: number,
    count_in_stock: number
}

export class ProductVariantModel{
    static tableName = 'product_variant';

    static async addProductVariant(productVariantData :ProductVariant){
        const query = `INSERT INTO ${this.tableName}(product_id,variant_name,unit_price,count_in_stock) VALUES ($1,$2,$3,$4)`;
        const args= [productVariantData.productId,
                      productVariantData.variant_name,
                      productVariantData.unit_price,
                      productVariantData.count_in_stock];

        //const error = await transaction([query1, query2],[args1, args2]);
        //return error;
    }

    static async findByProductVariantById(productId: string): Promise<[ERROR, ProductVariant[]]> {
        const [error, data] = await find(this.tableName, [], 'product_id', productId);
        return [error as ERROR, data as ProductVariant[]];
    }
}
