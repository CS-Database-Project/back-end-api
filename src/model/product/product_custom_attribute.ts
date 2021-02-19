import { find, query, transaction,deleteData } from '../queryTool';
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

        const error = await transaction([query],[args]);
        return error;
    }

    static async deleteProductCustomAttribute(id:string){
        const [error,data]= await deleteData(this.tableName,'custom_attribute_id',id);
        return [error as ERROR,data];
    }


    static async findByProductCustomAttributeById(productId: string): Promise<[ERROR, ProductCustomAttribute[]]> {
        const [error, data] = await find(this.tableName, [], 'product_id', productId);
        return [error as ERROR, data as ProductCustomAttribute[]];
    }
}
