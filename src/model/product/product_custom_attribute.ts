import { find, query, transaction } from '../queryTool';
import { ERROR } from '../ERROR';



export interface ProductCustomAttribute{
    productId: string,
    customAttributeId:string,
    value:string
}

export class ProductCustomAttributeModel{
    static tableName = 'product_custom_attribute';

    static async addProductCustomAttribute(productCustomAtrributeData :ProductCustomAttribute){
        const query = `INSERT INTO ${this.tableName}(product_id,custom_attribute_id,value) VALUES ($1,$2,$3)`;
        const args= [productCustomAtrributeData.productId,
                      productCustomAtrributeData.customAttributeId,
                      productCustomAtrributeData.value];

        //const error = await transaction([query1, query2],[args1, args2]);
        //return error;
    }

    static async findByProductCustomAttributeById(productId: string): Promise<[ERROR, ProductCustomAttribute[]]> {
        const [error, data] = await find(this.tableName, [], 'product_id', productId);
        return [error as ERROR, data as ProductCustomAttribute[]];
    }
}
