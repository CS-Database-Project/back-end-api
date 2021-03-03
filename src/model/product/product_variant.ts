import { find, query, transaction,deleteData,update,select } from '../queryTool';
import { ERROR } from '../ERROR';


export interface ProductVariant{
    productId:string,
    variantName:string,
    unitPrice: number,
    countInStock: number
}

export interface ProductVariantForUpdate{
    variantName:string,
    unitPrice: number,
    countInStock: number
}

export class ProductVariantModel{
    static tableName = 'product_variant';

    static async viewProductVariant(){
        const [error,data]= await select(this.tableName,['product_id','variant_name','unit_price','count_in_stock']);
        return [error as ERROR,data];
    }

    static async addProductVariant(productVariantData :ProductVariant){
        const query = `INSERT INTO ${this.tableName}(product_id,variant_name,unit_price,count_in_stock) VALUES ($1,$2,$3,$4)`;
        const args= [productVariantData.productId,
                      productVariantData.variantName,
                      productVariantData.unitPrice.toString(),
                      productVariantData.countInStock.toString()];

        const error = await transaction([query],[args]);
        return error;
    }

    static async deleteProductVariant(id:string){
        const [error, data]= await deleteData(this.tableName,'variant_name',id);
        return [error as ERROR, data];
    }

    static async updateProductVariant(productVariantData:ProductVariant, id:string){
        const [error, data] = await update(this.tableName,productVariantData,'variant_name',id);
        return [error as ERROR, data];
    }

    static async updateProductStock(productVariantData:ProductVariant){
        const query1 = `UPDATE ${this.tableName} SET count_in_stock = $1 WHERE product_id = $2 AND variant_name = $3;`;
        const error = await query(query1, [productVariantData.countInStock,productVariantData.productId,productVariantData.variantName], false);
        return error;
     }
 

    static async findByProductVariantById(productId: string): Promise<[ERROR, ProductVariant[]]> {
        const [error, data] = await find(this.tableName, [], 'product_id', productId);
        return [error as ERROR, data as ProductVariant[]];
    }
}
