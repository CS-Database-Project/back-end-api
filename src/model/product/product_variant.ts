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
        const query= select(this.tableName,['product_id','variant_name','unit_price','count_in_stock']);
        return query;
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

    static deleteProductVariant(id:string){
        const query= deleteData(this.tableName,'variant_name',id);
        return;
    }

    static async updateProductVariant(productVariantData:ProductVariantForUpdate,id:string){
        const query=update(this.tableName,productVariantData,'variant_name',id);
        return;
    }

    static async findByProductVariantById(productId: string): Promise<[ERROR, ProductVariant[]]> {
        const [error, data] = await find(this.tableName, [], 'product_id', productId);
        return [error as ERROR, data as ProductVariant[]];
    }
}
