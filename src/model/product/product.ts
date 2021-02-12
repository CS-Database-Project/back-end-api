import { find, query, transaction } from '../queryTool';
import { ProductVariant, ProductVariantModel } from './product_variant';
import { ERROR } from '../ERROR';



export interface Product{
    productId:string,
    title:string,
    sku: string,
    weight: number,
    description: string
}

export class ProductModel{
    static tableName = 'product';

    static async addProduct(productData :Product, productVariantData: ProductVariant){
        const query1= `INSERT INTO ${this.tableName}(product_id,title,sku,weight,description) VALUES ($1,$2,$3,$4,$5)`;
        const query2 = `INSERT INTO ${ProductVariantModel.tableName}(product_id,variant_name,unit_price,count_in_stock) VALUES ($1,$2,$3,$4)`;
        const args1= [productData.productId,
                      productData.title,
                      productData.sku,
                      productData.weight,
                      productData.description];

        const args2= [productVariantData.productId,
                      productVariantData.variant_name,
                      productVariantData.unit_price,
                      productVariantData.count_in_stock];

        //const error = await transaction([query1, query2],[args1, args2]);
        //return error;
    }

    static async findByProductById(productId: string): Promise<[ERROR, Product[]]> {
        const [error, data] = await find(this.tableName, [], 'product_id', productId);
        return [error as ERROR, data as Product[]];
    }
}
